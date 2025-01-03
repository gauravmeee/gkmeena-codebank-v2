---
slug : react-cheat-sheet
---

Hooks, Props, State

```
npx create-react-app myapp 
```

```
npm start
```

---

```
myApp/
├── public/  -> index.html, favicon.ico
└──  src/ -> App.js, index.js, index.css
          -> components/ -> Header.js, Footer.js
```

---
### Index.js 

The JavaScript files `index.js` in the `src` directory target the `<div id="root">...</div>` element in `index.html` and inject dynamic content into it.


``` 
Function_to_render_react_elements_into_actual_DOM(
	What React should Render -> APP
	Where React should Render -> root
)
```
 |
˅
```jsx
// index.js
import ReactDOM from 'react-dom/client'; // Correct import for React 18+
...
ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
)
...
```

`React.StrictMode` helps identify potential problems during development in App and  doesn't render anything visible in the UI and has no effect in production builds.

React 18+
```jsx
// import ReactDOM from 'react-dom/client'; // Correct import for React 18+

const root = ReactDOM.createRoot(document.getElementById('root')); // Updated for React 18+

root.render(<App />);
```
or
```jsx
// import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render( <App />);

```

---

### Components

Two types of Components in React  -> 
- *Class-based components*
- *Function-based components* (We will focus on this)

Function  based component
```jsx
function App(){}
```

Example
```jsx
function App(){
	return (
		<>
		</h3>My App</h3>
		<p> My app works</p>
		</>
	);
}
```

Note: 
- The whole HTML that is returned in JSX should be wrapped in some single opening and closing tags. If no tags, then simply use `<>` and `</>` or `<div>` and `</div>`
- Modern build tools like `Babel` can handle JSX syntax within `.js` files without any issues.
- `class` and `for` is a keyword in javascript so we use `className` and `htmlFor` for these html tags.
- self-closing tags  `<input>`, `<img>`, `<br>`, etc., must be written with a closing slash to conform to JSX syntax.  `<img...../>`.

---
### Named and Default Export

**Export file**
```javascript
// math.js
export default function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

export const PI = 3.14;
```

**Import file**
```javascript
// app.js
import add, { multiply, PI } from './math.js';
```

1. **Default export**: Imported without curly braces. `import add from './math.js' `
2. **Named export**: Imported with curly braces and the exact name. `import {PI} from './math.js'`
3. If you try to import a named export as a default import or vice versa, you'll get an error.

Default export -> export single main value and import using a flexible naming
Named Export -> export multiple variables, functions, classes and import using the exact name.

**For Non-Javascript Files :**
```javascript
// importing svg files as default
import logo from './logo.svg'; // log0 = './log.svg'
```
- When you write `import logo from './logo.svg';`, you are using the default import syntax. 
- In React projects non-Javascript files like (`.svg`, `.png`, `.css`) are often processed by a **bundler** (like Webpack, Vite, or Parcel) and configured to be exported as modules.
```js
// bundler configure it as
export default "path/to/logo.svg";
```

Note: ⭐
 - Use the correct relative path `./` For a file in the same folder: 
- If you omit the `./`, it assumes you're importing a module from `node_modules`.
---
In JSX, **HTML** is written as regular tags (`<div>`, `<p>`, etc.), and to write JavaScript inside JSX, you use curly braces `{}`. This allows you to include any valid JavaScript expression or logic directly within your JSX code.

---
### Props

`Props` allow you to pass data as attributes from a parent component (or the parent component's state) to a child component in `read-only` mode.


**Child Component:** 

1. Take Properties as a `props`
```jsx
// ChildComponent.js
function ChildComponent(props) {
  return <p>Name: {props.name}, Age: {props.age}</p>;
}
// or ChildComponent = (props) => {}
```

2. Taking props specific property directly
```js
// ChildComponent.js
function ChildComponent(name, age) {
  return <p>Name: {name}, Age: {age}</p>;
}
```

**Default Props** : If `name` is not provided when the component is called, it will default to `'Guest'`.

1. Default Props Using Destructuring with Default Values in the Parameter List
```jsx
// ChildComponent.js
function MyComponent({ name = 'Guest' }) {
  return <p>Hello, {name}</p>;
}
```

2. Default Props Using Default Props `defaultProps`
```jsx
// ChildComponent.js
function MyComponent({ name }) {
  return <p>Hello, {name}</p>;
}

MyComponent.defaultProps = {
  name: 'Guest',
};
```

**Parent Component:**
```jsx
<ChildComponent name="John" age={30} /> // Outputs: "Hello, John"
<ChildComponent /> // Outputs: "Hello, Guest" (Defualt props)
```


- **`PropTypes`**: A built-in React library used for type-checking the props passed to components.
	Helps ensure that components receive props of the correct type and can provide warnings in the console during development.

`PropTypes`
```jsx
MyComponent.propTypes = {
    name: PropTypes.string,  // Ensures `name` is a string
};
```
    
- **`isRequired`**: A modifier used with `PropTypes` to enforce that a prop **must** be provided. If the prop is missing, React will log a warning in the console.
```jsx
MyComponent.propTypes = {
    name: PropTypes.string.isRequired,  // `name` must be a string and is required
```

Note :  
- In JSX non-string like `30` values must be wrapped in curly braces `{}`
-  `PropTypes.isRequired` Invalid ❌ because `isRequired` is applied to a specific type of prop, not directly to `PropTypes`
- *Note:* to use comments in jsx html, you can simply use `/**/` inside `{}`

---

``
**Props template example**
```jsx
// App.js
...
<Header title="My TodoList" searchBar={true}/>
<Todos />
<Footer/>
...
```

If `searchBar` is true show search bar, else so nothing.
```jsx
// Header.js
//jsx
{ props.searchbBar? <form> <input/><button>search</button> </form> : ""}
// { condition ? <TrueComponent /> : <FalseComponent /> } ⭐
```

---