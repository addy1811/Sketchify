import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam'; // Import the Webcam component
import './Ai.css'; // Import your CSS file for custom styles
import loopVideo from '../assets/loop.mp4'; // Import the video file
import { FaTrash, FaChevronLeft, FaChevronRight, FaCamera, FaDownload } from 'react-icons/fa'; // Import the necessary icons
import Navbar from '../components/Navbar' // Import the NavBar component

const Ai = () => {
  const [file, setFile] = useState(null);
  const [sketchUrl, setSketchUrl] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false); // State to show/hide webcam

  const webcamRef = useRef(null);

const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== "image/ai") {
        alert("Only AI files are supported. Please upload a valid AI image.");
        e.target.value = ""; // Clear the file input
        return;
      }
      setFile(selectedFile); // Set the valid  file
    }
  };

  const handleDelete = () => {
    setFile(null);
    setSketchUrl(null);
  };

  const handleConvert = async () => {
    if (!file) {
      alert('Please select an image file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/process_image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const sketchBlob = await response.blob();
        if (sketchBlob.type.startsWith('image/')) {
          const sketchUrl = URL.createObjectURL(sketchBlob);
          setSketchUrl(sketchUrl);
          setPanelOpen(true); // Open the panel when the sketch is ready
        } else {
          alert('Error: received data is not an image.');
        }
      } else {
        alert('Error processing the image.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error processing the image.');
    }
  };

  const togglePanel = () => {
    setPanelOpen(!panelOpen);
  };

  const handleCapture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot(); // Capture the image
    if (imageSrc) {
      const byteString = atob(imageSrc.split(',')[1]);
      const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      setFile(new File([blob], 'webcam_capture.png', { type: mimeString }));
      setShowWebcam(false); // Hide webcam after capturing
    }
  }, [webcamRef]);

  return (
    <div className="relative min-h-screen bg-gray-200">
      {/* Navigation Bar */}
      <Navbar /> {/* Integrating the NavBar component here */}

      {/* Video Background */}
      <div className="video-background">
        <video autoPlay muted loop className="video">
          <source src={loopVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
      </div>

      {/* Content Box */}
      <div className="content-box">
        <h1 className="text-2xl font-bold mb-6 text-white">Add AI Image</h1>
        <div className="border-2 border-dashed border-gray-600 p-6 rounded-lg text-center mb-4">
          <i className="fa fa-cloud text-5xl text-blue-600 mb-4"></i>
          <h3 className="text-xl text-white">Upload your AI image here</h3>
          <h4 className="text-sm opacity-50 mt-2 text-white">File supported: AI</h4>
          <span className="block my-4 text-lg text-white">OR</span>
          <div className="flex items-center justify-center space-x-2">
            <label className="cursor-pointer bg-pink-700 text-white px-4 py-2 rounded-md">
              Browse
              <input type="file" onChange={handleFileChange} className="hidden" />
            </label>
            <button
              className="bg-gray-300 p-2 rounded-full"
              onClick={() => setShowWebcam(!showWebcam)}
            >
              <FaCamera className="text-blue-600" />
            </button>
          </div>
          <p className="text-sm mt-2">Maximum size: 2MB</p>
        </div>

        {file && (
          <div className="file-info-container">
            <div className="flex items-center">
              <i className="fa fa-file text-2xl text-blue-500 mr-4"></i>
              <div>
                <p className="text-lg font-semibold text-white">{file.name}</p>
                <p className="text-sm text-white">{Math.round(file.size / 1024)} KB</p>
              </div>
            </div>
            <button onClick={handleDelete} className="text-red-500">
              <FaTrash className="text-2xl" />
            </button>
          </div>
        )}

        <button
          onClick={handleConvert}
          className="mt-6 w-full bg-pink-700 text-white py-3 rounded-lg font-semibold text-lg"
        >
          Convert
        </button>
      </div>

      {/* Webcam Component */}
      {showWebcam && (
        <div className="webcam-container">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full"
          />
          <button
            className="mt-4 bg-pink-700 text-white py-2 px-4 rounded-lg"
            onClick={handleCapture}
          >
            Capture
          </button>
        </div>
      )}

      {sketchUrl && (
        <div className={`slide-panel ${panelOpen ? 'open' : ''}`}>
          <img src={sketchUrl} alt="Your sketch" className="w-full" />
          
          {/* Download Button */}
          <a
            href={sketchUrl}
            download="sketch.png"
            className="download-btn"
          >
            <FaDownload />
          </a>
          <div
            className={`toggle-btn ${panelOpen ? 'open' : ''}`}
            onClick={togglePanel}
          >
            {panelOpen ? (
              <FaChevronLeft className="text-2xl" />
            ) : (
              <FaChevronRight className="text-2xl" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Ai;
