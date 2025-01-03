---
slug : react-libraries-key-use
---

Simply importing React into your JavaScript file **does not automatically make your code React**. You need to explicitly use React's features, such as components, hooks, or JSX, to turn your code into React-based code.

### Explanation:

1. **Importing React**: Importing React (or `import React from 'react';`) gives you access to React's library, but it doesn't change your code unless you use specific React features like JSX or React components.
    
    ```javascript
    import React from 'react'; // This just imports the library.
    console.log("This is regular JavaScript!"); // This is NOT React code.
    ```
    
2. **Using React's Features**: To turn your code into React, you need to use React-specific features like:
    
    - **JSX (JavaScript XML)**: JSX allows you to write HTML-like syntax in your JavaScript, which is transformed into React elements.
        
        ```javascript
        import React from 'react';
        
        const App = () => {
          return <h1>Hello, React!</h1>; // JSX makes this a React component.
        };
        
        export default App;
        ```
        
    - **React Components**: You create React components (functional or class-based) to define reusable UI pieces.
        
        ```javascript
        import React from 'react';
        
        const Button = () => <button>Click Me!</button>; // React component
        export default Button;
        ```
        
    - **React Hooks**: Hooks like `useState` and `useEffect` allow you to manage state and lifecycle in functional components.
        
        ```javascript
        import React, { useState } from 'react';
        
        const Counter = () => {
          const [count, setCount] = useState(0); // React-specific state management
          return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
        };
        
        export default Counter;
        ```
        
3. **No React Features**: If you don't use JSX, components, or hooks, then your code will just behave like plain JavaScript.
    

---

### When is `import React from 'react'` Needed?

- If you're **using JSX**, React must be imported because JSX is converted into `React.createElement` calls under the hood. However, as of React 17+, you no longer need to explicitly import React for JSX, thanks to the new JSX runtime.
    
    ```javascript
    const element = <h1>Hello, React!</h1>; 
    // Translates to React.createElement('h1', null, 'Hello, React!')
    ```
    
- If you're **not using JSX** and directly writing `React.createElement`, then importing React is essential.
    
    ```javascript
    import React from 'react';
    
    const element = React.createElement('h1', null, 'Hello, React!');
    console.log(element); // React object
    ```
    
