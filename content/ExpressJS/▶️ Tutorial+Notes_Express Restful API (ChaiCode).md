
# [Building REST API's using Node and Express.js](https://www.youtube.com/watch?v=uNCrMvkPUAE&ab_channel=PiyushGarg)

> Resources
-  [Mockaroo Fake Data API](https://www.mockaroo.com/)

In this guide, we'll cover the essentials of setting up a RESTful API using Express in Node.js. We will focus on best practices and understand how to handle JSON data. 

**Structure Your API :**

   A RESTful API typically includes the following endpoints:
   - `GET /api/users` - List all users.
   - `GET /api/users/:id` - Get a user by ID.
   - `POST /api/users` - Create a new user.
   - `PUT /api/users/:id` - Replace a user by ID (Create if doesn’t exist).
   - `PATCH /api/users/:id` - Update a user by ID.
   - `DELETE /api/users/:id` - Delete a user by ID.

```
C - Create - POST
R - Read - GET
U - Update - PUT, PATCH
D - Delete - DELETE
```

**Create Mock Data :**
   If you don’t have a database yet, use mock data:
   - Generate mock data from [mockaroo.com](https://mockaroo.com/) and Save the JSON (`.json`) file in your project directory.


**Project Setup:**

```sh
# Initialize the Project
npm init
```

```bash
# Install Express
npm install express
```

```sh
# Create a empty `index.js`
echo. > index.js
```

**Set Up Express:**

```javascript
// Set Up Express in `index.js`
const express = require('express');
const users = require('./data/users.json'); // Path to your JSON file

const app = express();
const port = 8000;

// Implementation here....

app.listen(port, () => console.log(`Server running at http://localhost:${port}`);
);
```

**Define API Endpoints**:

**READ:**
```js
// REST APIs - JSON

// List All Users
app.get('/api/users', (req, res) => { 
   return res.json(users);
});
```

#### Define API Endpoints

##### 1. CREATE (`POST`)
> by GPT ( because skipped by him for future video) :

*Note:* 
- Browsers by Default do `GET` Request, so `POST`, `PATCH` & `DELETE` Requests are problematic.
- So we Required a Third party app like `postman` for such requests.


```js
// Create a new user
app.post('/api/users', (req, res) => {
   const newUser = req.body; // Ensure you use body-parser middleware
   users.push(newUser);
   res.status(201).json(newUser);
});
```

##### 2. READ (`GET`)

*Note:* 
- Server is a hybrid Server, i.e. that support browsers (html) and also the mobile applications (api)

**Render Data in HTML Document:**

```js
// List All Users Names Render in HTML
app.get('/users', (req, res) => { 
   const html = `
   <ul>
	   ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
   </ul>
	`;
	res.send(html);
});

// Example -> // http://localhost:8000/users
```

**Return Data as API (JSON) :**

```javascript
// Get all users
app.get('/api/users', (req, res) => {
   return res.json(users); // return optional in oneline
});

// Example -> http://localhost:8000/api/users
```

```js
//Get user by ID
app.get('/api/users/:id', (req, res) => {
	// Convert string `id` to no. because we comare using `===`
	const id = Number(req.params.id) 
	const user = users.find((user) => user.id === id);
	return res.json(user); 
});

// Example -> http://localhost:8000/api/users/2
```
`:id` -> its mean it is a variable / Dynamic Value

##### 3. UPDATE (`POST`/`PUT`)
>by GPT ( because skipped by him for future video) :


```js
// Partial Update User by ID
app.patch('/users/:id', (req, res) => {
   let user = users.find(u => u.id === parseInt(req.params.id));
   if (user) {
       // Merge only provided fields in req.body into the user object
       Object.assign(user, req.body);
       res.json(user); // Return the updated user
   } else {
       res.status(404).send('User not found');
   }
});
// Example -> http://localhost:8000/api/users/3
```

```js
// Full Update User by ID
app.put('/users/:id', (req, res) => {
   let user = users.find(u => u.id === parseInt(req.params.id));
   if (user) {
       // Replace the entire user object with the new data from req.body
       user = { id: user.id, ...req.body }; // Ensures user ID remains unchanged
       res.json(user); // Return the updated user
   } else {
       res.status(404).send('User not found');
   }
});
// Example -> http://localhost:8000/api/users/1
```

##### 4. DELETE
>by GPT ( because skipped by him for future video) :

```js
// Delete User by ID
app.delete('/users/:id', (req, res) => {
   const index = users.findIndex(u => u.id === parseInt(req.params.id));
   if (index !== -1) {
	   users.splice(index, 1);
	   res.status(204).send();
   } else {
	   res.status(404).send('User not found');
   }
});
```

#### Shorthand way for RESTful API design

- The Same Route `api/users/` is used by `GET` and `POST` Request and Similarly `/api/users/:id`  by `PUT` `GET` & `DELETE`.
- Its redundant to write same thing and in case if we want to change the route for all, we have to do one by one for each.
- So there is a way to put different request on same route in one go

```js

//  `/api/user/` Route
app
.route('/api/users/')
.get((req,res)=>{...})
.post((req,res)=>{...})

//  `/api/user/:id` Route
app
.route('/api/users/:id')
.get((req,res)=>{...})
.patch((req,res)=>{...})
.delete((req,res)=>{...})
```


---
## RESTful API Notes

**Introduction to RESTful APIs**
- **Definition**: RESTful APIs (Representational State Transfer APIs) are a set of architectural principles used to design networked applications. They leverage HTTP requests to perform CRUD (Create, Read, Update, Delete) operations.
- **Key Concept**: REST is a set of constraints that ensures the scalability and flexibility of the API. It operates over HTTP and uses standard HTTP methods.

**Core Principles of REST:**
1. **Client-Server Architecture**:
   - The system is divided into client and server roles. The client (e.g., a web browser or mobile app) requests resources, while the server processes these requests and returns the appropriate response.
   - **Decoupling**: Clients and servers are independent of each other. The server is only concerned with processing requests and managing resources, while the client is only concerned with presenting data to the user.
2. **Statelessness**:
   - Each request from a client to the server must contain all the information needed to understand and process the request. The server does not store any state between requests.
   - This means each request is independent, and the server does not rely on any previous interactions to handle the current request.
3. **Cacheability**:
   - Responses from the server should be explicitly marked as cacheable or non-cacheable. This improves performance by reducing the need to repeatedly fetch the same data.
4. **Layered System**:
   - A REST API can be composed of multiple layers, with each layer having a specific function. The client interacts with an intermediary layer (like a load balancer) without needing to know the details of the other layers.
5. **Uniform Interface**:
   - REST APIs use a consistent and uniform way to interact with resources, typically through URIs (Uniform Resource Identifiers). This uniformity simplifies and decouples the architecture.
6. **Resource-Based**:
   - Resources are the key abstraction in REST. They are identified by URIs, and each resource can be accessed and manipulated using standard HTTP methods (GET, POST, PUT, DELETE).

**HTTP Methods and Their Usage**
1. **GET**: Retrieve a resource or a collection of resources.
   - Example: `GET /users` retrieves all users. `GET /users/1` retrieves the user with ID 1.
2. **POST**: Create a new resource.
   - Example: `POST /users` with a request body containing user details creates a new user.
3. **PUT**: Update an existing resource.
   - Example: `PUT /users/1` with a request body containing updated user details updates the user with ID 1.
4. **PATCH**: Partially update an existing resource.
   - Example: `PATCH /users/1` with a request body containing partial user updates updates only the specified fields of the user with ID 1.
5. **DELETE**: Remove a resource.
   - Example: `DELETE /users/1` deletes the user with ID 1.

**Design Considerations for RESTful APIs :**
1. **Stateless Communication**:
   - Ensure that each request contains all necessary information to process the request.
2. **Use of Standard HTTP Status Codes**:
   - Use appropriate HTTP status codes in responses to indicate the outcome of the request (e.g., `200 OK`, `404 Not Found`, `500 Internal Server Error`).
3. **Resource Identification**:
   - Use URIs to identify resources. Make sure URIs are clear and meaningful.
4. **Handling Different Formats**:
   - Return data in a format that is suitable for the client (e.g., JSON, XML). Avoid server-side rendering of HTML when possible to maintain flexibility.
5. **Versioning**:
   - Consider versioning your API to ensure backward compatibility (e.g., `/v1/users`, `/v2/users`).
6. **Security**:
   - Implement appropriate security measures like authentication and authorization to protect your API and its resources.

**Best Practices:**
- **Follow RESTful Constraints**: Adhere to the principles and constraints of REST to build scalable and maintainable APIs.
- **Respect HTTP Methods**: Use HTTP methods appropriately and consistently across the API.
- **Design for Flexibility**: Ensure that the API is designed to be flexible and can handle different client needs and scenarios.

---
