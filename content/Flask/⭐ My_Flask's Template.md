
```
your_flask_app/
│
├── app.py
├── static/
│   └── style.css
│   └── script.js
│   └── images/
├── templates/
│   └── index.html
└── 
```


Import **style.css** from `/Static` Directory
```html
<!--Import Style from 'Static' Directory-->
 <head>
<link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">
</head>
```

Import **script.js** from `/Static` Directory
```html
<body>
<script src="{{ url_for('static', filename='js/script.js') }}"></script>
</body>
```

### `url_for`
`url_for` within JavaScript, which is not correct. The `url_for` function is a Flask Jinja function, and it can only be executed on the server side during rendering. JavaScript, however, runs on the client side and does not have access to Flask's `url_for` function.