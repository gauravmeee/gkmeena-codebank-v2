---
title: Express API Server Project
description: This is a notes, to build specific express api server
author: Gkmeena (from GPT)
---


# Task 2

### Task: Build a Simple API Proxy Server
##### Requirements:
1. [x] Create a Node.js application using Express.js.
2. [x]  Implement a single endpoint that acts as a proxy to a public API of your choice (e.g., GitHub, Weather API). 
3. Add rate limiting:
	- [ ] a. Limit requests to 5 per minute per IP address.
	- [ ] b. Return a 429 status code when the limit is exceeded.
4. Implement basic caching:
	- [ ] a. Cache successful API responses for 5 minutes.
	- [ ] b. Serve cached responses when available. 

5. [ ] Add error handling for the external API calls.
6. [ ] Implement logging for each request, including timestamp, IP address, and rate limit status.

##### Bonus:
1. [x] Implement a simple authentication mechanism for the proxy endpoint.
2. [x] Make the rate limit and cache duration configurable via environment variables.


Here's a detailed explanation of each statement in the provided Express.js application, structured as markdown notes.

---

## Express.js Application with Rate Limiting, Caching, and Authentication

### 1. Importing Required Modules
```javascript
const express = require('express');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const NodeCache = require('node-cache');
const dotenv = require('dotenv');
const morgan = require('morgan');
```
- **express**: A web framework for Node.js to build web applications and APIs.
- **axios**: A promise-based HTTP client for making HTTP requests from Node.js.
- **rateLimit**: Middleware for limiting repeated requests to APIs or endpoints.
- **NodeCache**: An in-memory caching module for storing key-value pairs.
- **dotenv**: Loads environment variables from a `.env` file into `process.env`.
- **morgan**: A HTTP request logger middleware for logging requests made to the server.

### 2. Loading Environment Variables
```javascript
dotenv.config();
```
- Loads environment variables from a `.env` file into `process.env` to securely manage sensitive data like API keys, port numbers, and rate limits.

### 3. Setting Up Constants
```javascript
const app = express();
const PORT = process.env.PORT || 3000; // https://localhost:3000
const RATE_LIMIT = process.env.RATE_LIMIT || 5;  // no. of Requests = 5 Requests per  RATE_LIMIT_WINDOW
const RATE_LIMIT_WINDOW = process.env.RATE_LIMIT_WINDOW || 60000; // 1 minute = 60,000 milliseconds
const CACHE_DURATION = process.env.CACHE_DURATION || 300; // 5 minutes = 300 seconds
```
- **app**: The Express application object.
- **PORT**: The port on which the server will listen, defaulting to `3000` if not specified in the `.env` file.
- **RATE_LIMIT**: Maximum number of requests allowed per time window, defaulting to `5` requests.
- **RATE_LIMIT_WINDOW**: Time window for rate limiting, defaulting to `60,000` milliseconds (1 minute).
- **CACHE_DURATION**: Time-to-live (TTL) for cached responses, defaulting to `300` seconds (5 minutes).

### 4. Creating a Cache Instance
```javascript
const cache = new NodeCache({ stdTTL: CACHE_DURATION });
```
- **cache**: An instance of `NodeCache` with a standard time-to-live (TTL) set to `CACHE_DURATION`. This cache will store responses for a specified duration.

### 5. Configuring Rate Limiting Middleware
```javascript
const limiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW,
  max: RATE_LIMIT,
  message: 'Too many requests, please try again later.',
  statusCode: 429,
});
```
- **limiter**: A middleware configured to limit the number of requests a client can make within a specified time window (`RATE_LIMIT_WINDOW`).
  - **windowMs**: Time window in milliseconds during which the requests are counted.
  - **max**: Maximum number of requests allowed within the time window.
  - **message**: Message sent back when the rate limit is exceeded.
  - **statusCode**: HTTP status code sent when the rate limit is hit (default: `429 Too Many Requests`).

### 6. Logging Middleware
```javascript
app.use(morgan(':date[iso] :remote-addr :method :url :status :response-time ms - :res[content-length]'));
```
- **morgan**: Middleware for logging HTTP requests in a specific format.
  - **:date[iso]**: Logs the request date in ISO format.
  - **:remote-addr**: Logs the remote IP address of the client.
  - **:method**: Logs the HTTP method (GET, POST, etc.).
  - **:url**: Logs the request URL.
  - **:status**: Logs the HTTP status code of the response.
  - **:response-time ms**: Logs the time taken to handle the request in milliseconds.
  - **:res[content-length]**: Logs the content length of the response.

### 7. Applying Rate Limiting to All Requests
```javascript
app.use(limiter);
```
- This applies the `limiter` middleware globally to all routes, ensuring that rate limits are enforced across the entire application.

### 8. Simple Authentication Middleware
```javascript
const authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey === process.env.API_KEY) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
```
- **authenticate**: Middleware function that checks for an API key in the `x-api-key` header.
  - **apiKey**: Extracts the API key from the request headers.
  - **process.env.API_KEY**: The expected API key stored in the environment variables.
  - If the API key matches, the request proceeds (`next()`).
  - If not, the client receives a `401 Unauthorized` response.

