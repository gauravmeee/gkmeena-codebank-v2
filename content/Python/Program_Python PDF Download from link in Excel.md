
>The scripting language is basically a language where instructions are written for a run time environment. They do not require the compilation step and are rather interpreted. It brings new functions to applications and glue complex system together. A scripting language is a programming language designed for integrating and communicating with other programming languages.

# Python program to download `pdf` from a `url` , stored in excel column.
`openpyxl` library ies required by pandas to read Excel files.

```bash
pip install pandas requests openpyxl
```
Note:- PDF files are either 8-bit binary files or 7-bit ASCII text files

#### http requestss status codes
Informational responses (100 – 199)\
Successful responses (200 – 299)\
Redirection messages (300 – 399)\
Client error responses (400 – 499)\
Server error responses (500 – 599)

*Code:*
```py
import os
import pandas as pd
import requests
```

```py
# Function to download a PDF from a URL and save it with a specific name
def download_pdf(url, filename):
    response = requests.get(url)
    if response.status_code == 200:
        with open(filename, 'wb') as f: 
            f.write(response.content)
        print(f"Downloaded: {filename}")
    else:
        print(f"Failed to download: {url}")
```

```py
# Read the Excel file
excel_file = 'path_to_your_excel_file.xlsx'
df = pd.read_excel(excel_file) # pandas function
```
```py
# Create a new folder to save the PDFs
output_folder = 'downloaded_pdfs'
os.makedirs(output_folder, exist_ok=True)
```
```py
# Iterate over the rows in the DataFrame and download each PDF
for index, row in df.iterrows(): # iterrows panas function
    company_name = row['Company Name']
    pdf_url = row['PDF Link']
    pdf_filename = os.path.join(output_folder, f"{company_name}.pdf")
    download_pdf(pdf_url, pdf_filename)
```
## Trim whitespace
"Column Name \n" -> "Column Name" 
```py
# Trim whitespace from column names
df.columns = df.columns.str.strip()
```

## Print actual colums in Dataframe.

```py
# Print column names to check their exact names
print("Columns in the Excel file:", df.columns)
```

put the "Column Name" and "PDF Link" in a variable, and pass the variable into :

find and update these line of codes:
```py
# Ensure the column names match the Excel file's structure

company_column = 'Company Name'  # Update actual Column name 
url_column = 'PDF Link'          # Update  actual Column name 
```

```py  
company_name = row[company_column]
pdf_url = row[url_column]
```


# No Error, but file is not downloading....
Try limiting time, and repeat try



- **Add Timeout:** The timeout=10 parameter ensures that the request doesn't hang indefinitely.
in `def download_pdf()` function definition, 
add `timeout=10` in `response = requests.get(url)`

- **Error Handling:** The try-except block catches exceptions and prints meaningful error messages. 
in `def download_pdf()` function definition, `try` to download file .\
if file not downloaded due to some error, get the error exception using `except requests.exceptions.RequestException as e` and print the error `print(f"Request failed for {url}:{e}")`

Add:
```py
from requests.exceptions import ConnectionError, Timeout, RequestException
import time
```

```py
def download_pdf(url, filename):
    try:
        response = requests.get(url, timeout=10)  # Set a timeout for the request
        if response.status_code == 200:
            with open(filename, 'wb') as f:
                f.write(response.content)
            print(f"Downloaded: {filename}")
        else:
            print(f"Failed to download {url}: Status code {response.status_code}")
    # error Handling
    except requests.exceptions.RequestException as e:
        print(f"Request failed for {url}: {e}")
```
# Connection Error
```
in send
raise ConnectionError(err, request=request)
requests.exceptions.ConnectionError: ('Connection aborted.', RemoteDisconnected('Remote end closed connection without response'))
```
in `try:` replace `if response.status_code == 200:`
with `response.raise_for_status()`
and `return` if fuction is download is succesful

add `break` in existing `except` to exit loop if request error is not recoverable 

add other exception  `except (ConnectionError, Timeout) as e:` and print `time.sleep(backoff_factor * (2 ** i))`
```
return  # Exit function if download is successful
```

**Retry Mechanism:** The script retries the download up to 3 times with exponential backoff if a `ConnectionError` or `Timeout` occurs. `for i in range(retries)`

**Exception Handling:** Different types of exceptions (ConnectionError, Timeout, and RequestException) are handled to provide more informative error messages and control flow.

Get the error using `except (ConnectionError, Timeout) as e:` and print the error using `print(f"Attempt {i + 1} failed for {url}: {e}")` and wait this time before retry `time.sleep(backoff_factor * (2 ** i))`


