---
title: 📽️✔️ Tutorial_Express (Harry)
---



# [ Express JS Tutorial in Hindi 🔥✌](https://youtu.be/7H_QH9nipNs)


Express is a `Fast, unopinionated, minimalist` web framework for Node.js
it is a backend framework like Flask , Django


> Resources
- [Express Documentation](https://expressjs.com/en/starter/hello-world.html)
- You can learn How to build an HTTP Server in NodeJS from this Very Good Learning Page [NodeJS Learn](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)  and also check the [Node JS Documentation](https://nodejs.org/docs/latest/api/)
- [Handlebars official guide](https://handlebarsjs.com/guide/)
- [express-handlebars documentation](https://www.npmjs.com/package/express-handlebars)
 
---

### Setup Express

Open your `project` Directory in `Terminal` and initialize the project.
```shell
npm init
//npm init -y
```

A `package.json` will be Created.
Now Create `Index.js` , that would be entry point.

```
project
├── index.js
└── package.json
```

Install express
```shell
npm install express --save # `--save` is optional now
```

The `--save` flag in `npm install express --save` was used to add the installed package (`express` in this case) to the `dependencies` section of your `package.json` file. 

To install all the modules if `node_modules` folder got deleted, just use `npm i`
As of npm version 5 this flag is no longer necessary.

Uninstall express
```shell
npm uninstall express
```

---
### Why `Express` is important, Why we can't simply made `HTTP` server in `Nodejs` ??

### Open `index.js` and Start Coding:

 Build A Basic HTTP Server in NodeJS 
```js
// Importing the createServer function from the 'node:http' module
const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

// Creating the server instance using createServer function
const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

// createServer().listen()
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

Note:

`res` & `req`
- In a Node.js HTTP server, **`req`** and **`res`** are the two main objects passed to the callback function of the `createServer()` method. Here's what they represent:
- these are **passed automatically** by Node.js when a request is made to the server and not need to pass them explicitly in your code.
- **`req` (Request)** -> Represents the incoming request from the client to the server. (Contains information about the request, such as the `URL`, `HTTP method`, `headers`, `body data`, etc.)
- **`res` (Response)** -> Represents the outgoing response from the server to the client like you to set the response `status`, `headers`, and `body content` that will be sent back to the client.


In Express We Can Do the Similar thing ⭐
```javascript
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

---
### Import
`require`: in Node.js, require() is a built-in function used to import modules, JSON, and local files into your application
```js
const express = require('express')
```

`import`: this is alternative way to import. This Model is useful if you're working with modern Javascript and want to take advantage of ES Module features.
```js
import express from 'express'
```

*Note:* 
When using import, ensure all files that use ES Modules have the `"type":"module"` setting or use the `.mjs` extension.
 
---

## Express is used so that, We no more need to use `if else` for Creating different different endpoints. for example `\about`, `\contacts` ⭐

- **Route**: A pattern for matching URLs.
- **Endpoint**: A specific URL pattern combined with an HTTP method.
## Create Instance of React Express

```js
const app = express()
```
## Routes Handler

`localhost:3000` will show 'Hello World!' as Response at the Page
```javascript
app.get('/', (req, res) => {
  res.send('Hello World!')
})
```

`localhost:3000/about` will show 'Introduction' as Response at the Page
```js
app.get('/about', (req, res) => {
  res.send('Introduction')
})
```

`localhost:3000/contacts` will show 'List of Contacts' as Response at the Page
```js
app.get('/contacts', (req, res) => {
  res.send('List of Contacts')
})
```

*Note:* 
In Express, Inspect Network, You will see it will automatically send `Status Code` like `404`. Without Express, we have to write custom codes for `Status Codes` manually
Express is a Framework to save your time : )  ⭐

- Install `postman` App to Fetch, post HTTP Requests.
Alternatively you can install `Thunder Client` VS Code Extension if you don't want to switch into different application

- Install `nodemon` It will help the server to restart Automatically when you Save any changes

---
## Lets Start

Import Modules
```js
const express = require('express')
const path = require ('path')
const app = express()
const port = 3000
```
Send Response 
```js
// Route Handler
app.get('/', (req, res) => {
  res.send('Hello World!')
})
```
Render HTML
```js
// Route Handler
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html' ))
})
```
Custom Status Code
```js
// Route Handler
app.get('/contacts', (req, res) => {
  res.send('List of Contacts')
  res.status(500) // 500: internal error
})
```
Run Server
```js
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```


*Note:* 
- In JavaScript, the `${}` syntax is part of template literals (or template strings), which allow for easier and more readable string interpolation and multi-line strings.
- Template literals are enclosed by` backticks` (\`) instead of single or double quotes 

---
### More 

Send JSON
```js
app.get('/about', (req, res) => {
  res.json({"gaurav" : 169})
})
```
Note:- You can install chrome extension `JSON Formatter` if you want to see, the JSON sent in a formatted way. (Useful for big JSON files)

Use `html files` inside Public Folder
```
project
├── node_modules
├── index.js
└── public
       └── index.html
```

```js
const path = require('path')
// All other Imports

// Middleware
app.use(express.static(path.join(__dirname, "public")))
```
Note:- Now it will start Serving `Public` Folder as `Static` Folder
**`Express Middleware` are Functions that will keep Access of  Request and Response Objects, and can change it.** ⭐

---
### Middleware

Example to Create your own Middleware 
```js
// Create Middleware
const gauravMiddleware = (req, res) =>{
	console.log(req)
}
// use Middleware
app.use(gauravMiddleware)
```
 In general, there is not need to create Middleware, we only use them : )
 
*Note:*
- **Middleware** :- In Express.js, middleware refers to functions that have access to the request object (`req`), the response object (`res`), and the next middleware function in the application's request-response cycle.  ⭐
- These functions can perform various operations such as executing code, modifying the request and response objects, ending the request-response cycle, and calling the next middleware function in the stack.
- **`app.use()`** is used to define **global middleware** that works for all routes and HTTP methods.
- **`app.get()`** and other methods like `app.post()` are used to define **route-specific middleware** for a particular route (e.g., `/hello`).
- You can have multiple middleware functions for each route, and they will run in sequence before the final response is sent.

**Types of Middleware**:
1. **Application-Level Middleware**: Defined using `app.use()` or `app.METHOD()`.
2. **Router-Level Middleware**: Defined for specific routers.
3. **Built-in Middleware**: Middleware provided by Express, such as `express.json()` for parsing JSON request bodies.
4. **Third-Party Middleware**: Middleware from external packages (e.g., `morgan` for logging, `cors` for handling cross-origin requests).
5. **Error-Handling Middleware**: Special middleware used for catching and handling errors.

**Common Built in Middleware**
- **`express.json()`**: Parses incoming JSON data.
- **`express.urlencoded()`**: Parses URL-encoded data (from forms).
- **`express.static()`**: Serves static files like images, CSS, etc.
- **`express.Router()`**: Creates modular route handlers (optional

If we have more than one middleware, we use `next()` function, so that next middleware run after current running middleware ⭐
```js
// Create Middleware
const gauravMiddleware = (req, res, next) =>{
	console.log(req)
	next() // pass control to the next middleware function in the stack.
}
// use Middleware
app.use(gauravMiddleware)
```

---

## Parameters in Routes/Endpoints

```js
// name parameter
app.get('/hello/:name', (req, res) => {
	res.send('Hello World! ' + req.params.name)
})

// url -> localhost:3000/hello:Gaurav
// response -> Hello World! Gaurav
```

We can fetch blogposts from website, fetch key value pair from your database. You get this by sending the `Parameters`


static vs template vs public folder
The `static` / (`public`folder in some frameworks, like Express.js (Node.js) ) folder is used to serve static assets/files to the client, which are files that do not change in response to user input and are sent directly from the server to the client. These files can include: Images, Stylesheets, JavaScript, Font

The `template` folder (or `templates` in Flask) is used to store HTML template files that your web application renders. These templates are often dynamically generated with server-side data. For example:

---

### **`express.Router().get()`** vs  **`express().get()`**


**`express().get()`**
```javascript
const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
  res.send('Hello from App!');
});

app.listen(3000, () => console.log('Server is running on port 3000'));
```
- Access the route via `/hello`.
- Directly defines a route on the main Express application instance.
- Routes are globally accessible from the app.

`express.Router().get()`
```javascript
const express = require('express');
const app = express();
const router = express.Router(); // exoress()

// express.Router().get()
router.get('/hello', (req, res) => {
	res.send('Hello from Router!');
});

// Router use `app.use()`
app.use('/api', router); // Mounting router at '/api'

app.listen(3000, () => console.log('Server is running on port 3000'));
```
- Access the route via `/api/hello`.
- Used to create modular and reusable route handlers.
- Routes defined using `Router` are mounted on a specific path in the main app using `app.use()`

|Feature|`express().Router().get()`|`express().get()`|
|---|---|---|
|**Scope**|Local to the router instance.|Global to the app.|
|**Reusability**|Highly reusable in modular apps.|Not reusable; app-specific.|
|**Mounting Required**|Yes, using `app.use()`.|No, directly available.|
|**Preferred Use Case**|For modular route management.|For simple apps or global routes.|


---
## Express Production app Structure ( Example blog app)

### Create the Files
 `public` or `Static` Directory  Contains static files that are served directly to the client.
 `template` Directory 

```
project
├── node_modules
├── index.js
├── routes
│      └── blogRoute.js
├── static
|       
├── templates
|       └── index.html
|       └── blogHome.html   
|       └── blogPage.html 
└── data
         └── blogData.js 
```

`static Middleware`:- Used to serve static files from a specified director
ex:- `app.use(express.static('public'));` ⭐

`Template Rendering`:-Used to dynamically generate HTML pages on the server side using template engines.

---

*Create index.js*
```js
//index.js
const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, "static"))) // path.join()⭐ & __dirname

