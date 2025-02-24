
#### `req` & `res` objects

**`req`** (request) and **`res`** (response) are objects automatically provided by express when handling HTTP requests.

**`req` (Request Object)**:  Contains **details** about the incoming request.
        - `req.query` – Query parameters (`/user?id=1`)
        - `req.params` – Route parameters (`/user/:id`)
        - `req.body` – Request body (POST/PUT)
        - `req.headers` – HTTP headers
**`res` (Response Object)**: Used to **send data** back to the client.
        - `res.send()` – Send text/HTML/JSON
        - `res.json()` – Send JSON data
        - `res.sendFile()` – Send a file
        - `res.status()` – Set HTTP status code

---
#### Express Middleware

**Middleware** in Express is a **function** that has access to the **request (`req`)** and **response (`res`)** objects, and the **next function (`next`)** in the application’s request-response cycle.

- Middleware functions can modify the request, the response, or end the request-response cycle entirely.
- Middleware can be global or route-specific and allows you to add functionality to the request-response cycle (such as authentication, logging, error handling, static file serving).

**Middleware Functions**
- **Access to Request and Response** ->  Middleware functions can read or modify the request object, response object, or both.
- **Next Function** ->  Middleware can pass control to the next middleware function using the `next()` function.

**Order of Middleware**
- Middleware is executed in the order it is defined.
- If a middleware doesn't call `next()`, the request-response cycle is considered complete, and no further middleware will be executed.

**Types of Middleware**

1. **Application-Level Middleware**: Applies to all routes or specific routes.
```js
app.use((req, res, next) => {
  console.log('Request made!');
  next();  // Pass control to the next middleware
});
```
        
2. **Route-Level Middleware**: Bound to specific routes.    
```js
app.get('/about', (req, res, next) => {
  console.log('Accessing About Page');
  next(); // Pass control to the route handler
});
```
        
1. **Error-Handling Middleware**: This type of middleware is used to handle errors.    
```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
```
        
2. **Built-in Middleware**: Express has built-in middleware like -`express.json()`, `express.urlencoded()`, `express.static()`, `express.Router()`
```js
app.use(express.static('public'));  // Serve static files from the 'public' folder
```

3. **Third-Party Middleware**: Middleware from external packages (e.g., `morgan` for logging, `cors` for handling cross-origin requests).
---
#### Express Route Methods and Middleware


**`app.use()`** : Used to apply **middleware** functions that run on every request or specific routes.
```js
app.use([path], middleware); // path is optinal
```
- `path` is optional. specifies a path for the middleware. If omitted, it runs globally on all routes.
- It works with **all HTTP methods** (`GET`, `POST`, `PUT`, etc.) unless specified otherwise.
- Middleware can be chained together.

**`app.get()`** :  Defines a route handler for **GET requests** at a specified URL path.
```js
app.get(path, middleware, callback);
```
- `path`: The URL or route where the GET request is made.
- `middleware` is Optional middleware function(s) executed before the final handler.
- `callback`: The final function that handles the GET request.

**`app.post()`** : Defines a route handler for **POST requests** at a specified URL path.
```js
app.post(path, middleware, callback);
```
- usually used for handling form submissions, API calls with POST data.

**`app.put()`** : Defines a route handler for **PUT requests** at a specified URL path.
```js
app.put(path, middleware, callback);
```

**`app.delete()`** : Defines a route handler for **DELETE requests** at a specified URL path.
```js
app.delete(path, middleware, callback);
```

Note: Square brackets `[]` are used in documentation or examples to indicate optional parameters, but in this case, the middleware itself is **required** to be a function.

Conclusion:
- **`app.use()`** is used to define **global middleware** that works for all routes and HTTP methods.
- **`app.get()`** and other methods like `app.post()` are used to define **route-specific middleware** for a particular route (e.g., `/hello`).

---
#### Difference Between Middleware and Route Handler

```js
// Middleware
const midd = (req, res, next) => { ... };
```


```js
// Route Handler (sends the response)
app.get('/', myMiddleware, (req, res) => {...}
);
```
- **Paths** -> `'/'
- **Middleware** -> `const midd = (req, res,next) => {}`
	- `next()` Required to pass control to the next middleware.
- **Route Handler/Callback** -> `(req,res)=>{}`
	- `next()` Not needed (It ends the request-response cycle).

Note: In **Express.js**, the **route handler** is a **callback function** that processes a specific route.

---
#### Static(Public) vs Template Directory

**`static` / `public` folder**
- The `static` (or `public`) ->  used to serve static assets/files to the client
- which are files that do not change in response to user input and are sent directly from the server to the client.
- `Images`, `Stylesheets`, `JavaScript`, `Font`

**`template` folder**
- The `template` folder (or `templates` in Flask) -> used to store HTML template files that your web application renders. 
- These templates are often dynamically generated with server-side data.
- `HTML`

---

### `express()` vs `express`


`express()` : creates an instance of an Express application.
- it is a function call that  initialize an Express app  when you invoke `express()`, it returns an Express application object that can be used to define routes, middleware, and handle HTTP requests.
- **Function and Methods of Express Application Instance** -> `app.get()`, `app.post()`, `app.put()`, `app.delete()`, `app.use()`, `app.listen()`, `app.route()`, `app.set()`, `app.get()`, `app.all()`, `app.param()`
- example:
```js
const app = express(); // Creates an Express 

app.use(...) // Use instance of `express()`
```

`express` : express module
- It refers to the **Express module itself**, which is the imported package or function from the `express` library.
- **Function and Properties of Express Module** -> `express()`, `express.Router()`, `express.static()`, `express.json()`, `express.urlencoded()`, `express.raw()`, `express.text()`
- example:
```js
const express = require('express');  // Import the Express module

express.static() // use 'static()' middleware of express module
```
