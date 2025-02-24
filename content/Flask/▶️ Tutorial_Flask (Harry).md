# [Python Flask Web Development Tutorial in Hindi](https://youtu.be/oA8brF3w5XQ)

Open the Project Directory 
```
|project
```
Install Virtual Virtual Environment
```sh
pip install virtualenv 
```
Create Virtual Environment
```sh
virtualenv env
```
```
project
└── env
```

Note:- In a system you can install only one version of Software, let python. If you want to install different versions and packages for it, without disturbing the Orginal python. you can create a virtual environment

If you see error to execute the script in powershell, change execution policy.

```sh
Set-ExecutionPolicy unrestricted
```
Activate Virtual Environment every time you open a new terminal

```sh
# activate in powershell -> ps1
.\env\Scripts\activate.ps1
```
trick:- type `env` and hit `tab` it will autocomplete 
to `.\env\Scripts\`


Install flask
```sh
pip install flask
```
note:- Installing modules in global interpreter will not able to run in this environment apps. so be carefull to install them. the will automatically install in your `/env` directory of your project

Flask Minimal App
```python
# app
from flask import Flask
app = Flask(_name_)

@app.route('/')
def hello_world():
    return 'Hello, World!'
```
```python
# Call or run the app.
if __name__ == "__main__":
    app.run(debug=True)
```
Save it as app.py
```
project
├── env
└── app.py
```
This code block does the following:

- `if __name__ == "__main__":` checks if the script is being run directly (not imported as a module).
- `app.run(debug=True)` starts the Flask web server with debug mode enabled

trick: in vs code to open terminal using "Ctrl + Shift+ `"

Run the program
```sh
py ./app.py
#or
python ./app.py
```
Output
```sh
Running on http://127.0.0.1:5000
```
open the link and hurray!, your app is working.

to change the server from 5000 to 8000
```py
# Change the line
if __name__ == "__main__":
    app.run(debug=True, port=8000)
```
note: - on save, `flask` will automatically reload the devlopment server like `nodemone`

Add another routes
```py
@app.route('/products')
def products():
    return 'This is products page'
```
save it and see the output at `http://127.0.0.1:8000/products`

Like this, we can Create multiple endpoints in our website.

Static and Template 

```
project
├── env
├── static
│     └── gaurav.txt 
├── template
│      └── index.html
└── app.py
```

Static Directory: - any file in the static directory can be accessed using 
`http://127.0.0.1:8000/static/gaurav.txt`
So never store important file, which you don't want to show to public.

Template Directoy : It is use to store files like .html to render to your route. let render `index.htm` to route `('./')`

Change these snippets
```python
# add render_templat e
from flask import Flask, render_template
```
```py
# return render(template('index.html)')
@app.route('/')
def hellow_world():
    return render_template('index.html')
```

> Consider that your index.html have frontend part, a "To Do Manager"

# Database in Flask
To use database in Flask , we have to use SQL Alchemy

SQL alchemy is a "ORM Mapper", that provide facilities to change in database through python

[flask Alchemy documentation](https://flask-sqlalchemy.palletsprojects.com/en/3.1.x/)

install SQL alchemy
```sh
pip install flask-sqlalchemy
```
import sql alchemy
```python
from flask_sqlalchemy import SQLAlchemy
```
```python
# Update the app
app = Flask(__name__)
# configuration key
app.config['SQLALCHEMY_DATABASE_uri'] = "sqlite:///todo.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = "sqlite:///todo.db"
db = SQLAlchemy(app)

# Make a todo Class
class Todo(db.Model):
    sno = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    desc = db.Column(db.String(200), nullable=False)
    date_created = db.Column(db.DateTime,(200), nullable = False)

    # function
    def __rpr__(self) -> str: #  the -> str part is known as a type hint or type annotation. It indicates the return type of the function
        return f"{self.sno} - {self.title}"
```
note:- make sure to import datetime for this class.

Use python interpreter terminal, To create the database:
```python
import app import db
```
```python
db.create_all()
```
```python
exit()
```
```
project
├── __pycache__
├── env
├── static
│     └── gaurav.txt 
├── template
│      └── index.html
├── app.py
└── todo.db
```

Drag and drop the `todo.db` file to  Online [SQLite Viewer](https://inloop.github.io/sqlite-viewer/) to see your database

Create a Todo Instances for HomePage

```python
@app.route('/')
def hello_world():
    # this will input data in database
    todo = Todo(title="First Todo", desc="Start investing in Stock market")
    db.session.add(todo)
    db.session.commit()
    return render_template('index.html')
```
Create a Route to show data in Database

```python
@app.route('/show')
def products():
    allTodo = Todo.query.all()
    print(allTodo)
    return 'this is products page'
```
Output will be display at terminal, whenever you visit `http://127.0.0.1:8000/shows`


<hr>

# 53:00 / 1:47:13 ⚠️

# Also notes of Jinja Template engine