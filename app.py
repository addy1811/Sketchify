from werkzeug.security import generate_password_hash, check_password_hash
from flask import Flask, request, jsonify, send_file, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import os
import psycopg2
from psycopg2 import sql
import numpy as np
import cv2
from PIL import Image, UnidentifiedImageError
from pdf2image import convert_from_path
import rawpy
from io import BytesIO
from dotenv import load_dotenv
from urllib.parse import urlparse

load_dotenv()  # Load environment variables from .env file
app = Flask(__name__)
CORS(app)  # Handle requests from other domains.
app.config['JWT_SECRET_KEY'] = '2ca9de3884a9971bd04f23c340bb151d52a95cd48342b636fc581de034eed2d9c8921209acf133811351483840ea6acb01feda669b1c112cfa2f6dbc322fd9e66a827545db48f74b036865f561c7a936bc60b4df7a88cea3ec8b92fef3f62c20cbc013637dfcd761ac770fa0cf889ff0111543abc70f9d7f9d932f3abe7726e74d6054ff8bf99bc9bac37142e70d0fba0994e191269dbae70dd4b71174c0e9025cdd25f0f893987967d6034b9c5ab02387c6dcca73e184fe44f4258368233ad14b7a32a7640cd850019d64e314f2215bf83754efc8fdaade542fbfd8b31f8dddb95bb79c5e261497dbdd476500afb50a050947eb3651fa05c8b26cef39fdab4c'  # Change this to a secure secret key
jwt = JWTManager(app)

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:aditya%40123%23@localhost:5432/signup_db")

def connect_db():
    conn = psycopg2.connect(DATABASE_URL)
    return conn
# Your other routes and functions remain unchanged


# Path to the image dataset folder
IMAGE_FOLDER = './image'  # Specify your dataset folder here

# Load the pre-trained Haar Cascade model for face detection
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# List of supported extensions
SUPPORTED_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.gif', '.tiff', '.tif', '.psd', '.pdf', '.eps', '.ai', '.indd', '.raw'}

# Function to check if file is supported
def is_supported_file(filename):
    return any(filename.lower().endswith(ext) for ext in SUPPORTED_EXTENSIONS)

# Function to convert file to an OpenCV-compatible format
def load_image(file_path):
    ext = os.path.splitext(file_path)[1].lower()

    try:
        if ext in {'.png', '.jpg', '.jpeg', '.tiff', '.tif'}:
            return cv2.imread(file_path, cv2.IMREAD_GRAYSCALE)
        elif ext == '.gif':
            # Load first frame of GIF
            gif = Image.open(file_path)
            gif.seek(0)
            return np.array(gif.convert('L'))
        elif ext == '.pdf':
            # Convert first page of PDF to an image
            pages = convert_from_path(file_path, dpi=300)
            return np.array(pages[0].convert('L'))
        elif ext == '.raw':
            # Load RAW file
            with rawpy.imread(file_path) as raw:
                rgb = raw.postprocess()
                return cv2.cvtColor(rgb, cv2.COLOR_RGB2GRAY)
        elif ext == '.psd':
            # Load PSD file using PIL
            psd = Image.open(file_path)
            return np.array(psd.convert('L'))
        else:
            return None
    except Exception as e:
        print(f"Error loading {file_path}: {e}")
        return None

# Function to convert image to sketch
def con_img_sketch(image):
    inverted_image = 255 - image
    blurred_image = cv2.GaussianBlur(inverted_image, (21, 21), 0)
    inverted_blurred = 255 - blurred_image
    sketch_image = cv2.divide(image, inverted_blurred, scale=256.0)
    return sketch_image

# Function for face detection
def detect_faces(image):
    faces = face_cascade.detectMultiScale(image, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
    for (x, y, w, h) in faces:
        cv2.rectangle(image, (x, y), (x + w, y + h), (255, 0, 0), 2)
    return image, faces

@app.route('/test_db')
def test_db():
    try:
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM users;')
        rows = cursor.fetchall()
        return jsonify(rows)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()
    
@app.route('/api/auth/signup', methods=['POST'])
def signup():
    # Extract the data from the request
    data = request.get_json()
    print(f"Received data: {data}")  # Log the received data for debugging
    
    # Check if username and password are provided
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return {"error": "Username and password are required"}, 400
    
    try:
        # Proceed with database logic (inserting into the database)
        conn = connect_db()
        if conn is None:
            return {"error": "Database connection failed"}, 500
        
        cursor = conn.cursor()
        
        # Insert the user data into the database (example query)
        cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password))
        conn.commit()
        
        # Close the cursor and connection
        cursor.close()
        conn.close()
        
        return {"message": "User signed up successfully!"}, 201
    
    except Exception as e:
        print(f"Error occurred: {e}")
        return {"error": "Internal Server Error"}, 500

    
