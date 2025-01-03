---
slug : python-ocr-pytesseract-opencv-doubts-gpt-notes
---

### `pytesseract.image_to_string`

- To extract plain text from an image.
- Returns a single string containing the text extracted from the image.

```python
import pytesseract
import cv2

# Load the image
img = cv2.imread('example.jpg')

# Convert the image to a string
text = pytesseract.image_to_string(img, lang='eng')

print(text)
```

### `pytesseract.image_to_data`

#### Purpose:
- To extract detailed information about the detected text, including its bounding box coordinates, confidence level, and the actual text.

#### Output:
- Returns a dictionary with multiple keys, such as `level`, `page_num`, `block_num`, `par_num`, `line_num`, `word_num`, `left`, `top`, `width`, `height`, `conf`, and `text`.

#### Example Usage:
```python
import pytesseract
from pytesseract import Output
import cv2

# Load the image
img = cv2.imread('example.jpg')

# Convert the image to a dictionary of data
data = pytesseract.image_to_data(img, output_type=Output.DICT)

# Print the extracted data
for i in range(len(data['text'])):
    print(f"Text: {data['text'][i]}, Confidence: {data['conf'][i]}")
    print(f"Bounding box: ({data['left'][i]}, {data['top'][i]}, {data['width'][i]}, {data['height'][i]})")
```

**Store Key:Value Pairs in Dictionary **
```python
raw_text = pytesseract.image_to_string(image)
# Split the raw text into lines
lines = raw_text.split('\n') # List of Strings
# Dictionary to store extracted data
bill_data = {}
# Regex pattern to match key-value pairs separated by ":"
pattern = re.compile(r'^\s*(.*?):\s*(.*?)\s*$')

for line in lines:

# If the line matches the pattern, `match` will hold a match object; otherwise, it will be `None`.
match = pattern.match(line)
if match:
	key, value = match.groups()
# `strip()` removes any leading or trailing whitespace from the.
# cleaned `key` and `value` are then added to the `bill_data`
	bill_data[key.strip()] = value.strip()

#
```
Explaination of : key, value = match.groups()
```python
key, value = match.groups()
'''
- **Extracting Key and Value**: The `groups()` method returns a tuple containing the parts of the line that matched the capturing groups defined in the regex pattern:
    
    - The first group (`(.*?)`) corresponds to the `key`.
    - The second group (`(.*?)`) corresponds to the `value`.
- **Assignment**: The line assigns these two values to `key` and `value`, allowing you to work with them directly in the subsequent code.
'''
```