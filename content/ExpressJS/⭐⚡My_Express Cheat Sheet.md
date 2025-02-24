
#### Setup Express

**1. Initialize NodeJS Project**
```shell
npm init # Interactive project setup.
npm init -y # Quick setup with defaults.
```

**2. Install express**
```shell
npm install express --save # `--save` is optional now
```
- `--save` flag was used to add packages to the `dependencies` section of `package.json`. but since `npm v5`(2015) it is default behavior

**3. Create `Index.js`  (entry point)**
```
project
├── index.js
└── package.json
```

---
#### Build A Basic HTTP Server

**1. Importing the Express framework**
```javascript
const express = require('express') // CommanJS
//or
import express from 'express' // ES Module
```

**2. Creating an Express application instance** - `express()`
```js
const app = express()
```


**3. Handling GET requests** to the root URL ('/') - `express().get()`
```js
app.get('/', (req, res) => { 
  res.send('Hello!') // Send "Hello!" as the response
})
```


**4. Starting the server** and listening on the specified port - `express().listen()`
```js
app.listen(3000, () => {
  console.log(`app listening on port 3000`) // Logging a message when the server starts
})
```

- **`express()`** – It is a function that returns an instance of an Express application.
- **`res.send()`** - Small responses (text, JSON, HTML).
- **`.get(route, func)`** – Defines a GET request handler where `func` is a callback that typically sends a response.
- **`.listen(port, func)`** – Starts the server on the specified port, where `func` is usually a callback to log a message.
- **`module`** -> It is an object that represents the current module in a Node.js application.

---
#### Listen on dynamic `Port`

```js
const port = 3000
```

```js
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})
```
- `${}` syntax is part of template literals `(``)` and used for more readable string interpolation and multi-line strings.

---

#### Set Custom Status Code for a Route

```js
app.get('/contacts', (req, res) => {
  res.status(500); // Set status code to 500 (Internal Server Error)
  res.send('List of Contacts'); // Send response body
})
```
or 
```js
app.get('/contacts', (req, res) => {
  res.status(500).send('List of Contacts'); // More Concise way
})
```
- Second Code is Preferred for readability as the status code is set and the response body is sent in one **chained method call**. 

---
#### Sending  JSON as Response

```js
app.get('/about', (req, res) => {
  res.json({"gaurav" : 169})
})
```
- - `res.json()` – Send JSON data

---
#### Sending HTML as Response

```js
const path = require ('path')
```

```js
// Route Handler
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html' ))
})
```

- **`res.sendFile()`** - Send Static files (HTML, PDFs, images) as the response
- **`path.join()`** – Joins directory and file path.
- **`__dirname`** – Represents the **current directory** of the script.
- Make sure **`index.html`** exists in the same directory as the script.

---

#### Serving Static Files with Express Middleware

```js
const path = require('path');
```

```js
// Middleware `express.static()`
app.use(express.static(path.join(__dirname, "public")));
```
- **`express.static(path)`**: This middleware serves static files from the directory specified (`public` folder in this case).
- **`app.use()`**: This method uses the middleware to serve static files whenever a request is made.
- **Middleware** :- In Express.js, middleware refers to functions that have access to the request object (`req`), the response object (`res`), and the `next()` middleware function in the application's request-response cycle.
---
#### Create your own Middleware 

```js
// Middleware Function
const logRequest = (req, res, next) => {
	console.log(`Request URL: ${req.url}`);
	next(); 
};
```

```js
// Use Middleware
app.use(logRequest)
```
 - In general, there is not need to create Middleware, we only use them : )

---
#### Parameters in Routes/Endpoints

```js
// name parameter
app.get('/hello/:name', (req, res) => {
	res.send('Hello World! ' + req.params.name)
})
```
-  if url is '`localhost:3000/hello:Gaurav`' then response will be '`Hello World! Gaurav`'

---
#### **`express.Router().get()`** vs  **`express().get()

**`express().get()`**
```js
app.get('/hello', (req, res) => {
  res.send('Hello from App!');
});
```
- Access the route via `/hello`.
- Directly defines a route on the main Express application instance.
- Routes are globally accessible from the app.

**`express.Router().get()`**
```js
const router = express.Router(); 
```

```js
router.get('/hello', (req, res) => {
	res.send('Hello from Router!');
});

app.use('/app', router); // Mounting router at '/api'
```
- Access the route via `/api/hello`.
- Used to create modular and reusable route handlers.
- Routes defined using `Router` are mounted on a specific path in the main app using `app.use()`

---
#### Express Production App Structure

```sh
project
├── index.js # Main Entry Point of Express App
├── routes
│      └── route.js
├── static # Static Files
|       └── Script.js
|       └── Style.css
|       
└── templates # HTML Templates
        └── index.html
```

---
#### Creating an Express blog app

**Create `index.js`**
```
project
	└──  index.js
```

```js
// Index.js
const express = require('express')
const path = require('path')
const app = express()
const port = 3000

// Use Static File
app.use(express.static(path.join(__dirname, "static"))) 

// Use Route '/'
app.use('/', require(path.join(__dirname, `routes/blogRoute.js` )))

// Listen
app.listen(port, () => {
  console.log(`Blog app listening at http://localhost:${port}`)
})
```

**Create `index.html`, `blogHome.html` & `blogPage.html`**
```
project
	└──  templates
		└── index.html
		└── blogHome.html
		└── blogPage.html
```

```html
<head>
	...
</head>
<body>
	...
</body>
```


**Create `blogData.js`**
```
project
	└──  data
		└──  blogData.js
