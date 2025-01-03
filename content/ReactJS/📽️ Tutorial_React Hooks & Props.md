---
slug : react-hooks-props-tutorial-notes
---

# Props

---

# Use State Hook

## [Hooks & State in React | Sigma Web Development Course - Tutorial #107 (Harry)]()
## [React useState Hook - React Hooks Explained (Piyush Garg)](https://youtu.be/3i840mtbDNI)

---

# Use Effect Hook
## [The useEffect Hook in React | Sigma Web Development Course - Tutorial #108(Harry)](https://www.youtube.com/watch?v=bio2eP5YXyw&ab_channel=CodeWithHarry)

In React, **`useEffect`** is a Hook that lets you perform side effects in functional components. It is similar to lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` in class components.
**Purpose**: To handle side effects like fetching data, subscribing to events, manipulating DOM, or running timers.

`useEffect` is a React Hook Run whenever a Component is mounted or updated.

**Basic Syntax :**
```js
// App.js
useEffect(()=>){
	// Effect logic here
},[])
```

**Run whenever the component (`App.js`) is rendered or reloaded :**
```jsx
// App.jsx
import {useEffect} from 'react'

useEffect(()=>){
	alert("Hello, This is the first render of App.jsx") // alert everytime component load/reload
},[])
```

**Run whenever a particular state (`count`) is changed, rendered or reloaded :**
```jsx
// App.js
import { useEffect, useState } from 'react';

const [count, setCount] = useState(0);

useEffect(() => {
  alert("Count was changed"); // Alert every time the count changes (even on the first display)
}, [count]);

```

**Run whenever a particular prop (`color`)  is changed, rendered or reloaded :**
```jsx
// Nav.js
import { useEffect } from 'react';

const Navbar = ({ color }) => {
  useEffect(() => {
    alert("Color was changed"); // Alert every time the color prop changes (passed via `App.js`)
  }, [color]);

  return (
    <div>
      Hello, the color is {color}.
    </div>
  );
};
```
```jsx
// App.js
import Navbar from './Nav.js';

return (
  ...
  <Navbar color={"navy" + "blue"} />
  ...
);
```

**Run on Every render:**
```jsx
// Nav.js
import { useEffect } from 'react';

const Navbar = ({ color }) => {
  useEffect(() => {
    alert("I run on every render"); // Alert every time something renders (e.g., color change and re-render)
  });
  // note: color must be rerender (one way was to make color state and use setColor)

  return (
    <div>
      Hello, the color is {color}. 
    </div>
  );
};
```

- **`useEffect(() => { ... })`** : Runs on **every render** of the component (initial render + every update).
- **`useEffect(() => { ... }, [])`** : Runs **only once**, after the component's **initial render** (like `componentDidMount`).
- **`useEffect(() => { ... }, [value1, value2])`** : Runs **only when specified dependencies (`value1`, `value2`) or Prop change**.
    - `value++` (increment/decrement operations).
    - `setValue(newValue)` (state update).
    - `value = newValue` (direct assignment).


Note:
- If you use **Strict Mode** in your app, the `useEffect` will trigger twice in **development mode**.  
    This happens because `<React.StrictMode>` in `index.js` renders components twice for development checks: `<React.StrictMode>   <App /> </React.StrictMode>`
- It is **not recommended** to disable Strict Mode. You can temporarily comment it out for better understanding of `useEffect` behavior.
- If you are using `react`, you can write `jsx` code with any of the extension (`.js`/`.jsx` ), but in `vite`, `jsx` code  should be written inside `.jsx` either it will give error.

**Basic Syntax with `Return**`
```js
// App.js
useEffect(()=>){
	// Effect logic here
	return ()=>{ // Return Logic}
},[])
```

**Render when the component (`Navbar`) is mounted and `return` when it is unmounted:**
```jsx
// Nav.jsx
useEffect(() => {
  alert("Hello, Welcome to my page."); // Runs when the component is rendered (mounted)

  return () => {
    alert("Component was unmounted"); // Runs when the component is unmounted
  };
}, []);
```

- The `return` inside `useEffect` is called the **cleanup function**. It is executed:
    - **When the component is unmounted or removed from the DOM**.
    - **Before re-running the effect**, if dependencies change (when applicable).

## [React useEffect Hook(Piyush Garg)](https://www.youtube.com/watch?v=53H_fYlikHc&ab_channel=PiyushGarg)

---

# Use Ref Hook

## [The useRef Hook in React | Sigma Web Development Course - Tutorial #109 (Harry)](https://youtu.be/RDp33e3ttTE)


- **Problem with Normal Variable**: 
	- Changes do not trigger re-renders, and new values are not reflected. 
	- Values are not persistent across renders.
- **Solution with State**: Changes trigger re-renders, and new values are reflected.
- **Solution with Ref**: Changes persist across renders but do not trigger re-renders.

---
# Use Context Hook

## [The useContext hook in React | Sigma Web Development Course - Tutorial #116 (Harry)](https://www.youtube.com/watch?v=jIbXtgL0qrg&t=11s&ab_channel=CodeWithHarry)


# [React Context API in One Video | ReactJS | ReactJS Tutorial In Hindi(Piyush Garg)](https://www.youtube.com/watch?v=73Tz6qTgNuU&ab_channel=PiyushGarg)