
#### Python  Inbuilt Libraries

**1. Data Types & Structures**
- `collections` – Specialized data structures (e.g., `Counter`, `deque`).
- `array` – Efficient arrays of numeric values.
- `datetime` – Date and time manipulation.
- `math` – Mathematical functions (e.g., `sqrt()`, `pi`).
- `random` – Random number generation.

**2. File Handling & I/O**
- `os` – Interact with the operating system.
- `sys` – System-specific parameters and functions.
- `io` – Core I/O operations.
- `csv` – Read and write CSV files.
- `json` – Parse JSON data.

**3. Algorithms & Computations**
- `itertools` – Efficient looping and combinatorial functions.
- `functools` – Higher-order functions (e.g., `reduce()`, `lru_cache()`).
- `math` – Mathematical operations.
- `statistics` – Basic statistical functions (e.g., `mean()`, `median()`).

 **4. Networking & Internet**
- `http` – HTTP protocol handling.
- `socket` – Low-level networking.
- `urllib` – Fetch data from URLs.

**5. Testing & Debugging**
- `unittest` – Unit testing framework.
- `logging` – Logging utility for applications.
- `traceback` – Print and manage tracebacks.

**6. Data Serialization**
- `pickle` – Serialize Python objects.
- `json` – Encode and decode JSON data.

**7. Regular Expressions**
- `re` – Regular expression matching and manipulation.

**8. Cryptography & Security**
- `hashlib` – Secure hash algorithms (e.g., `sha256()`).
- `hmac` – Hash-based message authentication codes.

**9. Concurrency & Parallelism**
- `threading` – Thread-based parallelism.
- `multiprocessing` – Process-based parallelism.
- `asyncio` – Asynchronous I/O.

**10. Miscellaneous**
- `time` – Time-related functions.
- `copy` – Shallow and deep copy operations.
- `subprocess` – Run and control subprocesses.

---
##  **`datetime` Module**

> For working with dates and times.

**Importing**
```python
from datetime import datetime, date, timedelta
```

**Current Date & Time**
```python
now = datetime.now()               # Current date & time
today = date.today()               # Current date (without time)
print(now, today)
```

**Formatting Dates** ⭐
```python
formatted = now.strftime("%Y-%m-%d %H:%M:%S")  # Custom format
print(formatted)                               # e.g., 2023-08-27 14:35:22
```

**Common Format Codes:**
- `%Y` – Year (2023), `%m` – Month (08), `%d` – Day (27), `%H` – Hour (24-hour), `%M` – Minute, `%S` – Second

**Parsing Strings to Dates**
```python
date_obj = datetime.strptime("2023-08-27", "%Y-%m-%d")
print(date_obj)  # 2023-08-27 00:00:00
```

**Date Arithmetic**
```python
tomorrow = today + timedelta(days=1)
print(tomorrow)  # Next day's date
```


---

##  **`time` Module**

> For working with time and delays.

**Importing**
```python
import time
```

 **Current Time**
```python
print(time.time())  # Epoch time (seconds since 1970)
print(time.ctime()) # Human-readable (e.g., "Mon Aug 28 14:00:00 2023")
```

**Sleep (Delay Execution)**
```python
print("Start")
time.sleep(3)  # Pause for 3 seconds
print("End")
```

**Measure Execution Time**
```python
start = time.time()
time.sleep(2)
end = time.time()
print(f"Elapsed: {end - start:.2f} seconds")
```

**Formatting Time**
```python
now = time.localtime()
print(time.strftime("%Y-%m-%d %H:%M:%S", now))  # 2023-08-28 14:00:00
```

---

##  **`os` Module**

> For interacting with the operating system.

**Importing**
```python
import os
```

**File and Directory Operations**
```python
print(os.getcwd())          # Current working directory
os.mkdir("new_folder")      # Create a directory
os.rmdir("new_folder")      # Remove an empty directory
os.remove("file.txt")       # Delete a file
```

**Path Operations** ⭐
```python
print(os.path.exists("file.txt"))         # Check if a file exists
print(os.path.join("folder", "file.txt")) # Join paths safely
```

**Accessing Environment Variable**
```python
api_key = os.getenv('API_KEY') # Get Environment Variable
db_user = os.getenv('DB_USER', 'default_user') # Default Value if Variable is Missing
```

 **Environment Variables**
```python
# Set new environment variable
os.environ['API_KEY'] = '123'  

# Accessing Environment Variable
print(os.environ['API_KEY'])    # Access environment variable
print(os.getenv('API_KEY')) # or Another Method to Access ⭐
print(os.getenv('API_KEY', 'default_user')) # Default Value if Variable is Missing
```
Or Setting Environment Variables from the OS (Outside Python)
```bash
# Setting Environment Variables - Temporarily (For Current Session)
export API_KEY="your_api_key" # Linux/macOS
set API_KEY="your_api_key" # Windows (Command Prompt)
$env:API_KEY="your_api_key" # Windows (PowerShell)
```
- **`os.environ`**: Changes persist **only while the Python process is running**.
- **`export` / `set` / `$env:`**: Lasts **only for the session**—not permanent.
- **Use `os.getenv()`** for safer access to avoid `KeyError`.
- **Priority Order of Environment Variables in Python**:
	- Python Process (`os.environ`)  > Shell/Terminal Session > System Environment Variables

---

## **`csv` Module**

> For handling CSV (Comma-Separated Values) files.

**Importing**
```python
import csv
```

**Read CSV File**
```python
with open("data.csv", "r") as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)
```