```py

def download_pdf(url, filename):
    retries = 3  # Number of retries
    backoff_factor = 0.3  # Time to wait between retries
    for i in range(retries):
        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()  # Raise HTTPError for bad responses
            with open(filename, 'wb') as f:
                f.write(response.content)
            print(f"Downloaded: {filename}")
            return  # Exit function if download is successful
        except (ConnectionError, Timeout) as e:
            print(f"Attempt {i + 1} failed for {url}: {e}")
            time.sleep(backoff_factor * (2 ** i))  # Exponential backoff
        except RequestException as e:
            print(f"Request failed for {url}: {e}")
            break  # Exit loop if request error is not recoverable
    print(f"Failed to download: {url}")
```

# Read time out

```
Attempt 1 failed for https://nsearchives.nseindia.com/corporate/VOLTAS_RB_15062024001558_StexchBRSRfiling2024.pdf: HTTPPSConnectionPool(host='nsearchives.nseindia.com', port=443): Read timed out. (read timeout=10)
```
**Increased Timeout:** The timeout parameter in the requests.get call is increased to 60 seconds.

**User-Agent Header:** A user-agent header is added to the request to mimic a browser.
`headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }`

**Session with Keep-Alive:** Using a requests.Session with retry logic.

**Logging Failed Downloads:** Failed downloads are logged to failed_downloads.log for further review. `with open("failed_downloads.log", "a") as log_file:
        log_file.write(f"{url}\n")`

**Retries and Backoff:** The number of retries is increased to 5, and the backoff factor is adjusted to give more time between retries.

```py
# from requests.exceptions import ConnectionError, Timeout, RequestException
from requests.adapters import HTTPAdapter, Retry
```
```py
def download_pdf(session, url, filename):
    retries = 5  # Number of retries
    backoff_factor = 0.5  # Time to wait between retries
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    for i in range(retries):
        try:
            response = session.get(url, headers=headers, timeout=30)  # Further increased timeout
            response.raise_for_status()  # Raise HTTPError for bad responses
            with open(filename, 'wb') as f:
                f.write(response.content)
            print(f"Downloaded: {filename}")
            return  # Exit function if download is successful
        except (requests.ConnectionError, requests.Timeout) as e:
            print(f"Attempt {i + 1} failed for {url}: {e}")
            time.sleep(backoff_factor * (2 ** i))  # Exponential backoff
        except requests.RequestException as e:
            print(f"Request failed for {url}: {e}")
            break  # Exit loop if request error is not recoverable
    print(f"Failed to download: {url}")
    with open("failed_downloads.log", "a") as log_file:
        log_file.write(f"{url}\n")
```
```py
# Create a session with retries
session = requests.Session()
retries = Retry(total=5, backoff_factor=1, status_forcelist=[429, 500, 502, 503, 504])
session.mount('https://', HTTPAdapter(max_retries=retries))
```

# Working
```py
# Function to download
def download_pdf(session, url, filename):
    retries = 5  # no. of retry
    backoff_factor = 1  
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    for i in range(retries):
        try:
            response = session.get(url, headers=headers, timeout=10)
            response.raise_for_status() 
            with open(filename, 'wb') as f:
                f.write(response.content)
            print(f"Downloaded: {filename}")
            return  # Return if file downloaded : )
        
        # Error Handling
        except (requests.ConnectionError, requests.Timeout) as e:
            print(f"Attempt {i + 1} failed for {url}: {e}")
            time.sleep(backoff_factor * (2 ** i))  
        except requests.RequestException as e:
            print(f"Request failed for {url}: {e}")
            break  # Exit loop if request error not goes.
    print(f"Failed to download: {url}")
    with open("failed_downloads.log", "a") as log_file:
        log_file.write(f"{url}\n")
```
```py
# Read Excel file
excel_file = 'Task 1.xlsx'
df = pd.read_excel(excel_file)

# Create new folder for pdf to store the pdf
output_folder = 'CARBON_CRUNCH_PDFS'
os.makedirs(output_folder, exist_ok=True)

print("Columns in the Excel file:", df.columns)

# Retry 
session = requests.Session()
retries = Retry(total=5, backoff_factor=1, status_forcelist=[429, 500, 502, 503, 504])
session.mount('https://', HTTPAdapter(max_retries=retries))

# Iterate over the rows in the DataFrame
for index, row in df.iterrows():
    company_name = row['COMPANY \n']
    pdf_url = row['ATTACHMENT \n']
    pdf_filename = os.path.join(output_folder, f"{company_name}.pdf")
    download_pdf(session, pdf_url, pdf_filename)
```