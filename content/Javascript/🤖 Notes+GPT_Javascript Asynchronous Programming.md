
**What is Asynchronous Programming?**
- Asynchronous programming allows a program to execute **non-blocking** operations, meaning it **does not wait** for one task to finish before starting another.

**Why is it Important?**
- Improves **performance** by running tasks in parallel.
- Prevents **blocking** of the main thread (important for UI responsiveness in browsers).
- Allows **multiple tasks** (like API calls, file reading, timers) to run without stopping execution.


**1. Synchronous Code (Blocking)**
- Runs **line by line**.
- Each operation **waits** for the previous one to complete.
- Can **freeze** the program if a task takes too long.
- **Example:**
```javascript
console.log("Start");
for (let i = 0; i < 1e9; i++) {}  // Simulating a slow operation
console.log("End");

// If the loop takes **5 seconds**, the whole program is stuck for **5 seconds**.
```


**2. Asynchronous Code (Non-Blocking)**
- Runs tasks **in parallel** without stopping execution.
- Uses **callbacks, Promises, or async/await** to handle tasks.
- **Example Using `setTimeout`**
```javascript
console.log("Start");

setTimeout(() => {
  console.log("Inside setTimeout");
}, 2000);  // Executes after 2 seconds

console.log("End");
//  The `setTimeout()` function runs after the main execution finishes.
```
```
Start
End
Inside setTimeout (after 2 seconds)
```

---
#### Ways to Handle Asynchronous Code

**1. Callbacks (Old Method)** : A function is passed as an argument and runs after a task completes.
```javascript
function fetchData(callback) {
  setTimeout(() => {
    callback("Data received!");
  }, 2000);
}
// `Callback()` is passed as argument in `setTimeout()` and will run after `setTimeout()` complete, i.e. after 2000 ms
fetchData((message) => {
  console.log(message);
});
```
- **Problem:** Leads to "Callback Hell" (nested callbacks).

**2. Promises (`.then .catch`)** : A better way to handle async tasks.
```javascript
fetch("https://jsonplaceholder.typicode.com/posts")
  .then(response => response.json())
  .then(data => console.log("Data:", data))
  .catch(error => console.error("Error:", error));
```
- Solves callback hell by using `.then()` and `.catch()`.

**3. Async/Await (Best Method)** : Modern and more readable way to write async code.
```javascript
async function fetchData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    console.log("Data:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchData();
```
- Looks like synchronous code but runs asynchronously!

|Method|Description|Pros|Cons|
|---|---|---|---|
|**Callbacks**|Function inside another function|Simple for small tasks|Leads to "Callback Hell"|
|**Promises (`.then .catch`)**|Handles async tasks with `.then()`|Avoids nested callbacks|Can still get messy with many `.then()`|
|**Async/Await (`try...catch`)**|Modern way, looks like sync code|More readable, easy error handling|Works only with Promises|
- `Async` - Declares a function as **asynchronous**. Always returns a **Promise**.
- `Await` - Used inside an `async` function.  Pauses execution **until the Promise resolves/reject**.

- `Try` - Attempts to execute code
- `Catch` - Catches errors in `try` block

- `.then` - Used with **Promises**. Executes when a Promise **resolves successfully**.
- `.catch` - Captures **Promise errors**. Used after `.then()` or directly on a Promise.

---

### Difference Between Async/Await and Promises


**1. Promises with `.then()` and `.catch()`** (ES6+)
- **Advantages:**
	- **Chaining**: Promises are designed for chaining operations. You can perform a sequence of async operations with `.then()`, passing results down the chain, which can be useful for certain types of workflows.
	- **Concurrent Operations**: Promises are often better suited for running multiple asynchronous operations concurrently using methods like `Promise.all()` or `Promise.race()`.
	- **Backward Compatibility**: Promises were introduced in ES6 (2015), and thus they have been around longer and are supported in slightly older environments than `async/await`.
- **Disadvantages:**
	- **Readability**: While chaining `.then()` calls can be powerful, it can also lead to more complex and harder-to-read code, especially when dealing with error handling and branching logic.
	- **Error Handling**: Error handling can be less straightforward compared to `try/catch` in `async/await`. You need to ensure you’re properly catching errors at the right points in the chain.
- **Example:**
```javascript
export const create = (req, res) => {
  const userData = new User(req.body);

  if (!userData) {
    return res.status(404).json({ msg: "User data not found" });
  }

  userData.save()
    .then(saveData => {
      res.status(200).json(saveData);
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
}
```

**2. Async/Await** (ES2017)
- **Advantages:**
	- **Synchronous-Like Flow**: `async/await` makes asynchronous code appear more like synchronous code, which can make it easier to read and understand, especially in complex scenarios involving multiple asynchronous operations.
	- **Error Handling**: Handling errors is straightforward using `try/catch` blocks, which are familiar from synchronous code.
	- **Less Nesting**: Avoids the "Pyramid of Doom" (callback hell) by keeping code flat and linear, even when dealing with multiple asynchronous operations.
- **Disadvantages:**
	- **Requires Modern JavaScript**: `async/await` is a more modern feature, so it requires ES2017 or later. However, it's well-supported in all modern environments.
	- **Sequential Execution by Default**: Unless explicitly managed, `await` operations are executed sequentially. This can be inefficient if the operations could be performed concurrently.
- **Example:**
```javascript
export const create = async (req, res) => {
  try {
    const userData = new User(req.body);

    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }

    const saveData = await userData.save();
    res.status(200).json(saveData);

  } catch (error) {
    res.status(500).json({ error: error });
  }
}
```


**When to Use Which?**
- **Use `async/await`** when you want cleaner, more readable code, especially for complex workflows involving multiple asynchronous operations that depend on each other. It’s also great when you need to use traditional `try/catch` error handling.
- **Use Promises with `.then()` and `.catch()`** when you’re dealing with promise chaining, or if you need to perform multiple asynchronous operations concurrently. It can also be useful if you need broader support for older environments or if you prefer working with a more explicit asynchronous model.