@app.route('/api/auth/signin', methods=['POST'])
def login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({'error': 'Username and password are required'}), 400

        # Connect to the PostgreSQL database
        connection = connect_db()
        cursor = connection.cursor()

        # Retrieve the user from the database
        cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
        user = cursor.fetchone()

        if user is None or not check_password_hash(user[1], password):  # user[1] is the password
            return jsonify({'error': 'Invalid username or password'}), 401

        # Create JWT token
        access_token = create_access_token(identity=username)

        cursor.close()
        connection.close()

        return jsonify({'access_token': access_token}), 200

    except Exception as e:
        return jsonify({'error': f'Internal Server Error: {str(e)}'}), 500

# Protected route example
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({'message': f'Hello, {current_user}! This is a protected route.'})


@app.route('/image/<filename>')
def serve_image(filename):
    try:
        return send_from_directory(IMAGE_FOLDER, filename)
    except Exception as e:
        return jsonify({'error': f'Could not retrieve image: {str(e)}'}), 500

@app.route('/get_images', methods=['GET'])
def get_images():
    try:
        page = int(request.args.get('page', 1))
        per_page = 100  # Changed to 100 images per page

        image_files = [f for f in os.listdir(IMAGE_FOLDER) if f.endswith(('.png', '.jpg', '.jpeg'))]
        total_images = len(image_files)

        start = (page - 1) * per_page
        end = start + per_page

        paginated_images = [
            f"http://localhost:5000/image/{image}" for image in image_files[start:end]
        ]

        return jsonify({
            'images': paginated_images,
            'total_images': total_images,
            'page': page,
            'per_page': per_page
        }), 200

    except Exception as e:
        return jsonify({'error': f'Internal Server Error: {str(e)}'}), 500
# Endpoint to process dataset with extended formats
@app.route('/process_dataset', methods=['GET'])
def process_dataset():
    try:
        processed_images = []

        for filename in os.listdir(IMAGE_FOLDER):
            if is_supported_file(filename):
                file_path = os.path.join(IMAGE_FOLDER, filename)
                image = load_image(file_path)
                if image is None:
                    continue

                # Apply face detection and sketch effect
                image_with_faces, faces = detect_faces(image)
                if len(faces) > 0:
                    for (x, y, w, h) in faces:
                        face = image[y:y + h, x:x + w]
                        sketch_face = con_img_sketch(face)
                        image_with_faces[y:y + h, x:x + w] = sketch_face
                else:
                    image_with_faces = con_img_sketch(image)

                # Encode the processed image
                is_success, buffer = cv2.imencode(".jpg", image_with_faces)
                if is_success:
                    io_buf = BytesIO(buffer)
                    processed_images.append({
                        'filename': filename,
                        'image': io_buf.getvalue()
                    })

        return jsonify({'processed_images': [img['filename'] for img in processed_images]}), 200

    except Exception as e:
        return jsonify({'error': f'Internal Server Error: {str(e)}'}), 500

# Endpoint for processing a single uploaded image
@app.route('/process_image', methods=['POST'])
def process_image():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        image = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_GRAYSCALE)
        if image is None:
            return jsonify({'error': 'Invalid image'}), 400

        image_with_faces, faces = detect_faces(image)

        if len(faces) > 0:
            for (x, y, w, h) in faces:
                face = image[y:y + h, x:x + w]
                sketch_face = con_img_sketch(face)
                image_with_faces[y:y + h, x:x + w] = sketch_face
        else:
            image_with_faces = con_img_sketch(image)

        is_success, buffer = cv2.imencode(".jpg", image_with_faces)
        if not is_success:
            return jsonify({'error': 'Failed to encode image'}), 500

        io_buf = BytesIO(buffer)
        return send_file(io_buf, mimetype='image/jpeg')

    except Exception as e:
        return jsonify({'error': f'Internal Server Error: {str(e)}'}), 500

# Endpoint to serve the index.html file
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