### 9. Proxy Endpoint
```javascript
app.get('/api/proxy', authenticate, async (req, res) => {
  const targetUrl = 'https://api.github.com/users/gauravmeee'; // Example: GitHub API
```
- **/api/proxy**: Defines an API endpoint that proxies requests to an external API.
- **authenticate**: The endpoint is protected by the `authenticate` middleware, so only requests with a valid API key can access it.
- **targetUrl**: The external API URL to which the request will be proxied.

### 10. Checking Cache for Response
```javascript
const cachedResponse = cache.get(targetUrl);
if (cachedResponse) {
  return res.json(cachedResponse);
}
```
- **cachedResponse**: Checks if the response for the `targetUrl` is already in the cache.
- If a cached response exists, it's immediately returned to the client, saving an external API call.

### 11. Making the API Call
```javascript
const response = await axios.get(targetUrl);
```
- **axios.get(targetUrl)**: Makes a GET request to the `targetUrl` using Axios.

### 12. Caching the Response
```javascript
cache.set(targetUrl, response.data);
```
- **cache.set(targetUrl, response.data)**: Stores the API response in the cache with `targetUrl` as the key and the response data as the value.

### 13. Returning the API Response
```javascript
res.json(response.data);
```
- **res.json(response.data)**: Sends the API response back to the client in JSON format.

### 14. Handling API Errors
```javascript
} catch (error) {
  console.error('Error calling external API:', error.message);
  res.status(500).json({ error: 'Error calling external API' });
}
```
- **catch block**: Catches and logs any errors that occur during the API call.
- **console.error**: Logs the error message to the console.
- **res.status(500)**: Sends a `500 Internal Server Error` response if the external API call fails.

### 15. Starting the Server
```javascript
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```
- **app.listen(PORT, ...)**: Starts the Express server and listens for incoming requests on the specified port (`PORT`).
- **console.log**: Logs a message indicating that the server is running and on which port.

--- 

### What is Axios?