app.use('/', require(path.join(__dirname, `routes/blogRoute.js` )))

app.listen(port, () => {
  console.log(`Blog app listening at http://localhost:${port}`)
})
```

1. The `app.use(express.static(path.join(__dirname, "static")))` line in an Express.js application sets up middleware to serve static files from a directory. Here’s a breakdown of what each part does:

3. **`require(path.join(__dirname, 'routes/blogRoute.js'))`**: This loads the router module from the `routes/blogRoute.js` file. The `path.join(__dirname, 'routes/blogRoute.js')` constructs the absolute path to the `blogRoute.js` file. `__dirname` is a global variable representing the directory name of the current module. ⭐

4. **`path.join(__dirname, 'routes/blogRoute.js')`**: Joins the `__dirname` (current directory) with the `routes/blogRoute.js` path, ensuring the path is correctly constructed based on the operating system.

5. We will separate our other routes from `index.js` into separate routes files, because it will become complex to write multiple routes into single, index.js. let the routes be `routes/blog.js`

6. `'/'` is the base path where you want to mount your router,  `require('./routes/blogRoute.js')` is the router module that contains the routes and Together, they define that all routes inside `blogRoute.js` will be mounted at the root path (`'/'`). ⭐

*Note:* To ensure your CSS and JavaScript files are applied correctly to your `index.html`, configure Express to serve static files using `app.use('/static', express.static(path.join(__dirname, 'static')));`, and use absolute paths in your HTML, such as `<link rel="stylesheet" href="/static/style.css" />` and `<script src="/static/script.js"></script>`. This setup will correctly link your styles and scripts regardless of the file's location.

*Create Index.html*
```html
...
<body>
This is my Home Page
</body>
...
```

*Create blogRoute.js*
```javascript
// blogRoute.js
const express = require('express')

