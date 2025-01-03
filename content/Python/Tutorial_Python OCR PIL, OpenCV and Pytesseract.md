---
slug : python-ocr-tutorial-notes
---
#  [OCR in Python Tutorial]((https://www.youtube.com/playlist?list=PL2VXyKi-KpYuTAZz__9KVl1jQz74bDG7i)
5/10 videos ✅

## 1. Introduction to OCR
Workflow

- PIL (Pillow) => Open an Image
- OpenCV => Change an Image
- Tesseract (Pytesseract) -> OCR an Image

## 2. How to install Libraries

### Python (PIL)
[pillow documentation ](https://pillow.readthedocs.io/en/stable/)

[Open cv Documentation](https://pypi.org/project/opencv-python/#documentation-for-opencv-python)

[Pytesseract documentation]

Install
- install pillow
```
pip install pillow
```

- install opencv
```
pip install opencv-python
```

- install tesseract
First Download Tesseract from the [Github Repo](https://github.com/UB-Mannheim/tesseract/wiki) 

Add directory `C:\Program Files\Tesseract-OCR` to system variable path
then

```
pip install pytesseract
```

- Import
```py
from PIL import Image
import cv2
import pytesseract
```

## 3. How to Open an Image in Python with PIL

As pillow is easy, use Pillow library to Open Image, 
use pillow for more simple tasks - processing, loading, open, passing, same, minor cropping,

As Opencv is computationally expensive, Opencv - more complex robustness tasks, binarization of an image , Controlling threshold of an image, 

```python
from PIL import Image
```
```python
# Assign file path
img_file = "/data/page_01.jpg"
```
```py
# Load this image in Memory
img = Image.open(img_file)
```
```py
# Open Image in Viewer
img.show()
```
```py
# Rotate 180 degree and show
img.rotate(180).show()
```
```py
## Save as new file
img.save("temp/img_file2.jpg")
```

##  4. How to Preprocess Images for Text OCR in Python 

1. Inverted Images
2. Rescaling
3. Binarization
4. Noise Removal
5. Dilation and Erosion
6. Rotation / Deskewing
7. Removing Borders
8. Missing Borders
9. Transparency / Alpha Channel

### 4.0 Opening an Image
```py
import cv2
img_file = "data.jpg"
img = cv2.imread(img_file)
```
```py
# Display Image In viewer
cv2.imshow("original image", img)
cv2.waitkey(0)
```
```py
# https://stackoverflow.com/questions/28816046/displaying-different-images-with-actual-size-in-matplotlib-subplot
from matplotlib import pyplot as plt

# Function to Display Image Inline
def display_image_in_actual_size(im_path):

    dpi = 80
    im_data = plt.imread(im_path)
    height, width, depth = im_data.shape

    # What size does the figure need to be in inches to fit the image?
    figsize = width / float(dpi), height / float(dpi)

    # Create a figure of the right size with one axes that takes up the full figure
    fig = plt.figure(figsize=figsize)
    ax = fig.add_axes([0, 0, 1, 1])

    # Hide spines, ticks, etc.
    ax.axis('off')

    # Display the image.
    ax.imshow(im_data, cmap='gray')

    plt.show()

# Display the Image
display_image_in_actual_size(img_file)
```

### 4.1 Inverted Images
```py 7
# Invert
inverted_image = cv2.bitwise_not(img)

# save file
cv2.imwrite("temp/inverted.jpg", inverted_imgae)
```

### 4.2 Rescaling
```py
```

### 4.3 Binarization
```py
# Function to Convert an image into grayscale
def grayscale(image):
    return cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Convert image into grayscale
gray_image = grayscale(img)

# save file
cv2.imwrite("temp/gray.jpg", gray_image)
```
noet:- converting into grayscale, before converting image into black and white make process easier

```py
# Convert into black and white
thres, img_bw = cv2.threshold(gray_image, 200, 230, cv2.THRESH_BINARY)

# save file
cv2.imwrite("temp/bw_image.jpg", img_bw)

# display
display("temp/bw_image.jpg")
```
note: - make sure to adjust threshold() for better result
 

### 4.4 Noise Removal
```python
# Function to remove noise
def noise_removal(image):
    import numpy as np
    kernal = np.ones((1,1), np.uint8)
    image = cv2.dilate(image, kernal, iterations=1)
    kernel = np.ones((1, 1) np.uint8)
    image = cv2.erods(image, kernel, iterations=1)
    image = cv2.morphologyEx(image, cv2.MORPH_CLOSE, kernel)
    image = cv2.mediaBlur(image, 3)
    return (image)

    # Remove noise
    no_noise = noise_removal(im_bw)

    # save file
    cv2.imwrite("temp/no_noise.jpg", no_noise)

    #display
    display("temp/no_noise.jpg")
```
### 4.5 Dilation and Erosion
Erosion - Thin
```py
# function to thin font
def thin_font(image):
    import numpy as np
    image = cv2.bitwise_not(image) # invert image
    kernel = np.ones((2, 2), np.uint8)
    image = cv2.erode(image, kernel, iterations=1)
    image = cv2.bitwise_not(image)
    return (image)

# thin font
eroded_image = thin_font(not_noise)

# save
cv2.imwrite("temp/eroded_image.jpg", eroded_image)

# display
display("temp/eroded_image.jpg)_
```
note:- adjust the parameters of np.one() for better result

Dilation - Thick
```py
def thick_font(image):
    import numpy as np
    image = cv2.bitwise_not(image) # invert image
    kernel = np.ones((2, 2), np.uint8)
    image = cv2.dilate(image, kernel, iterations=1)
    image = cv2.bitwise_not(image)
    return (image)
```
```py
# dilated_image
dilated_image = thick_font(no_noise)
# save
cv2.imwrite("temp/dilated_image.jpg", dilated_image)
# display
display("temp/dilated_image.jpg")
```

### 4.6 Rotation / Deskewing
```py
# getSkewAngle() function>
``` 
note: - contours allow you to draw bounding boxes.

```py
# deskew() function>
```  
```py
fixed = deskew(new)
cv2.imwrite("temp/rotated_fixed.jpg", fixed)
display("temp/rotated_fixed.jpg")
```    

 
### 4.7 Removing Border
```py
# remove border function
```
note:- if you dealing with pdf with margin the border are consitently the same cropping on any side. do not use this method. preprocess the pdf with pdf editor, image editor to edit in bulk if you already know the determed size

otherwise you can if you know the determine size an numbers such as width height, x and y you can go ahead and do that in opencv as well by passing in those arguments manually in `contours.
What this doing is it's creating those bounding boxes and finding the borders automatically. this is particularly good, if you are dealing with inconsistent borders across images 

```py
# call function
# save
#display
```
### 4.8 Add missing Border
```py
color = [ 255, 255, 255]
top, bottom, left, right = [150]*4
```
```py
image_with_border = cv2.copyMakeBorder(no_borders, top, bottom, left, right, cv2.BORDER_CONSTANT, value=color)

#save
#display
```

### 4.9 Transparency / Alpha Channel
```py
```



# 5. Introduction to PyTesseract

```py
import pytesseract
from PIL import Image
```
```py
img_file = "img.jpg"
no_noise ="temp/no_noise.jpg"
```
```py
img = Image.open(no_noise)
```
```py
ocr_result = pytesseract.image_to_string(img)
```
```py
print( ocr_result)
```
note:- pass preprocessed image or good source file for better result using opencv. we learn in last lecture.

there may be still some wrong output, these are known as like the dragons of ocr

machine learning for ocr is not 100% accurate, there may be 2% trade off



# How to Preprocess Images for Text OCR in Python

```py 
```