**Write CSV File**
```python
data = [["Name", "Age"], ["Alice", 30], ["Bob", 25]]

with open("output.csv", "w", newline='') as file:
    writer = csv.writer(file)
    writer.writerows(data)
```

**Read CSV as Dictionary**
```python
with open("data.csv", "r") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(row['Name'], row['Age'])
```

**Write CSV from Dictionary**
```python
data = [{'Name': 'Alice', 'Age': 30}, {'Name': 'Bob', 'Age': 25}]

with open("output.csv", "w", newline='') as file:
    fieldnames = ['Name', 'Age']
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(data)
```

---

## **`json` Module**

> For working with JSON (JavaScript Object Notation) data.

**Importing**
```python
import json
```

**Read JSON from File**
```python
with open("data.json", "r") as file:
    data = json.load(file)
    print(data)
```

**Write JSON to File**
```python
data = {"name": "Alice", "age": 30}

with open("output.json", "w") as file:
    json.dump(data, file, indent=4)
```

**Convert JSON String to Python**
```python
json_str = '{"name": "Bob", "age": 25}'
data = json.loads(json_str)
print(data['name'])
```

**Convert Python to JSON String**
```python
data = {"name": "Charlie", "age": 35}
json_str = json.dumps(data, indent=4)
print(json_str)
```

---


## **`math` Module**

> For mathematical functions.

**Importing**
```python
import math
```

**Basic Operations**
```python
print(math.sqrt(25))      # Square root (5.0)
print(math.pow(2, 3))     # Power (2^3 = 8.0)
print(math.factorial(5))  # Factorial (120)
print(math.gcd(12, 15))   # Greatest Common Divisor (3)
```

**Constants**
```python
print(math.pi)      # π (3.141592653589793)
print(math.e)       # Euler’s number (2.718281828459045)
print(math.inf)     # Infinity
```

**Rounding & Trigonometry**
```python
print(math.floor(3.7))    # Round down (3)
print(math.ceil(3.2))     # Round up (4)

print(math.sin(math.pi/2)) # Sine (1.0)
print(math.degrees(math.pi)) # Radians → Degrees (180.0)
print(math.radians(180))     # Degrees → Radians (π)
```

---

## **`http` Module**

> For HTTP requests and server utilities.

**Importing**
```python
from http.client import HTTPConnection
```

**Simple GET Request**
```python
conn = HTTPConnection("example.com")
conn.request("GET", "/")
response = conn.getresponse()
print(response.status, response.reason)  # 200 OK
print(response.read().decode())          # Response body
conn.close()
```

---

## **`urllib` Module**

> For URL handling and web requests.

**Importing**
```python
import urllib.request
import urllib.parse
```

 **Open a URL**
```python
response = urllib.request.urlopen("http://example.com")
print(response.read().decode())  # Page content
```

**Send Data (POST Request)**
```python
data = urllib.parse.urlencode({'name': 'Alice'}).encode()
response = urllib.request.urlopen("http://example.com", data=data)
print(response.read().decode())
```

 **Download a File**
```python
urllib.request.urlretrieve("http://example.com/image.jpg", "image.jpg")
```

---
##  **`re` Module**

> For regular expressions (pattern matching).

 **Importing**
```python
import re
```

**Search for a Pattern** ⭐
```python
text = "My phone number is 123-456-7890"
match = re.search(r'\d{3}-\d{3}-\d{4}', text)
if match:
    print(match.group())  # 123-456-7890
```

**Find All Matches** ⭐
```python
emails = re.findall(r'\w+@\w+\.\w+', "Contact us at a@test.com or b@xyz.com")
print(emails)  # ['a@test.com', 'b@xyz.com']
```

**Replace Text**
```python
new_text = re.sub(r'\d+', 'XXX', 'Order 123 has been shipped.')
print(new_text)  # Order XXX has been shipped.
```

**Split Text**
```python
words = re.split(r'\W+', "Python is awesome!")
print(words)  # ['Python', 'is', 'awesome', '']
```

---

## **`asyncio` Module**

> For asynchronous programming (I/O-bound tasks).

**Importing**
```python
import asyncio
```

**Simple Async Function** ⭐
```python
# Define an asynchronous function using 'async def'
async def greet():
    await asyncio.sleep(1)  # Non-blocking sleep for 1 second (simulates I/O operation).
    print("Hello, World!")  # Prints after the 1-second delay.

# Run the asynchronous function using 'asyncio.run()'
asyncio.run(greet())  # Starts the event loop and runs the 'greet()' coroutine.
```

 **Run Multiple Tasks**
```python
async def task(name, delay):
    await asyncio.sleep(delay)
    print(f"Task {name} finished!")

# Main coroutine to run multiple tasks concurrently
async def main():
	# Run both tasks concurrently and wait for both to complete
    await asyncio.gather(task(1, 2), task(2, 1))
    
# Start the asyncio event loop and execute 'main()'
asyncio.run(main())
```

**Asynchronous HTTP Request**
```python
import aiohttp # For making asynchronous HTTP requests.

# Define an asynchronous function to fetch content from a URL
async def fetch(url):
	# Create an asynchronous HTTP session
    async with aiohttp.ClientSession() as session:
	    # Make an asynchronous GET request to the URL
        async with session.get(url) as resp:
	        # Wait for and print the response body (text content)
            print(await resp.text())

# Start the event loop and run the 'fetch()' coroutine
asyncio.run(fetch('http://example.com'))
```

