---
slug : python-important-libraries-functions-gpt-notes
---

# Python Libraries Function
- [Pandas](#pandas)
- [Requests](#Requests)
- [BeautifulSoup](#beautifulsoup)
- [Selenium](#selenium)
- [Flask](#flask)

## Pandas

```python
import pandas as pd
```
### DataFrame Creation and Inspection
```python
data = {'Name': ['Alice', 'Bob', 'Charlie', 'David'],
'Age': [24, 27, 22, 32],
'City': ['New York', 'Los Angeles', 'Chicago', 'Houston']}
```
**Creating DataFrames:**
- `pd.DataFrame(data)`: Create a DataFrame from a dictionary or a list of lists.
- `pd.read_csv('file.csv')`: Read a CSV file into a DataFrame.
- `pd.read_excel('file.xlsx')`: Read an Excel file into a DataFrame.

**Inspecting DataFrames:**
- `df.head(n)`: Return the first `n` rows.
- `df.tail(n)`: Return the last `n` rows.
- `df.info()`: Summary of the DataFrame.
- `df.describe()`: Generate descriptive statistics.

### Selection and Filtering

```python
df = pd.DataFrame(data)
```

**Selecting Data:**
- `df['column']`: Select a single column.
- `df[['col1', 'col2']]`: Select multiple columns.
- `df.iloc[<row_index>, <col_index>]`: Select by position.
- `df.loc[<row_label>, <col_label>]`: Select by label.

**Filtering Data:**
- `df[df['column'] > value]`: Filter rows based on column value.
- `df[(df['col1'] > value1) & (df['col2'] < value2)]`: Filter with multiple conditions.

### Data Cleaning

**Handling Missing Data:**
- `df.dropna()`: Remove rows with missing values.
- `df.fillna(value)`: Fill missing values with a specified value.

**Removing Duplicates:**
- `df.drop_duplicates()`: Remove duplicate rows.

### Data Transformation

**Column Operations:**
- `df['new_col'] = df['col1'] + df['col2']`: Create a new column.
- `df.rename(columns={'old_name': 'new_name'})`: Rename columns.

**Data Aggregation:**
- `df.groupby('column').mean()`: Group by a column and compute mean.
- `df.pivot_table(values, index, columns)`: Create a pivot table.

### Merging and Joining

**Combining DataFrames:**
- `pd.concat([df1, df2])`: Concatenate DataFrames along a particular axis.
- `pd.merge(df1, df2, on='key')`: Merge DataFrames on a key column.

### Input/Output

**Saving DataFrames:**
- `df.to_csv('file.csv')`: Save DataFrame to a CSV file.
- `df.to_excel('file.xlsx')`: Save DataFrame to an Excel file.

### Time Series

**Date and Time Functions:**
- `pd.to_datetime(df['date_column'])`: Convert a column to datetime.
- `df.set_index('date_column')`: Set a datetime column as the index.

### Visualization (with Matplotlib)

**Basic Plotting:**
- `df.plot()`: Basic plotting.
- `df.hist()`: Histogram of the DataFrame.

## Requests

The `requests` library in Python is used for making HTTP requests. Here are some of the most important functions and methods provided by the `requests` library:

### Basic Requests

**GET Request:**
```python
import requests
response = requests.get('https://api.example.com/data')
print(response.text)
```

**POST Request:**
```python
import requests
payload = {'key1': 'value1', 'key2': 'value2'}
response = requests.post('https://api.example.com/data', data=payload)
print(response.text)
```

**PUT Request:**
```python
import requests
payload = {'key1': 'value1', 'key2': 'value2'}
response = requests.put('https://api.example.com/data/1', data=payload)
print(response.text)
```

**DELETE Request:**
```python
import requests
response = requests.delete('https://api.example.com/data/1')
print(response.text)
```

### Working with Responses

**Response Content:**
- `response.text`: Get the response content as a string.
- `response.content`: Get the response content as bytes.
- `response.json()`: Parse the response content as JSON.

**Response Status Code:**
```python
if response.status_code == 200:
print('Success!')
elif response.status_code == 404:
print('Not Found.')
```

**Response Headers:**
```python
print(response.headers)
print(response.headers['Content-Type'])
```

### Sending Parameters

**Query Parameters:**
```python
import requests
params = {'key1': 'value1', 'key2': 'value2'}
response = requests.get('https://api.example.com/data', params=params)
print(response.url)
```

**POST Request with JSON:**
```python
import requests
payload = {'key1': 'value1', 'key2': 'value2'}
response = requests.post('https://api.example.com/data', json=payload)
print(response.text)
```

### Authentication

**Basic Authentication:**
```python
from requests.auth import HTTPBasicAuth
response = requests.get('https://api.example.com/data', auth=HTTPBasicAuth('user', 'pass'))
print(response.text)
```

### Headers

**Custom Headers:**
```python
import requests
headers = {'User-Agent': 'my-app/0.0.1'}
response = requests.get('https://api.example.com/data', headers=headers)
print(response.text)
```

### Sessions

**Session Object:**
```python
import requests
session = requests.Session()
session.get('https://api.example.com/login')
response = session.get('https://api.example.com/data')
print(response.text)
```

### Timeouts

**Timeouts:**
```python
import requests
try:
response = requests.get('https://api.example.com/data', timeout=5)
print(response.text)
except requests.Timeout:
print('The request timed out')
```

### Handling Errors

**Exception Handling:**
```python
import requests
try:
response = requests.get('https://api.example.com/data')
response.raise_for_status()
except requests.HTTPError as err:
print(f'HTTP error occurred: {err}')
except Exception as err:
print(f'Other error occurred: {err}')
```

### File Uploads

**File Uploads:**
```python
import requests
files = {'file': open('report.txt', 'rb')}
response = requests.post('https://api.example.com/upload', files=files)
print(response.text)
```

### Cookies

**Sending and Receiving Cookies:**
```python
import requests
response = requests.get('https://api.example.com/data')
print(response.cookies)

cookies = {'session_id': '123456789'}
response = requests.get('https://api.example.com/data', cookies=cookies)
print(response.text)
```

Redirection and History

17. **Redirection:**
```python
import requests
response = requests.get('https://api.example.com/data', allow_redirects=True)
print(response.url)
print(response.history)
```

### Streaming Requests

**Streaming Responses:**
```python
import requests
with requests.get('https://api.example.com/largefile', stream=True) as response:
for chunk in response.iter_content(chunk_size=8192):
print(chunk)
```

## BeautifulSoup

BeautifulSoup is a powerful library for web scraping and parsing HTML and XML documents in Python. Here are some important functions and methods provided by BeautifulSoup:

### Basic Setup

**Installing BeautifulSoup:**
```bash
pip install beautifulsoup4
pip install lxml  # Optional, for faster parsing
```

**Creating a BeautifulSoup Object:**
```python
from bs4 import BeautifulSoup
```
```py
soup = BeautifulSoup(html_doc, 'lxml')  # You can also use 'html.parser'
```

### Navigating the Parse Tree

**Finding Elements:**
- `soup.find('tag')`: Finds the first occurrence of a tag.
- `soup.find_all('tag')`: Finds all occurrences of a tag.
- `soup.find(id='id')`: Finds the first element with the specified ID.
- `soup.find_all(class_='class_name')`: Finds all elements with the specified class.

**Navigating the Tree:**
- `element.parent`: Access the parent of an element.
- `element.children`: Access the children of an element.
- `element.next_sibling`: Access the next sibling of an element.
- `element.previous_sibling`: Access the previous sibling of an element.

5. **Accessing Attributes:**
- `element['attribute']`: Access the value of an attribute.
- `element.attrs`: Access all attributes as a dictionary.

6. **Getting Text:**
- `element.text`: Get all the text inside an element.
- `element.get_text(separator, strip)`: Get all the text with options for separator and stripping whitespace.

### Searching with Filters

7. **Using Functions and Lists:**
- `soup.find_all(['a', 'b'])`: Find all 'a' and 'b' tags.
- `soup.find_all(attrs={'class': 'class_name'})`: Find all tags with a specific class.
- `soup.find_all(id=True)`: Find all tags with an ID attribute.

8. **CSS Selectors:**
- `soup.select('css_selector')`: Select elements using CSS selectors.
- `soup.select_one('css_selector')`: Select the first element that matches the CSS selector.

### Modifying the Parse Tree

9. **Modifying Elements:**
- `element['attribute'] = 'value'`: Set an attribute's value.
- `element.string.replace_with('new string')`: Replace the text inside an element.
- `element.decompose()`: Remove an element from the tree.

10. **Adding New Elements:**
- `new_tag = soup.new_tag('tag')`: Create a new tag.
- `element.append(new_tag)`: Append the new tag to an element.

### Output

11. **Pretty Print:**
`print(soup.prettify())`

## Flasks

Flask, a micro web framework for Python, provides various functions and methods to handle routing, request handling, rendering templates, and more. Here is a list of some commonly used Flask functions:

### 1. **App Functions**

#### `Flask(__name__)`
- Creates an instance of the Flask application.

#### `run(host=None, port=None, debug=None, **options)`
- Runs the Flask application on a local development server.

### 2. **Routing Functions**

#### `@app.route(rule, options)`
- A decorator to bind a URL rule to a view function.

#### `@app.route('/')`
- Binds the root URL to a view function.

#### `@app.route('/<variable_name>')`
- Binds a URL with a variable to a view function.

### 3. **Request Handling**

#### `request.method`
- Returns the method used for the request (GET, POST, etc.).

#### `request.form`
- Access form data submitted via POST.

#### `request.args`
- Access query string parameters.

#### `request.json`
- Access JSON data sent with the request.

#### `request.files`
- Access uploaded files.

### 4. **Response Handling**

#### `make_response()`
- Creates a response object.

#### `redirect(location)`
- Returns a redirect response to the specified location.

#### `url_for(endpoint, **values)`
- Generates a URL for the given endpoint and values.

#### `abort(code)`
- Aborts a request with the specified status code.

### 5. **Template Rendering**

#### `render_template(template_name, **context)`
- Renders a template with the given context.

### 6. **Sessions and Cookies**

#### `session`
- Provides access to the user session.

#### `set_cookie(key, value, **options)`
- Sets a cookie in the response.

#### `get_cookie(key)`
- Retrieves the value of a cookie.

### 7. **Blueprints**

#### `Blueprint(name, import_name, **options)`
- Creates a blueprint for organizing a group of related routes and handlers.

### 8. **Error Handling**

#### `@app.errorhandler(code)`
- A decorator to handle specific HTTP errors.

### 9. **Request Hooks**

#### `@app.before_request`
- A decorator to run a function before each request.

#### `@app.after_request`
- A decorator to run a function after each request.

#### `@app.teardown_request`
- A decorator to run a function after the request context is torn down.

