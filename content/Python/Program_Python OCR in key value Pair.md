
```python
# best output group logical text ✅, key value payer ✅
# give text => { key: value} , {account name : gaurav}
import pytesseract
from PIL import Image
import re
import cv2
import numpy as np

def extract_text_data(image_path):

    # Load the image using PIL
    pil_image = Image.open(image_path)

    image = np.array(pil_image)

    # make gray
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Use pytesseract to do OCR on the image
    raw_text = pytesseract.image_to_string(image)

    # Split the raw text into lines
    lines = raw_text.split('\n')

    # Dictionary to store extracted data
    bill_data = {}

    # Regex pattern to match key-value pairs separated by ":"
    pattern = re.compile(r'^\s*(.*?):\s*(.*?)\s*$')

    # Loop through each line and find key-value pairs
    for line in lines:
        match = pattern.match(line)
        if match:
            key, value = match.groups()
            bill_data[key.strip()] = value.strip()
    # Return the extracted data
    return bill_data

# Example usage
image_path = 'img.jpg
bill_data = extract_text_data(image_path)
print(bill_data)
```