// router function
const router = express.Router()
// routes
router.get('/', (req, res)=>{
	res.sendFile(path.join(__dirname, 'templates/index.html' ))
})

// Export router
module.exports = router ⭐
```

*Note:*

- **`module`** -> It is an object that represents the current module in a Node.js application.
- `moudle` Contains properties like `exports`, which can be used to expose functions, objects, or values from the module.

***router.get() vs app.get()***⭐
- Global Scope: `app.get()` is used to define a route handler for a specific HTTP GET request at the application level. (`const app = express()`)
- Router Scope: `router.get()` is used to define routes on a router object. Routers allow you to modularize your route definitions, making the application structure cleaner and more manageable. (`const router = express.Router()`)

*Create blogData.js:*
```js
// blogData.js
{
	blogs:[
		{
			title: "How to get started with Python",
			content: "This is content",
			slug: "python-learn"
		},
		{
			title: "How to get started with JS",
			content: "This is content"
		},
			slug: "javascript-learn"
		{
			title: "How to get started with Django",
			content: "This is content"
		},
			slug: "python-django-learn"
	]
}

// export the file
module.exports blogs;
```

*Update blogRouter.js:*
```js
const express = require('express')
const router = express.Router()

// inport built in `path` module
const path = require('path')

// import blogData.js file
const blogs = rquire('../data/blogs')