```

```js
// blogData.js
{
	blogs:[
		{
			title: "get start Python",
			content: "This is content",
			slug: "learn-python-beginner"
		},
		...
	]
}

// export blog data
module.exports blogs;
```

**Create `blogRoute.js`** ⭐
```
project
	└──  routes
		└──  blogRoute.js
```

```javascript
const express = require('express')
const router = express.Router()  // create `Router` instance
const path = require('path') // inport built in `path` module
const blogs = require('../data/blogs') // // import blogData.js file
```
Route for Application Homepage `index.html`
```js
// define '/' route on the `router` object
router.get('/', (req, res)=>{
	res.sendFile(path.join(__dirname, 'templates/index.html' ))
})
```
Route for Blog's Home page `blogHome.html`
```js
// define '/blog' route on the `router` object
router.get('/blog', (req, res)=>{
	// Print each blog title
	blogs.forEach(elem =>{
		console.log(elem.title) 
	}); 
	// send `blogHome.html`
	 res.sendFile(path.join(__dirname, `templates/blogHome.html` )) 
})
```
Route for Each Blog Post `blogPage.html`
```js
// Individual post routing through Parameter
router.get('/blogpost/:slug', (req, res)=>{
	// JS function to Filter the blogs array to find the blog with the matching slug
	myBlog = blogs.filter((elem)=>{
		return elem.slug == req.params.slug
	})
	 res.sendFile(path.join(__dirname, `../templates/blogPage.html` ))
});
```

```js
// Export router
module.exports = router ⭐
```

---
#### Template Engines for Express
- Handlebar, EJS, Pug, HBS
---
#### Handlebars

`Handlebars.js` -> templating engine for Node.js that can be used with Express to render web pages from server-side data to the client side.

 Handlebars expressions are the basic unit of a Handlebars template, and are enclosed by double curly braces, `{{}}`

```handlebars
template: <p>{{firstname}} {{lastname}}</p>
```

---
#### Express-HBS

`HBS (Express-HBS)`: A specialized package for using Handlebars within the Express framework, making integration with Express easier and more streamlined.

---
#### Express-Handlebars

`Express-Handlebars**` -> A specialized wrapper for using Handlebars with Express.js, offering better integration and configuration options.

Install express-handlebar: ⭐
```sh
npm install express-handlebars
```

Directory Structure:
```sh
Project
├── app.js   # or server.js
└── views
    ├── home.handlebars
    ├── blogHome.handlebars
    ├── blogPage.handlebars
    └── layouts
        └── main.handlebars
```

**HTML to Handlebar**
- `templates/` -> `views/`
- `index.html` -> `home.handlebars`
- `blogHome.html` -> `blogHome.handlebars`
- `blogPage.html` -> `blogPage.handlebars`

- + **`main.handlebars`** – Acts as the **layout template** (common structure like header, footer, etc.). that would render `.handlebars` files from `view` directory to its `{{body}}`

#### Setup handlebar

**Modify `app.js`**
```js
// Import express-handlebars
import { engine } from 'express-handlebars'; // 
```

```js
// Registers Handlebars as the template engine
app.engine('handlebars', engine());
```

```js
// Registers Handlebars as the template engine for Express.
app.engine('handlebars', engine());
```

```js
// Sets Handlebars as the default view engine for rendering templates.
app.set('view engine', 'handlebars'); 
```

```js
// Specify the directory where the Handlebars views/templates are located.
app.set('views', './views');
```

Update `get('/')`
```js
// Render the 'home' template from the views directory at  `/` route
app.get('/', (req, res) => {
    res.render('home');
});
```
Update `get('/blog')`
```js
// handle bar syntax to render `blogHome.handlebars`
router.get('/blog', (req, res)=>{
	res.render('blogHome', {
	blogs: blogs
	});
})
```
Update `get('/blogpost/:slug')`
```js
// handle bar syntax to render `blogPage.handlebars`
router.get('/blogpost/:slug', (req, res)=>{
	myBlog = blogs.filter((elem)=>{
		return elem.slug == req.params.slug
	})
	res.render('blogPage', {
		title: myBlog[0].title,
		content: myBlog[0].content})
});
```

**Create `main.handlebars:`**
```handlebars
...
<body>
	</nav>
		<a href="/"> Home </a>
		<a href="/blog"> Blog </a>
	</nav>
	{{{body}}}
</body>
...
```

- The **main layout** (`main.handlebars`) is the HTML page wrapper which can be reused for the different views of the app. 
- `{{{body}}}` ⭐ is used as a placeholder for where the main content should be rendered

**`home.handlebars`**
```handlebars
<h1>Welcome to Home </h1>
```
- The content for the app's home view which will be rendered into the layout's `{{{body}}}`.

**Create `blogHome.handlebars`**
```handlebars
{{#each blogs}}
	<div class="blog">
		<a href="/blogpost/{{this.slug}}"></a>
		<h2> {{this.title}}</h2>
	</div>
	{{/each}}
```

- **Helpers** in Handlebars are custom functions that you can use within your templates to perform operations or transformations on data. They help keep templates clean by moving logic into reusable functions. (e.g., `{{#if}}`, `{{#each}}`).

**Create `blogPage.handlebars` (Page for Each Posts)**
```handlebars
<h2>{{title}}</h2>
<p>
	{{content}}
</p>
```

Note:
- `{{body}}` -> Escapes HTML by default, ensuring that any HTML or JavaScript injected into the body is rendered as plain text (to prevent XSS attacks).
- `{{{body}}}` -> It directly renders any HTML or JavaScript contained within the `body` content.
---
✅ Done
