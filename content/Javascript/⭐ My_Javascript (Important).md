

# Different types of Functions in Java Script

### Types of Functions in JavaScript:

- **Function Declaration**:
```javascript
function funcName() ... 
function funName() {...}

// Hoisted , Named Function,   Uses `function` keyword
```


- **Anonymous Function Expression**:
```
function() {...} -> ❌ Not valid unless assigned to a variable
```

```js
const funVar = function() ... ✅
const funVar = function() { ...};✅

// Not Hoisted,  Anonymous Function, Assigned to a variable
```


- **Named Function Expression**
```javascript
const funVar = function funcName() ...
const funVar = function funcName() { ...};

// Not Hoisted,  Named Function(Only accessible inside function scope
```


- **Arrow Function**
```javascript
// Anonymous Arrow Function
() => ...
() => {...} 
// , Lexical `this` Binding
```

```javascript
// Assigned Arrow Function
const greet = () =>  ...
const greet = () => { ...} 
// Not Hoisted, Lexical `this` Binding
```

Note: **arrow functions**, the `return` keyword is **not needed** if the function consists of a **single expression** without curly braces `{}`. The result is **automatically returned**.
```js
const add = (a, b) => a + b; console.log(add(2, 3));
```

**Key Notes**
- **Hoisted :** you can use functions or variables before they are declared in your code, without causing an error.
- **Anonymous Function Expressions**: Have no name, so they rely on the variable they're assigned to.
- **Named Function Expressions**: Have a name, but it's only accessible within the function body itself.
-  `this` Binding in Arrow Function. Unlike traditional functions where `this` refers to the object that called the function, Arrow functions not have their own `this` context. Instead, and `this` inside an arrow function refers to the `this` value of the enclosing lexical context (i.e., the scope in which the arrow function was defined).

---

### Function Execution Behavior in JavaScript

**Functions Runs Immediately**

| **Type**                                           | **Code**                  | **Behavior**                                                                  |
| -------------------------------------------------- | ------------------------- | ----------------------------------------------------------------------------- |
| **Direct Function Call**                           | `handleClick();`          | **Runs immediately when encountered** : Executes instantly when script runs   |
| **Function Call in JSX/Event Listeners**           | `onClick={handleClick()}` | **Executes immediately if `()` used** : Executes as soon as component renders |
| **Immediately Invoked Function Expression (IIFE)** | `(function() {...})();`   | **Self-executing function** : Executes as soon as it's defined                |

**Functions Run Later (On an event)**

| **Type**                                           | **Code**                              | **Behavior**                                                                                  |
| -------------------------------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------- |
| **Function Reference (Event Handlers & JSX)**      | `onClick={handleClick}`               | **Executed later (on event)** : Passed as reference, executes on event                        |
| **Function with Arguments in JSX/Event Listeners** | `onClick={() => handleClick("John")}` | **Wrapped inside an arrow function to delay execution** : Function executed only when clicked |

**Note:**
- **IIFE (`(function() {...})();`)**  i.e. wrapping function in `()` runs immediately without an explicit call.**  
- **Use `funcName()` when you need immediate execution.**  
- **Use `funcName` (without `()`) when passing as a reference for later execution.**  
- **Use `() => funcName(arg)` when you need to pass arguments but execute later.**  
- **React JSX follows JavaScript function execution rules.**

---
### Call back Functions


**Callback Function?** -> A **callback function** is a function passed as an argument to another function and executed later, usually after an operation completes or an event occurs.


```javascript
function greet(name, callback) {
  console.log(`Hello, ${name}!`);
  callback(); // Call the callback function
}
```

**Asynchronous Callback (setTimeout Example)**
```javascript
function fetchData(callback) {
  setTimeout(() => {
    const data = "Data fetched successfully";
    callback(data);
  }, 2000); // Simulates an API call delay
}
// `processData` is executed **after** `fetchData` completes.
```

**Event Listener Callback**
```javascript
document.getElementById("myButton").addEventListener("click", function() {
  alert("Button clicked!");
});
// The **anonymous function** is executed **when the event occurs**.
```


**Key Takeaways**
- **Callbacks allow functions to run after another function completes.**  
- **Used heavily in event handling & asynchronous operations.**  
- **Synchronous callbacks run immediately, while asynchronous ones wait for execution.**  
- **Avoid callback hell by using Promises or async/await.**  

---