router.get('/', (req, res)=>{
	res.sendFile(path.join(__dirname, `templates/index.html`))
})

// +++++++++++++++++++++++++++++++++++++++++++++++
router.get('/blog', (req, res)=>{
	// print each blog title in console
	blogs.forEach(elem =>{
		console.log(elem.title) ⭐
	});
	// route '/blog' to 'blogHome.html'
	 res.sendFile(path.join(__dirname, `templates/blogHome.html` ))
})
// ++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = router
```

Note:
- `elem => {}`  is an **arrow function** in JavaScript.
- when using an **arrow function** with a single parameter, parentheses around the parameter are **optional**. `(param)=>{...}` -> `param => {...}`
- For Each -> `array.forEach(callback(element, index, array), thisArg);` where, `index`, `array`, & `thisArg` are optional.

If there is a singl
*Create blogHome.html*

```html
<body>
This is my blog Homepage
</body>
```

Create blogPage
```html
<body>
Python Blog
</body>
```

Update blogRoute.js
```js
// blogRoute.js
const express = require('express')
const router = express.Router()
const path = require('path')
const blogs = require('../data/blogs')

router.get('/', (req, res)=>{
	res.sendFile(path.join(__dirname, `../templates/index.html` ))
})

router.get('/blog', (req, res)=>{
	blogs.forEach(elem =>{
		console.log(elem.title)
	});
	 res.sendFile(path.join(__dirname, `../templates/blogHome.html` ))
})

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Individual post routing through Parameter
router.get('/blogpost/:slug', (req, res)=>{
	// JS function to Filter the blogs array to find the blog with the matching slug
	myBlog = blogs.filter((elem)=>{
		return elem.slug == req.params.slug
	})
	 res.sendFile(path.join(__dirname, `../templates/blogPage.html` ))
});
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = router
```
There our basic routing is done, we can Create design and add contents etc.

Note:
- **`slug`**: A readable, unique identifier for a resource (e.g., blog post).
- **`req.params`**: An object containing route parameters, where `req.params.slug` is the value of the `slug` parameter in the URL.
- `elem.slug == req.params.slug`, in both `slug` refer to different things.`elem.slug` refers to the `slug` property of the `elem` object. `req.params.slug` refers to the dynamic route parameter captured by Express from the URL.

---
## We can also use mongoose to connect to the MongoDB Database : )

---
### Handlebars

`Handlebars.js` is a templating engine for Node.js that can be used with Express to render web pages from server-side data to the client side. Handlebars expressions are the basic unit of a Handlebars template, and are enclosed by double curly braces, `{{}}` ⭐. For example, the following template uses a variable, firstname, enclosed by double curly braces:
```handlebars
template: <p>{{firstname}} {{lastname}}</p>
```

*Note:* `Handlebar` is like `Jinja2` python template engine.
more template engines for express - `EJS`, `Pug`

**HBS**
`HBS (Express-HBS)`: A specialized package for using Handlebars within the Express framework, making integration with Express easier and more streamlined.

### Express-Handlebars

`Express-Handlebars**` A specialized wrapper for using Handlebars with Express.js, offering better integration and configuration options.

Install express-handlebar: ⭐
```sh
npm install express-handlebars
```

**Directory Structure:**

```
.
├── app.js
└── views
    ├── home.handlebars
    └── layouts
        └── main.handlebars

2 directories, 3 files
```

**app.js:**

Creates a super simple Express app which shows the basic way to register a Handlebars view engine using this package.

```js
import express from 'express';
import { engine } from 'express-handlebars'; // import express-handlebars ⭐

const app = express();


