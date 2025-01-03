
A **higher-order method** in JavaScript is a function that either:

1. **Takes another function as an argument**, or
2. **Returns a function** as its result.

Higher-order methods are commonly used in functional programming and allow for operations like mapping, filtering, and reducing collections.

### Examples of Higher-Order Methods in JavaScript:

#### 1. **Array Methods (e.g., `map`, `filter`, `reduce`)**

- **`map`:** Takes a callback function and applies it to each element of the array.
    
    ```javascript
    const numbers = [1, 2, 3];
    const squares = numbers.map(num => num * num); // [1, 4, 9]
    ```
    
- **`filter`:** Takes a callback function and returns elements that satisfy the condition.
    
    ```javascript
    const numbers = [1, 2, 3, 4];
    const evens = numbers.filter(num => num % 2 === 0); // [2, 4]
    ```
    
- **`reduce`:** Takes a callback function and an accumulator to reduce the array to a single value.
    
    ```javascript
    const numbers = [1, 2, 3, 4];
    const sum = numbers.reduce((acc, num) => acc + num, 0); // 10
    ```
    

#### 2. **Custom Higher-Order Functions**

You can define your own higher-order function:

```javascript
function withLogging(func) {
  return function (...args) {
    console.log('Calling function with arguments:', args);
    return func(...args);
  };
}

const multiply = (a, b) => a * b;
const loggedMultiply = withLogging(multiply);

console.log(loggedMultiply(2, 3)); // Logs arguments and returns 6
```

### Key Benefits:

- Promotes cleaner and more modular code.
- Enhances reusability and abstraction.
- Simplifies working with data transformations and iterations.