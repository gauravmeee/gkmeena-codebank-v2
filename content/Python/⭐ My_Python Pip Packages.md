

---

## **`.env` Environment**

**Installation**
```bash
pip install python-dotenv
```

**Create `.env` File**
```
API_KEY=your_api_key
DB_USER=my_user
```

**Import**
```python
import os
from dotenv import load_dotenv
```

**Load `.env` in Python**
```python
# Load Environment Variables from .env File
load_dotenv() ⭐

# Access Variables
print(os.getenv('API_KEY')) ⭐
```

---
## **`CORS` (Cross-Origin Resource Sharing)**

> CORS allows web browsers to securely request resources from a **different origin** (domain, protocol, or port) than the one that served the web page.


**Flask with CORS**
```bash
# Installation
pip install flask-cors
```

```python
# Import
from flask import Flask
from flask_cors import CORS
```
```python
app = Flask(__name__)

CORS(app) # Allow All Origins
# or
CORS(app, resources={r"/api/*": {"origins": "http://example.com"}}, methods=["GET", "POST"]) # Allow Specific Origins & Methods

@app.route('/api/data')
def data():
    return {"message": "CORS enabled!"}

if __name__ == '__main__':
    app.run()
```

**FastAPI with CORS**
```bash
# Installation
pip install fastapi uvicorn
```

```python
# Import
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
```
```python
app = FastAPI()

app.add_middleware( # Allow All Origins
    CORSMiddleware,
    allow_origins=["*"],  # Allow all
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/api/data")
async def read_data():
    return {"message": "CORS enabled!"}

# Run: uvicorn main:app --reload
```

**Django with CORS**
```bash
# Installation
pip install django-cors-headers
```

```
Skipped X
```

**Common CORS Parameters**
- **`allow_origins`**: List of allowed domains (use `*` to allow all).
- **`allow_methods`**: Permitted HTTP methods (e.g., GET, POST, PUT, DELETE).
- **`allow_headers`**: Allowed request headers (e.g., `Authorization`, `Content-Type`).
- **`expose_headers`**: Headers exposed to the client.
- **`allow_credentials`**: Enable cookies and credentials sharing.
- **`max_age`**: Cache duration (in seconds) for the preflight request.

---
## **`Pillow` (PIL Fork)**

> Python Imaging Library for image manipulation.

**Installation**
```bash
pip install Pillow
```

**Import**
```python
from PIL import Image, ImageFilter, ImageEnhance
```

**Basic Operations**
```python
# Open an Image
img = Image.open("image.jpg") ⭐

# Save Image
img.save("output.png") ⭐

# Resize Image
img_resized = img.resize((300, 300))

# Rotate Image
img_rotated = img.rotate(45)

# Convert to Grayscale
img_gray = img.convert("L")

# Apply Blur Filter
img_blur = img.filter(ImageFilter.BLUR)

# Enhance Brightness
enhancer = ImageEnhance.Brightness(img)
img_bright = enhancer.enhance(1.5)

# Show Image
img.show() ⭐
```
- `PIL` : `Image.open()` -> .save(), `.resize()`, `.rotates()`, `.covert()`, `.filter()`, `.show()`
- `PIL` : `ImageFilter.BLUR` ( passes inside `.filter()` )
- `PIL` : `ImageEnhance.Brightness()` (Take `Image.open()` as argument) -> `.enhance()` 

---
## **`cv2` (OpenCV)**

> Computer Vision library for image/video processing.

**Installation**
```bash
pip install opencv-python
```

**Import**
```python
import cv2
```

**Basic Operations**
```python
# Read Image
img = cv2.imread('image.jpg') ⭐

# Display Image
cv2.imshow('Image', img) ⭐
cv2.waitKey(0)  # Wait for key press
cv2.destroyAllWindows()

# Resize Image
img_resized = cv2.resize(img, (300, 300))

# Convert to Grayscale
img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY) ⭐

# Save Image
cv2.imwrite('output.jpg', img_gray) ⭐

# Draw a Rectangle
cv2.rectangle(img, (50, 50), (200, 200), (0, 255, 0), 2)

# Apply Gaussian Blur
img_blur = cv2.GaussianBlur(img, (5, 5), 0)

# Capture from Webcam
cap = cv2.VideoCapture(0)
ret, frame = cap.read()
cv2.imshow("Webcam", frame)
cap.release()
cv2.destroyAllWindows()
```
- `cv2` ->  `.imread()` (take 1 argument i.e. image path ), 
- `cv2` -> `.imshow()`, `.imwrite()`   (take 2 argument i.e. `imread()` + 1 more)

---

## 🟡 **`pytesseract` (OCR Tool)**

> Python wrapper for Google’s Tesseract-OCR Engine.

**Installation**
```bash
pip install pytesseract
```

Ensure Tesseract is installed:
- **Linux**: `sudo apt-get install tesseract-ocr`
- **Windows**: Download from [Tesseract Website](https://github.com/UB-Mannheim/tesseract/wiki)

**Import**
```python
import pytesseract
from PIL import Image
```

 **Basic OCR Operations**
```python
# Path to Tesseract (Windows Only)
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# OCR on an Image
img = Image.open("image.png")
text = pytesseract.image_to_string(img) ⭐
print(text)

# Specify Language (e.g., English + Hindi)
text = pytesseract.image_to_string(img, lang="eng+hin")

# Extract Data with Bounding Boxes
data = pytesseract.image_to_data(img) ⭐
print(data)

# Extract Digits Only
digits = pytesseract.image_to_string(img, config="--psm 6 digits")
print(digits)
```
- `--psm 6`  option :  Treat image as a single block of text.
 - `--oem 3`  option :  Use LSTM OCR Engine. 
 - `digits`  option : Recognize digits only.  
 - `lang="eng"` option:  Recognize English text. 

---
