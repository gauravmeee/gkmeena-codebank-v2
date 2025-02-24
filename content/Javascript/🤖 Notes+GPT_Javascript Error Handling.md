
# **Promises and Error Handling in JavaScript**

JavaScript uses **Promises** to handle asynchronous operations like fetching data from an API. There are two main ways to work with Promises:

1. **Using `.then` and `.catch`**
2. **Using `try...catch` with `async/await`**

---

## **1. `.then()` - Handling Promise Success**

The `.then()` method is used to handle the **successful result** of a Promise.

**Syntax:**
```javascript
promise.then(successCallback);
```
- `promise` is the Promise you are working with.
- `successCallback` is the function that runs when the Promise is **fulfilled**.

**Example:**
```javascript
fetch("https://jsonplaceholder.typicode.com/posts")
  .then(response => response.json())  // Convert response to JSON
  .then(data => console.log(data));   // Runs on successful fetch
```

**How it works?**
1. `fetch()` returns a Promise.
2. `.then(response => response.json())` waits for the response and converts it to JSON.
3. `.then(data => console.log(data))` runs after JSON conversion and logs the data.

---

## **2. `.catch()` - Handling Errors in Promises**

The `.catch()` method is used to handle **errors** (if the Promise fails).

**Syntax:**
```javascript
promise.catch(errorCallback);
```
- `errorCallback` is the function that runs if the Promise is **rejected**.

**Example:**
```javascript
fetch("https://jsonplaceholder.typicode.com/invalid-url")
  .then(response => response.json())
  .catch(error => console.error("Error:", error));  // Handles error
```

**How it works?**
- If the fetch request fails, `.catch(error => console.error(error))` runs.

---

## **3. `try...catch` - Handling Errors in `async/await`**

The `try...catch` block is used to handle errors in **synchronous** and **asynchronous** code.

**Syntax:**
```javascript
try {
  // Code that may throw an error
} catch (error) {
  // Handle the error
}
```

**Example with `async/await`:**
```javascript
async function fetchData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchData();
```

**How it works?**
1. The `try` block runs the API call.
2. If any error occurs, the `catch` block handles it.

---

## **4. When to Use `.then().catch()` vs. `try...catch`?**

| Feature        | `.then().catch()`                               | `try...catch` (with `async/await`)         |
| -------------- | ----------------------------------------------- | ------------------------------------------ |
| Readability    | Harder to read when chaining multiple `.then()` | Easier to read and write                   |
| Error Handling | Errors caught in `.catch()`                     | Errors handled inside `catch {}`           |
| Use Case       | Good for simple Promises                        | Better for `async/await` and complex logic |
- **Use `.then().catch()`** for simple promise chains.
- **Use `try...catch` with `async/await`** for better readability and error handling.


**Example Comparison:**

1. **Using `.then().catch()`**
```javascript
fetch("https://jsonplaceholder.typicode.com/posts")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));
```

2. **Using `async/await` with `try...catch`**
```javascript
async function fetchData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchData();
```

