---
slug : python-json-operations-notes
---

## Principle 6 Table Implementation

#### JSON Database

Import JSON in Python
```python
import json
```

Load JSON in Python
```python
with open('input.json','r') as file:
	BillData = json.load(file)
```

Print JSON in Python
```python
// myObject = { "Dog" : 2, "cat" : 3};
print(json.dumps(myObject, indent=4))
```
Note: `dumps()` method encodes a Python object into JSON and returns a string

Save JSON in Python
```python

with open('output.json', 'w') as file:
	json.dump(myObject, file, indent=4) 
```
Note:  `dump()` method converts a Python object into a JSON and writes it to a file


#### MongoDB Database

Import 
```python
from pymongo import MongoClient
```

Connect MongoDB in python
```python
client = MongoClient('mongodb://localhost:27017/')
db = client['MyDatabaseName']
```

Insert Document into Database Collection
```python
db.my_collection1.insert_one(myObject) # collection/Table Name :- my_collection1
```

