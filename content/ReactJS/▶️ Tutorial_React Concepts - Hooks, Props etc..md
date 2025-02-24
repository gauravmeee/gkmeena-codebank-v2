
> Resources
- [State Hook Documentation](https://react.dev/reference/react/hooks#state-hooks)
- [Context Hook Documentation](https://react.dev/reference/react/hooks#context-hooks)
- [Ref Hook Documentation](https://react.dev/reference/react/useRef)
- [Effect Hook Documentation](https://react.dev/reference/react/hooks#effect-hooks)
- [Performance Hooks Documentation](https://react.dev/reference/react/hooks#performance-hooks)
- [Props Documentation](https://react.dev/learn/passing-props-to-a-component)

---

# [Every React Concept Explained in 12 Minutes](https://youtu.be/wIyHSOugGGw)

---
# Props
## [Components, Props and JSX in React | Sigma Web Development Course - Tutorial #106](https://www.youtube.com/watch?v=S4VH8hddg8c&pp=ygULcmVhY3QgcHJvcHM%3D "Components, Props and JSX in React | Sigma Web Development Course - Tutorial #106")

> More on Props [Understanding Props in ReactJS](https://www.youtube.com/watch?v=VpGFuThTjhY&pp=ygULcmVhY3QgcHJvcHM%3D "Understanding Props in ReactJS")

---

# Use State Hook

## [Hooks & State in React | Sigma Web Development Course - Tutorial #107 (Harry)](https://www.youtube.com/watch?v=zHoWgJD0jw4&t=8s&pp=ygUVaG9va3MgYW5kIHN0YXRlIHJlYWN0)

>More on State Hook [React useState Hook - React Hooks Explained (Piyush Garg)](https://youtu.be/3i840mtbDNI)

---

# Use Effect Hook
## [The useEffect Hook in React | Sigma Web Development Course - Tutorial #108(Harry)](https://www.youtube.com/watch?v=bio2eP5YXyw&ab_channel=CodeWithHarry)

- `useEffect` is a React Hook that lets you handle **side effects** in functional components.
- Equivalent to lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` in class components.
- **Purpose**: For actions like fetching data, subscribing to events, manipulating the DOM, or managing timers.

**Basic Syntax :**
```js
// App.js
useEffect(()=>){
	// Effect logic here
	return ()=>{ // Return Logic}
},[])
```

**Import:**
```js
// App.jsx
import {useEffect} from 'react'
```

**Run on Every Render (i.e. anything render anytime)**
```js
useEffect(() => {
  alert("I run on every render!"); // alert everytime something render
});
```

**Run only on first render (i.e. whenever the component itself loaded/reloaded)**
```jsx
useEffect(()=>){
	alert("Hello, This is the first render of App.jsx") // alert everytime component load/reload
},[])
```

**Run whenever a particular state (`count`) is changed, rendered or reloaded :**
```jsx
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

**Dependency Behavior**
- **`useEffect(() => { ... })`** : Runs on **every render** of the component (initial render + every update).
- **`useEffect(() => { ... }, [])`** : Runs **only once**, after the component's **initial render** (like `componentDidMount`).
- **`useEffect(() => { ... }, [value1, value2])`** : Runs **only when specified dependencies (`value1`, `value2`) or Prop change**.
    - `value++` (increment/decrement operations).
    - `setValue(newValue)` (state update).
    - `value = newValue` (direct assignment).

Note:

- The `return` inside `useEffect` is called the **cleanup function**, executed:
    - **Before re-running the effect**, if dependencies change.
    - **When the component is unmounted** from the DOM.
- **In Vite**, `.jsx` files are required for JSX syntax. Use `.jsx` instead of `.js` to avoid errors.

- **Strict Mode Behavior**
	- In **development mode**, `<React.StrictMode>` causes `useEffect` to run **twice** on the initial render.
	- This is intentional to help detect side effect bugs.
	- It is **not recommended** to disable Strict Mode. You can temporarily comment it out to understand the behavior better.

- **Best Practices**
	- Use `useEffect` for **side effects only** (e.g., data fetching, event listeners, or DOM updates).
	- Avoid performing **synchronous updates** within `useEffect`, as it can lead to infinite loops.

> More on Effect Hook [React useEffect Hook(Piyush Garg)](https://www.youtube.com/watch?v=53H_fYlikHc&ab_channel=PiyushGarg)

---
# Use Context Hook

## [The useContext hook in React | Sigma Web Development Course - Tutorial #116 (Harry)](https://www.youtube.com/watch?v=jIbXtgL0qrg&t=11s&ab_channel=CodeWithHarry)

React Context provides a way to share data (like state, functions, or themes) across components without passing props through every level of the component tree (avoids prop drilling). 

**Prop Drilling**: passing data from a parent component to a deeply nested child component by passing it as props through intermediate components, even if those intermediate components don't directly use the data.

Let there is a counter `count`, and we want this `count` value inside a component `Component1.js`
```       
App.jsx
	⬊   
	Navbar.jsx
	    ⬊
	    Button.jsx
		    ⬊
			Component1.jsx

```
We can achieve this by prop drilling, by transferring prop `count` from `app` to `Navbar` then to `Button` and then finally to `Component`.

But this is not a good approach, as we are passing a value from one component to others, even it is not required.

```jsx
// src/App.jsx
const [count, setCount] = useState(0);
const App = () =>{ return( <Navbar count={count}/> }

// src/components/Navbar.jsx
const Navbar = ({count}) =>{ return( <Button count={count}/>) }

// src/components/Button.jsx
const Button = ({count}) =>{ return( <Component count={count}/>) }

// src/components/Component1.jsx
const Component1 = ({count}) =>{ return(<div> {count} </div>) }
```

#### *Use case level 1 : Display `count` in `Component1` (Read-Only)

**Create Context**
```js
// src/context/context.js

// import `create` context hook
import {createContext} from "react";

// create and export a `context` variable
export const counterContext = createContext(0)
```

**Provide Context in `App.jsx`**
```jsx
// import the defined counter Context 
import {counterContext} from './context/context'

const [count, setCount] = useState(0)
function App(){
	return(
		// wrap the component inside context Provider
		<>
		<counterContext.Provider value={count}>
			<Navbar/>
		</counterContext>
		</>
	)
}
```

**Consume Context in `Component1.jsx`**
```jsx
// import `use` Context Hook
import {useContext} from 'react'

const Component1 = () =>{
	// use the context created inside `context.js` through `useContext`
	const counter = useContext(counterContext)
	return (
		<div>
		{counter} {/*Count Value */}
		</div>
	)
}
```

#### *Use case level 2 :Update `count` from `Button` and Display in `Component1`*

**Provide `count` and `setCount` in `App.jsx`**
```jsx
// App.jsx
...
return(
	<counterContext.Provider value={{count, setCount}}>
	</counterContext.Provider>
)
...
```

**Consume `count` and Display in `Component1.jsx`**
```jsx
// Component1.jsx
const Component1 = () =>{
	const value = useContext(counterContext)
	return (
		<div>
		{value.counter} {/*count value*/}
		</div>
	)
}
```

**Consume `setCount` and Update `count` from `Button.jsx`**
```jsx
// Button.jsx

const Button = () =>{
	const value = useContext(counterContext)
	return(
		<div>
			<button onClick={()=>value.setCount((count)=>count+1)}> {/*setCount function*/}
			</button>	
		</div>
	)
}
```

**Key Note:**
- **Context Creation**: Use `createContext` to define a shared context. Export it to be used in other components.
- **Context Provider**: Wrap components inside `<Context.Provider>` to supply the context value. All descendants can consume the value.
- **Consuming Context**: Use the `useContext` hook to access context values in a component.

**Benefit:**
- Avoids prop drilling.
- Centralizes state management for related components.

**Limitations**:
- Overuse may lead to unnecessary re-renders of child components.

Note:
- for making `context` file there is no need to make it `jsx`)
- Every component  wrapped inside `<context-Name>.Provider` and there Descendent  will be provide the value inside `<context-Name>.Provider`

>More on Context HOOK [React Context API in One Video | ReactJS | ReactJS Tutorial In Hindi(Piyush Garg)](https://www.youtube.com/watch?v=73Tz6qTgNuU&ab_channel=PiyushGarg)


---

# Use Ref Hook

## [The useRef Hook in React | Sigma Web Development Course - Tutorial #109 (Harry)](https://www.youtube.com/watch?v=VlSNiL_x4mo&t=409s&ab_channel=CodeWithHarry)

**Import:**
```js
// App.jsx
import {useRef} from 'react'
```

#### *Example Use Case 1: Persisting Variable Values Across Renders*

Consider a counter button:
```jsx
const [count, setCount] = useState(0);

useEffect(() => {
  console.log("re-rendering...");
});
```
- When the button is clicked, `setCount` updates `count` by `+1`, causing the component to re-render.
- As a result, `"re-rendering..."` is logged on every render.

Now, introduce a variable `a` that increments on every render and logs its value:
```jsx
let a = 0;

useEffect(() => {
  a = a + 1;
  console.log(`re-rendering and value of a is ${a}...`);
});
```
**Issue:**

- The console logs `"re-rendering and value of a is 1..."` every time.
- This happens because `a` is reinitialized to `0` during every render.

**Solution: Using `useRef` to Persist Values**  
`useRef` allows us to persist a value across renders without resetting it:
```jsx
const a = useRef(0);

useEffect(() => {
  a.current = a.current + 1;
  console.log(`re-rendering and value of a is ${a.current}...`);
});
```
**Advantages of `useRef`:**

- **Persistence:** The value of `a.current` persists across renders.
- **No Re-renders:** Unlike `useState`, changing `useRef` values does not trigger re-renders.

**Comparison of Approaches:**

- **Normal Variable:** Loses its updated value after every render.
- **`useState`:** Triggers re-renders upon value change.
- **`useRef`:** Retains the updated value across renders without causing re-renders.

#### *Example Use Case 2: DOM Manipulation with `useRef`*

**Scenario:**  
We have a counter button and need to change its background color without direct DOM manipulation.
```jsx
<button onClick={() => setCount((count) => count + 1)}>
  count is {count}
</button>
```

**Solution:**  
Use `useRef` to reference the DOM element and apply styles in `useEffect`.
```jsx
const ref = useRef(); // Create a reference

useEffect(() => {
  ref.current.style.backgroundColor = "red"; // Modify the DOM element
}, []); // Only runs on the first render

return (
  <button ref={ref} onClick={() => setCount((count) => count + 1)}>
    count is {count}
  </button>
);
```

**Key Points:**
- `useRef` provides a reference(or access) to the DOM element, enabling style changes without manually querying the DOM (e.g., `document.getElementById`).
- Changes made via `useRef` do not trigger re-renders.


---

### More to Learn

 **1. React Context API**
- **Why**: Learn to manage global state and avoid prop drilling.
- **Topics**:
    - `createContext` and `useContext`
    - Context Providers and Consumers
    - When to use Context vs Redux or other state management tools
- **Practice**: Implement a theme switcher or user authentication state using Context.

**2. React Router**
- **Why**: Handle navigation and routing in single-page applications (SPAs).
- **Topics**:
    - `BrowserRouter`, `Routes`, and `Route`
    - `useNavigate`, `useParams`, and `useLocation`
    - Nested routes and route protection (e.g., Private Routes)
- **Practice**: Create a multi-page app like a blog or e-commerce app.

**3. State Management Libraries**
- **Why**: Manage complex state across large applications.
- **Options**:
    - Redux Toolkit (modern Redux)
    - Zustand (lightweight alternative)
    - Recoil or Jotai
- **Practice**: Build a to-do app or a shopping cart app with global state management.

**4. Performance Optimization**
- **Why**: Make your apps faster and more efficient.
- **Topics**:
    - Memoization (`React.memo`, `useMemo`, `useCallback`)
    - Lazy loading with `React.lazy` and `Suspense`
    - Code splitting and dynamic imports
- **Practice**: Optimize an app with heavy re-renders or large components.

**5. Advanced React Patterns**
- **Why**: Learn scalable and reusable approaches for real-world projects.
- **Topics**:
    - Higher-Order Components (HOCs)
    - Render Props
    - Compound Components
    - Custom Hooks
- **Practice**: Build a form library or a reusable modal component.

**6. Backend Integration**
- **Why**: Connect your React app to a backend for real-world applications.
- **Topics**:
    - Fetching data with `fetch` or libraries like Axios
    - Using `useEffect` for side effects
    - Error handling and loading states
    - Authentication and session management
- **Practice**: Build a React app that fetches data from a REST API (e.g., weather app or GitHub user search).

**7. TypeScript with React**
- **Why**: Enhance code quality and maintainability.
- **Topics**:
    - Typing props, states, and hooks
    - Using TypeScript with Context and Redux
    - Handling component types (e.g., FC, PropsWithChildren)
- **Practice**: Refactor a project to use TypeScript.