app.engine('handlebars', engine()); // Registers Handlebars as the template engine for Express.
app.set('view engine', 'handlebars'); // Sets Handlebars as the default view engine for rendering templates.
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000);
```
**`res.render('home')`**: This tells Express to render the `home` view template (in this case, a file named `home.handlebars`, or whatever your configured view engine is using).

**views/layouts/main.handlebars:**
The main layout is the HTML page wrapper which can be reused for the different views of the app. `{{{body}}}` ⭐ is used as a placeholder for where the main content should be rendered
```handlebars
...
<body>
	{{{body}}}
</body>
...
```

*Note:*
- **`{{body}}` vs. `{{{body}}}`**:
- `{{body}}`: This is the standard Handlebars syntax for outputting content. It escapes HTML by default, ensuring that any HTML or JavaScript injected into the body is rendered as plain text (to prevent XSS attacks).
- `{{{body}}}`: This is a special Handlebars syntax that **does not escape HTML**. It directly renders any HTML or JavaScript contained within the `body` content.

**views/home.handlebars:**
The content for the app's home view which will be rendered into the layout's `{{{body}}}`.
```handlebars
<h1>Example App: Home</h1>
```

*Note:* There will be a `main.handlebars` in `/views/layouts` directory, that will contain html syntax, and will be reused for different pages like `home.handlebars`, `blogs.handlebars` in `/view` directory.
Including common Content on `main.handlebars`, This prevent us from making, header, footer and other components copy paste for different pages.

---
# Now Continue our Express Application with Handlebars

*Update index.js*
```js
//index.js
const express = require('express')
// import handlebars
var exphbs = require('express-handlebars')

const path = require('path')
const app = express()
const port = 3000


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, "static")))
app.use('/', require(path.join(__dirname, `routes/blogRoute.js` )))

app.listen(port, () => {
  console.log(`Blog app listening at http://localhost:${port}`)
})
```

Update blogRoute.js
```js
// blogRoute.js
const express = require('express')
const router = express.Router()
const path = require('path')
const blogs = rquire('../data/blogs')

router.get('/', (req, res)=>{
	// handle bar syntax to render `home.handlebars`
	res.render('home');
})

router.get('/blog', (req, res)=>{
	// handle bar syntax to render `blogHome.handlebars`
	res.render('blogHome', {
	// <key used in the Handlebars template> : <variable from your Express application containing the data>
	blogs: blogs
	});
})


router.get('/blogpost/:slug', (req, res)=>{
	myBlog = blogs.filter((elem)=>{
		return elem.slug == req.params.slug
	})
	// +++++++++++++++++++++++
	res.render('blogPage', {
		title: myBlog[0].title,
		content: myBlog[0].content})
		// myBlog is array so used myBlog[0] to send only one blogPost.
	 //+++++++++++++++++++++
});

module.exports = router```

Create main.handlebars,
```handlebars
...
<body>
	</nav>
	...
	<a href="/blog"> Blog </a>
	...
	</nav>
	{{{body}}}
