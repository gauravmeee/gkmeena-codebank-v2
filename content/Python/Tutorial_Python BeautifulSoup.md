**BeautifulSoup** - Python package for parsing HTML and XML documents

[BS4 Documentation](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)


Extract content from a url
```python
import requests

url = "https://timesofindia.indiatimes.com/city/delhi"

r = requests.get(url)
print(r.text)
```

Add function to save r.text in a file
```python
import requests

#fuction to write r.tex in a file
def fetchAndSaveToFile(url, path):
    r= requests.get(url)
    # syntax to open file in write mode
    with open(path, "w") as f:
        f.write(r.text)
        
url = "https://timesofindia.indiatimes.com/city/delhi"

# save file fuction call
fetchAndSaveToFile(url, "data/times.html")
```

Use with proxies, here `Proxy Lab` to access url
```python
import requests

#proxy lab proxy
proxies = {
     "http": "http://customer-rcodewithharry:ActcitXccR8xbxs@pr.oxylabs.io:7777"
     "htts": "http://customer-rcodewithharry:ActcitXccR8xbxs@pr.oxylabs.io:7777"
     }

def fetchAndSaveToFile(url, path):
    r= requests.get(url)
    with open(path, "w") as f:
        f.write(r.text)
        
url = "https://timesofindia.indiatimes.com/city/delhi"

fetchAndSaveToFile(url, "data/times.html")
```

Use services like *Oxylab Proxies* to generate new IP adress everytime, So no fear of blocking of a IP adress and exhaution of limit of a IP address to fetch a website

To Access .html file using BeautifulSoup
```python
import requests
from bs4 import BeautifulSoup

# syntax to open file in read mode
with open("sample.html", "r") as f:
    html_doc = f.read()

soup = Beautifulsoup(html_doc, 'html.parser')
```
