def con_img_sketch(image):
    inverted_image = 255 - image
    blurred = cv2.GaussianBlur(inverted_image, (31, 31), 0)
    sketch_image = cv2.divide(image, 255 - blurred, scale=256)
    sketch_image = cv2.convertScaleAbs(sketch_image, alpha=1.5, beta=-100)
    return sketch_image