</body>
...
```
We added links to route to `/blog`

Create home.handlebars
```html
this is home.handlebars.
```


Create blogHome.handlebars
```handlebars
{{#each blogs}}
	<div class="blog">
		<a href="/blogpost/{{this.slug}}"></a>
		<h2> {{this.title}}</h2>
	</div>
	{{/each}}
```
- blogs is the data of the blogHome.handlebars
- this.title -> blog.title -> title of each blog (Displayed as Heading lists)
- this.slug -> blog.slug -> kind of identifier of each post ( use to make specific link for each post )

*Note:* the variables in .handlebars, like blog , this etc are javascript variable comes from the express app

*Note:* **Helpers** in Handlebars are custom functions that you can use within your templates to perform operations or transformations on data. They help keep templates clean by moving logic into reusable functions. (e.g., `{{#if}}`, `{{#each}}`).

Create blogPage.handlebars (Page for Each Posts)
```handlebars
<h2>{{title}}</h2>
<p>
	{{content}}
</p>
```

This was the Basic Structure of the blog post

Final blog App, File Directory Structures
```
project
├── index.js
├── routes
│      └── blogRoute.js
└── views
    ├── home.handlebars
    ├── bloghome.handlebars
    ├── blogPage.handlebars
    └── layouts
        └── main.handlebars
```
## Additionally , We can use mongoose to connect to the MongoDB Database : )

---

Remaining video is on hosting
# Host on DigitalOcean

**DigitalOcean** is a cloud computing service provider that offers scalable virtual servers known as **Droplets**. Droplets are customizable virtual private servers (VPS) used for hosting applications, websites, and databases. DigitalOcean provides a user-friendly platform with features like pre-configured server images, managed databases, and scalable resources.

### Hosting Express/Nodejs

1. **Create a Droplet**:
   - Sign up for DigitalOcean and create a Droplet with your desired specifications (e.g., OS, size).

2. **Set Up Your Server**:
   - SSH into your Droplet using the credentials provided.
   - Update the server and install Node.js and npm.
   - Transfer your Express app code to the server (e.g., using `scp`, Git, or FTP).

3. **Install Dependencies**:
   - Navigate to your app directory and run `npm install` to install dependencies.

4. **Run Your Express App**:
   - Start your app using `node app.js` or a process manager like PM2 (`pm2 start app.js`).

5. **Configure a Reverse Proxy** (optional but recommended):
   - Install and configure Nginx to act as a reverse proxy for better performance and security.

6. **Set Up a Domain and SSL** (optional):
   - Point your domain to your Droplet’s IP and set up SSL for secure connections (e.g., using Certbot).

### Benefits of Hosting on DigitalOcean

- **Scalability**: Easily resize resources or add more Droplets as your needs grow.
- **Cost-Effective**: Affordable pricing with predictable monthly costs.
- **Customizable**: Flexible configuration options for your server environment.
- **Performance**: High-performance SSD-based storage and data center options.
- **Support**: Extensive documentation and community support.

This setup allows you to deploy and manage your Express application on a reliable cloud platform.


---

# GPT

If you want to serve a React application instead of a static HTML file in your Express server, you would typically follow these steps:

### 1. **Set up React Application**:

You first need to create a React app. This can be done using `create-react-app` or another tool like `Vite`.

For example, with `create-react-app`:

```bash
npx create-react-app my-react-app
cd my-react-app
npm start
```

This will create a React app that runs on `http://localhost:3000`.

### 2. **Build React App for Production**:

After you have developed your React app, you need to **build** it for production. This will generate static files that you can serve using Express.

Run the following command from the React app directory:

```bash
npm run build
```

This will create a `build/` folder inside your React app directory, containing the static files (`index.html`, JavaScript, and CSS) necessary to run the app.

### 3. **Serve the React App with Express**:

Now, you need to set up your Express server to serve the static files from the `build/` directory generated in the previous step.

Here's an example of how to integrate React with your Express server:

#### Example `server.js` or `app.js` (Express server):

```js
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the React app build folder
app.use(express.static(path.join(__dirname, 'my-react-app/build')));

// Catch-all route to serve index.html from the React app for any unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'my-react-app/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
```

### How it works:

1. **Serving static files**: The `express.static()` middleware is used to serve static files (JavaScript, CSS, images, etc.) from the `build/` folder created by the React build process.
    
    ```js
    app.use(express.static(path.join(__dirname, 'my-react-app/build')));
    ```
    
    This will make the static assets (like `main.js`, `style.css`, etc.) accessible to the client.
    
2. **Catch-all route for React**: Since React uses client-side routing (with `react-router-dom`, for example), you need to serve the `index.html` file for all routes that are handled by React.
    
    ```js
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'my-react-app/build', 'index.html'));
    });
    ```
    
    This ensures that no matter what path the user navigates to (e.g., `/about`, `/contact`), the `index.html` file is served, and React will handle routing on the client side.
    

### 4. **Run the Express Server**:

After you've set this up, you can start your Express server:

```bash
node server.js
```

### Now, your Express server will:

- Serve the static React files (JavaScript, CSS) from the `build/` directory.
- Serve the `index.html` file for all routes, letting React take over client-side routing.

### Summary:

To serve a React application with Express:

1. **Create and build your React app** using `npm run build`.
2. **Use Express to serve static files** from the `build/` directory.
3. **Catch-all route** to serve `index.html` for client-side routing in React.