**Axios** is a popular, promise-based HTTP client for JavaScript that can be used in both the browser and in Node.js environments. It simplifies the process of making HTTP requests to interact with RESTful APIs or other web services.
#### Key Features of Axios:
1. **Promise-Based**: Axios is built on top of JavaScript Promises, allowing you to handle asynchronous operations in a more straightforward way, avoiding callback hell.
2. **Browser and Node.js Support**: It works in the browser and in Node.js, making it versatile for both front-end and back-end applications.
3. **Supports All HTTP Methods**: Axios supports all the common HTTP methods such as `GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `HEAD`, and `OPTIONS`.
4. **Automatic JSON Data Transformation**: When sending data, Axios automatically converts JavaScript objects to JSON. When receiving data, it automatically parses the JSON.
5. **Request and Response Interceptors**: Axios allows you to define interceptors, which can manipulate or transform the request before it is sent or the response before it is handled.
6. **Supports Timeout**: You can define a timeout for requests to ensure that the application doesn’t wait indefinitely for a response.
7. **Request Cancellation**: Axios provides the ability to cancel requests if they are no longer needed, helping to improve performance and avoid unnecessary processing.
8. **Automatic Transformation of Request and Response Data**: Data transformations can be customized, but by default, Axios automatically converts JSON data into JavaScript objects.
9. **Supports Upload Progress**: It can track the progress of uploads and downloads, making it easier to manage large files or datasets.
10. **Cross-Site Request Forgery (CSRF) Protection**: Axios provides an easy way to include CSRF tokens in requests.

---

### What is Morgan?

**Morgan** is a popular middleware for logging HTTP requests in Node.js applications. It is typically used in Express.js applications to keep track of requests made to the server, including details like the method, URL, status code, response time, and more.

#### Key Features of Morgan:
1. **HTTP Request Logging**: Morgan logs information about incoming HTTP requests, such as the request method (`GET`, `POST`, etc.), the requested URL, the response status code, and the response time.

2. **Customizable Log Formats**: Morgan allows you to choose from several predefined log formats (e.g., `combined`, `common`, `dev`, `short`, `tiny`), or you can create your own custom format.

3. **Support for Log Output to Files or Streams**: Morgan can log directly to the console or output logs to a file or any writable stream, making it flexible for various logging needs.

4. **Color-Coded Logs**: In certain formats (like `dev`), Morgan outputs logs with color codes that make it easier to differentiate between request methods and status codes.

5. **Integrates Easily with Express**: Morgan is designed to work seamlessly with Express.js, requiring minimal setup to start logging requests.

#### Common Morgan Log Formats:
- **`combined`**: Standard Apache combined log output, includes information like remote IP, request method, URL, HTTP version, response status, user-agent, and more.
- **`common`**: Standard Apache common log output, a more concise version of `combined`.
- **`dev`**: Concise output colored by response status for development use. The format shows the method, URL, status, response time, and content length.
- **`short`**: Shorter than common, includes essential information like method, URL, status, and response time.
- **`tiny`**: Minimalist logging format, showing just the method, URL, status, and content length.

---
### Notes on `authenticate` Middleware Function

#### Purpose:
The `authenticate` function is an Express.js middleware used for API key-based authentication. It ensures that only requests with a valid API key are granted access to protected routes.

#### Code Breakdown:

1. **Function Definition**:
   ```javascript
   const authenticate = (req, res, next) => {
   ```
   - Defines an Express middleware function named `authenticate`.
   - Middleware functions have access to the request (`req`), response (`res`), and the `next` function.

2. **Extract API Key**:
   ```javascript
   const apiKey = req.headers['x-api-key'];
   ```
   - Retrieves the value of the `x-api-key` header from the incoming request.
   - `req.headers` is an object containing request headers.
   - `req.headers['x-api-key']` accesses the specific API key header.

3. **API Key Validation**:
   ```javascript
   if (apiKey === process.env.API_KEY) {
   ```
   - Checks if the provided `apiKey` matches the expected value stored in `process.env.API_KEY`.
   - `process.env.API_KEY` refers to the API key set in environment variables.

4. **Successful Authentication**:
   ```javascript
   next();
   ```
   - If the API key is valid, `next()` is called to pass control to the next middleware or route handler.
   - This allows the request to proceed.

5. **Failed Authentication**:
   ```javascript
   res.status(401).json({ error: 'Unauthorized' });
   ```
   - If the API key is invalid, the function sends a `401 Unauthorized` response.
   - The response body contains a JSON object with an `error` property set to `'Unauthorized'`.

#### Example Usage:

To protect a route with API key authentication:
```javascript
app.get('/api/protected-data', authenticate, (req, res) => {
  res.json({ data: 'This is protected data' });
});
```
- The `/api/protected-data` route is protected by the `authenticate` middleware.
- Clients must include a valid `x-api-key` header to access this route.

#### Summary:
- **Function**: Validates the API key from request headers.
- **Success**: Calls `next()` to continue processing the request.
- **Failure**: Responds with `401 Unauthorized` and an error message if the API key is invalid.

#### Benefits:
- **Security**: Ensures only requests with a valid API key can access protected routes.
- **Simplicity**: Provides a straightforward way to implement basic authentication.

This middleware function is particularly useful for APIs where you need to restrict access to certain endpoints based on API keys, either for internal services or for third-party access.

---
### Notes on Express Middleware Configuration

#### 1. Logging Middleware with Morgan

```javascript
// Logging middleware
app.use(morgan(':date[iso] :remote-addr :method :url :status :response-time ms - :res[content-length]'));
```

**Purpose**: This line configures Morgan to log HTTP requests and responses in a specified format.

**Details**:

- **`app.use()`**: Adds middleware to the Express application. Middleware functions are executed in the order they are added.
  
- **`morgan()`**: The middleware function provided by the Morgan logging library.
  
- **Format String**: `':date[iso] :remote-addr :method :url :status :response-time ms - :res[content-length]'`
  - **`:date[iso]`**: Logs the date and time of the request in ISO format.
  - **`:remote-addr`**: Logs the IP address of the client making the request.
  - **`:method`**: Logs the HTTP method used (e.g., `GET`, `POST`).
  - **`:url`**: Logs the requested URL path.
  - **`:status`**: Logs the HTTP status code of the response.
  - **`:response-time ms`**: Logs the time taken to handle the request, in milliseconds.
  - **`:res[content-length]`**: Logs the size of the response body in bytes.

**Example Log Output**:
```
2024-09-13T12:34:56.789Z 192.168.1.1 GET /api/data 200 123 ms - 456
```
- Shows when the request was made, the client's IP address, the method, URL, status code, response time, and content length.

**Benefits**:
- **Debugging**: Helps track request and response details for troubleshooting.
- **Monitoring**: Provides insights into traffic patterns and response times.
- **Logging**: Keeps a record of all HTTP requests and responses.

#### 2. Apply Rate Limiting

```javascript
// Apply rate limiting to all requests
app.use(limiter);
```

**Purpose**: This line applies the rate limiting middleware to all incoming requests to the Express application.

**Details**:

- **`app.use()`**: Applies middleware to the Express app.
  
- **`limiter`**: The rate limiting middleware created using `express-rate-limit`. This middleware controls the number of requests a client can make to the server in a specified time window.

**Function of Rate Limiting Middleware**:
- **Prevents Abuse**: Limits the number of requests from a single IP address to prevent abuse or accidental overload.
- **Protects Resources**: Helps maintain server performance and availability by avoiding too many requests in a short period.

**Example Usage**:
- If configured to allow a maximum of 5 requests per minute per IP, any IP that exceeds this limit will receive a `429 Too Many Requests` response.

**Benefits**:
- **Server Protection**: Guards against DDoS attacks and excessive load from individual clients.
- **Fair Use**: Ensures fair usage of server resources among all clients.
- **Performance**: Helps maintain consistent server performance by limiting the rate of requests.

### Summary

- **Logging Middleware (`morgan`)**:
  - Logs detailed request and response information.
  - Useful for debugging, monitoring, and logging purposes.

- **Rate Limiting Middleware (`limiter`)**:
  - Controls the rate of incoming requests.
  - Prevents abuse, protects server performance, and ensures fair usage.