
# [React Tutorial in Hindi 🔥🔥](https://youtu.be/RGKi6LSPDLU)

#### **What is React?**
React is a JavaScript library used to build single-page user interfaces. Although it's a library, it's often referred to as a framework due to its compatibility with other frameworks like AngularJS and VueJS.

#### **Single-Page Applications**
React is one of the most popular frameworks for building single-page applications (SPAs). In an SPA, the UI doesn't reload when navigating to another page or sending an HTTP request. Instead, the page updates dynamically, providing a seamless user experience.

#### **Library vs. Framework**
Frameworks provide a comprehensive set of functionality and often include pre-built components. Libraries, on the other hand, are more specialized and provide a specific set of functions or tools.

#### **JSX: JavaScript Syntax Extensions**
In React, we use JSX, which is an extension of JavaScript that allows you to write HTML-like code in your JavaScript files. JSX enables you to divide your website into reusable components, making it easier to manage and maintain. This is particularly useful when working with multiple team members on different parts of the project.

JSX is a syntax extension for JavaScript that looks like HTML but is converted into React `createElement` calls by tools like Babel. It allows you to write UI components declaratively in JavaScript.
- In JSX, **HTML** is written as regular tags (`<div>`, `<p>`, etc.), and to write JavaScript inside JSX, you use curly braces `{}`. This allows you to include any valid JavaScript expression or logic directly within your JSX code.

#### **Why Use React?**

You might wonder why use React when we already have HTML, CSS, and JavaScript. The answer is that building a complex application with HTML

If you were to build an application similar to a React app using only HTML and CSS, it would be time-consuming and challenging.

However, with React, the process becomes much easier. React provides many hooks that enable you to send data from one component to another in the form of props. Additionally, the React community has already created a wide range of packages that can be easily integrated into your project.

**Unique features of React :**
1. **State**: Internal data storage for components that can change over time and trigger UI re-rendering.
2. **Props**: Short for properties, used to pass data and methods from parent to child components.
3. **Hooks**: Functions like `useState`, `useEffect`, etc., that enable state and lifecycle management in functional components.
4. **JSX**: A syntax extension to write HTML-like code directly within JavaScript.
5. **Virtual DOM**: Optimizes rendering by updating only the parts of the actual DOM that have changed.
6. **Lifecycle Methods**: Functions like `componentDidMount` or `useEffect` (in hooks) to manage component behavior during its lifecycle.
7. **Context API**: For managing global state without the need for third-party libraries like Redux.

#### **Routing with React**

For client-side routing, you can use React Router DOM. This library helps to make routing smooth and seamless, allowing users to navigate between pages without seeing any loading screens.

#### **React Utilities and Hooks**

React offers a wide range of utilities and hooks that make it easy to build complex applications. With React, you have access to a vast ecosystem of tools and libraries that can help you streamline your development process.

## Lets Get Started

To begin, you'll need to have `Node.js` and `NPM` (Node Package Manager) installed on your system. You can download and install `Node.js` from the official website, which will automatically include `NPM`.

Once installed, open a PowerShell or terminal and type the following commands to check if Node.js, NPM, and npx (a package runner) are properly installed:
```
node --version
npm --version
npx --version
```

> *Note:*  `npx` is a counterpart of `npm` that enables us to execute a package without downloading it. This is particularly useful when using the `create-react-app` utility or other packages, which can be executed using `npx` without the need for a permanent installation.

### Create React App

Open a folder where you want to create a React app, shift + right-click, and select "Open Windows PowerShell". Then, type:

reate a new React application in the **new directory** `myapp`
```
npx create-react-app myapp 
```
or
to create a new React application in the **current directory**
```

npx create-react-app .
```

`create-react-app myapp`

This will create a new React app in a directory called `myapp`.

> *Note:* Project name can no longer contain capital letters. 'myApp' Invalid

### Files in Default React App

Open the project directory with VSCode (or your preferred code editor). You'll see the following files and directories:

```
myApp/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── App.js
│   ├── index.js
│   └── index.css
├── .gitignore
├── package.json
├── README.md
└── yarn.lock / package-lock.json
```

The `package.json` file contains project details, such as dependencies and scripts. The `public` directory contains static assets, like the favicon and `index.html` file. The `src` directory contains the source code for your React app.

### Start Server

To start the app, run the following command:
```
npm start
```

This will start the development server, and your app will be available at:
`http://localhost:3000/`

You can also access the app from other devices on the same network by using the IP address and port: `http://192.168.0.103:3000/`

### `index.html`
let's talk about how React works its magic. When you open the app in a browser, you'll see that the source code only shows the `index.html` file, regardless of which page you navigate to. This is because React is a single-page application (SPA) framework.

The JavaScript files in the `src` directory target the `<div id="root">` element in `index.html` and inject dynamic content into it. As the user interacts with the app, the JavaScript files update the dynamic content accordingly. ⭐

> *Note:* If someone's computer doesn't have JavaScript or has it disabled, they will see the content inside `<noscript>...</noscript>` ❓

### `id="root"`

From where does the content in `<div id="root">...</div>` come from?

- Close the `public/` directory; all development will be done in `src/`.
- `App.js` in the `src/` directory is the main app component we will use to develop the React application.

> *Note:* In a MERN stack application, `index.js` and `App.js` files are commonly written in JSX. While the code written is in JSX, the file extension can still be `.js`. It's common practice to use the `.js` extension for React components, even though they contain JSX syntax. Modern build tools like `Babel` can handle JSX syntax within `.js` files without any issues. ⭐

- `index.js` in `src/` is the entry point of React Application. 

```jsx
// index.js
...
ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
)
...
```

```jsx
ReactDOM.render(  // Function to render React elementsinto the actual DOM.
	ReactElement, // Argument 1 -> What React should render 
	DOMContainer // Argument 2 -> Where React should render it );
```
It takes two things: `App` (JSX) and the `root` selector.

In React, you can break your app into components according to your needs, like header, footer, etc. 
Let's go to the `App.js` component:
```jsx
// App.js
...
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. 
          <!--the `<code>` simply styles the text inside it i.e. "src/App.js" to look like code (usually in a monospace font).-->
        </p>
        
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer" >

          Learn React
        </a>
      </header>
    </div>
  );
}
...
```
This includes HTML and JavaScript syntax, which is JSX, used in React components to insert dynamic JavaScript with HTML.

---
### Workflow Summary:

1. **HTML Setup (`index.html`)**:
    - Provides the basic structure of your web page.
    - Includes an empty `div` with the id `root` where your React application will be mounted.
    - Links to `index.js` where your React application is initialized.

1. **React Setup (`index.js`)**:
    - Imports React and ReactDOM libraries.
    - Imports your main `App` component.
    - Uses `ReactDOM.render` ⭐ to render the `App` component into the `root` element specified in `index.html`.
    - `React.StrictMode`  is a development tool that helps identify potential problems in an application. It doesn't render anything visible in the UI and has no effect in production builds. Its purpose is to improve the quality of your code by enabling extra checks and warnings during development.
    
1. **Rendering and Result**:
    - React takes over the `root` element and renders the content produced by the `App` component inside it.
    - The final output is a fully rendered DOM structure, where the content of `App` (such as `<h1>Hello, World!</h1>`) becomes part of the HTML DOM.
---

- `<div className="App">`: But what is `className`? We only know the `class` attribute.
    
    - `class` is a keyword in JavaScript, and so it would create a problem. That's why a new JSX keyword `className` is used.
    - Similarly, `for` in HTML is used as `htmlFor` in JSX.

- `<img src={logo}>`: Why is this written inside curly braces?
    
    - `logo` is a JavaScript variable, and to Variable use it in HTML, we use `{}`. ⭐`
    - Like you can print `<div>12 + 45</div>`: shows '12 + 45' on the webpage.
    - `<div>{12 + 45}</div>`: shows '57' on the webpage.

```jsx
// App.js
import logo from `./logo.svg`; // logo->variable created
import './App.css'
```
Import is used to import modules, like CSS, to style our webpage.

If we use a wrong JavaScript variable or syntax inside `{}`, it will show an error on the webpage: 'Failed to compile'.

**In React, we can create components in two ways:** ⭐
- *Class-based components*
- *Function-based components*

We will go ... with function-based components in this tutorial, as it is good to start with.

Now, let's edit the `App.js` file.

This will give a compile error as it is invalid JSX ❌:
```jsx
// app.js
function App(){
	return (
		</h3>My App</h3>
		<p> My app works</p>
	);
}
```

This will be valid
```jsx
// app.js
function App(){
	return (
		<>
			</h3>My App</h3>
			<p> My app works</p>
		</>
	);
}
```
*Note:* The whole HTML that is returned in JSX should be wrapped in some single opening and closing tags. If no tags, then simply use `<>` and `</>`. ⭐

In this way you can use HTML and CSS in React JS.
**Just start Writing your HTML or use bootstrap inside App() returns.** ⭐

*Note:* 
1. Always make sure, In React file (`.jsx` or `.js`) you are using `className` not `class` to assign class to html tags. also use `htmlFor` in place of `for`. ⭐
2. In React file self-closing tags such as `<input>`, `<img>`, `<br>`, etc., must be written with a closing slash to conform to JSX syntax. This means that instead of writing `<input.....>`, you should write `<input...../>`.
3. Using `href="#"` in React is discouraged because it triggers unnecessary page reloads and disrupts the SPA (Single Page Application) behavior. ❗

> [Boot Strap for React ](https://react-bootstrap.netlify.app/)

Step to use React-bootstrap in React
1. install react boot strap
```sh
npm install react-bootstrap bootstrap
```

2. Go to website component's page and copy the `jsx` component's code like `html` components codes in html website.

*Advice:* It is not optimal to use bootstraps in website, because you are downloading and using so big css and js files, and use only some feature from it.  
So always try to write, small and simple js and css code on you own as required

>Install **ES7+ React/Redux/React-Native snippets** (~by `dsznajder` ) Extensions for React, React-Native and Redux in JS/TS with ES7+ syntax. Customizable. Built-in integration with prettier. 

---
#### Named Export
   - **Multiple Exports :** Allows exporting multiple variables, functions, or classes from a module.
   - **Explicit Names:** Each export has a specific name, which must be used when importing.
   - **Usage:** Use named exports when you need to export multiple values from a module. ⭐
   ```javascript
   // Exporting
   export const add = (a, b) => a + b;
   export const subtract = (a, b) => a - b;
   
   // Importing
   import { add, subtract } from './math';
   ```

#### Default Export
   - **Single Export**: Only one default export is allowed per module.
   - **Flexible Naming**: The imported name can be different from the exported name.
   - **Usage**: Use default export when exporting a single main value from a module. ⭐
   ```javascript
   // Exporting
   const multiply = (a, b) => a * b;
   export default multiply;
   
   // Importing
   import multiplyFunction from './math';
   ```

NOTE: using both default export and named export
- If Imported without curly braces -> Default Export
- Imported with curly braces and the exact name -> Named Export
- If you try to import a named export as a default import or vice versa, you'll get an error.

---
   
## Let Create Components

Create a `component` folder inside `/src` 

Let creates `Header.js` and `Footer.js` components
```
myApp/
├── public/
│   ├── index.html
│   └── favicon.ico
└──  src/
    ├── components/
    |        └── Header.js
    |        └── Todos.js
    |        └── Footer.js
    |        └── TodoItem.js
    |        └── About.js
	├── App.js
    ├── index.js
    └── index.css
...
```

Using the 'above VS react extension , type `rf` for react function based components template.
```jsx
// Header.js
import React from `react`

export default function Header(){
	return (
		<div>
		
		</div>
	)
}
```

Write `header` component html inside return.
```jsx
// Header.js
...
export default function Header(){
	return (
		<nav>
		 My Header!
		</nav>
	)
}
```

Similarly Make `Todos.js`, `TodoItem.js` and `Header.js`

Import `Header`, `Todos`, `TodoItem` and `Footer` in `App.js`
```jsx
//App.js
...
import Header from "./components/Header" // Default Export
import {Todos} from "./components/Todos" //Name Export
import {Footer} from "./components/Footer" //Name Export

function App(){
	return (
		<>
			<Header/>
			<Todos/>
			<Footer/>
		</>
	);
}

export default App;
```

Wow, Our Components are successfully rendered.

---
### Props in React

In React, **props** (short for properties) are a fundamental concept used for passing data from one component to another. They allow you to pass data as attributes from a parent component (or the parent component's state) to a child component. Props are read-only, meaning that the child component receiving props cannot modify the props directly.

1. **Data Passing**: Props are used to pass data from a parent component to a child component. ⭐
2. **Read-Only**: Props are immutable and cannot be modified by the child component. ⭐
3. **Usage**: Accessed via the `props` object in functional components or `this.props` in class components.
4. **Custom Attributes**: Props can be of any data type, including strings, numbers, objects, arrays, and functions.
5. **Functionality**: Used for configuring child components and passing event handlers or callback functions.

#### Example:

**Parent Component:**
```jsx
<ChildComponent name="John Doe" age={30} />
```

Note : `{30}` enclosed in `{}` because , In JSX, non-string values (like numbers, objects, booleans, or expressions) must be wrapped in curly braces `{}` because **JSX syntax is an extension of JavaScript**. Curly braces explicitly indicate to JSX that the value inside is a JavaScript expression, not plain text or a string. ⭐ Without curly braces, `age=30` would be treated as plain text, which is invalid.

**Child Component:**
```jsx
function ChildComponent(props) {
  return <p>Name: {props.name}, Age: {props.age}</p>;
}
```

### Default Props in React:

In this example, `name` defaults to `'Guest'` if not provided. ⭐

##### 1. Using Destructuring with Default Values in the Parameter List
```jsx
function MyComponent({ name = 'Guest' }) {
  return <p>Hello, {name}</p>;
}
```

##### 2. Using Default Props `defaultProps`
```jsx
function MyComponent({ name }) {
  return <p>Hello, {name}</p>;
}

MyComponent.defaultProps = {
  name: 'Guest',
};
```

- `defaultProps` property to define default values for props:
- **Purpose**: Provide default values for props if none are passed.
- **Functional Components**: work at component level
- **Class Components**: Define defaults with `static defaultProps`.

---

### **`PropTypes` and `isRequired` in React**


- **`PropTypes`**: Specifies the type of a prop.
- **`isRequired`**: Ensures a prop is provided, logging a warning if missing.

- **`PropTypes`**: A built-in React library used for type-checking the props passed to components.
	Helps ensure that components receive props of the correct type and can provide warnings in the console during development.
    ```jsx
    import PropTypes from 'prop-types';
    
    function MyComponent({ name }) {
      return <p>Hello, {name}</p>;
    }

    MyComponent.propTypes = {
      name: PropTypes.string,  // Ensures `name` is a string
    };
    ```
    
- **`isRequired`**: A modifier used with `PropTypes` to enforce that a prop **must** be provided. If the prop is missing, React will log a warning in the console.
    ```jsx
    MyComponent.propTypes = {
      name: PropTypes.string.isRequired,  // `name` must be a string and is required
    ```

	Note:  `PropTypes.isRequired` Invalid ❌ because `isRequired` is applied to a specific type of prop, not directly to `PropTypes`

---
## props usage template Example

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

**Example:** Using Datatype constraint to Props `propTypes` , and `isRequired` & using `defaultProps`
```jsx
// Header.js
import PropTypes from 'prop-types';

export default function Header({ title, searchBar }) {  // Destructuring props directly
  return (
    <div>
      <h3>{title}</h3>
      {searchBar && <input type="text" placeholder="Search..." />}
    </div>
  );
}

// PropTypes definition
Header.propTypes = {
  title: PropTypes.string,  // `title` should be a string
  searchBar: PropTypes.bool.isRequired,  // `searchBar` is required and should be a boolean
};

// Default Props definition
Header.defaultProps = {
  title: "Your Title Here",  // Default value if `title` is not provided
  searchBar: true,           // Default value if `searchBar` is not provided
};
```

 **And the conclusion is that, you can use the header is different different components or react app : )**

---
## Use Parent Component `App.js` and pass todo list to Child `Todos.js` and its Child `TodoItem.js` component. ⭐

Let make a list and show how are app.js looks
```jsx
// App.js

...
function App(){
	let todos =[
		{
			sno: 1,
			title: "Go to the Market",
			desc: "You need to go to the marke to get this job1 done"
		},
		{
			sno: 2,
			title: "Go to the Ghat",
			desc: "You need to go to the Ghat to get this job2 done"
		},
		{
			sno: 3,
			title: "Go to the School",
			desc: "You need to go to the School to get this job3 done"
		},
	]
	return (
		<>
			<Header title="My TodoList" searchBar={true}/>
			<Todos todos={todos}/>
			<Footer/>
		</>
	);
}
...
```

Use `props` = todos list from `App.js` to `Todos.js` to show Todo List
```jsx
// Todos.js
import React from `react`
import {TodoItem} from "./TodoItem"

export const Todos = (props) => {
	return (
		<div className="container">
			<h3>Todos List</h3>
			{/*{props.todos}*/}  <!--can't print list directly-->
			<TodoItem todo={todos[0]}/>
		</div>
	)
}
```
*Note:* to use comments in jsx html, you can simply use `/**/` inside `{}`

Use `props`=todos item from `Todos.js` to  `TodoItem.js` to show each Items individually
```jsx
// TodoItem.js
import React from `react`

// taking `todo` as props directly
export const TodoItem = ({todo})=>{ <!-- todo = todo[0] is recieved -->
	return(
		<div>
			<h4>{todo.title}</h4>
			<p>{todo.desc}</p>
		</div>
	)
}
```

Above Props Structure
```
//parent : props -> child

App() : title, searchBar -> Header()
App() : todos -> Todos()
Todos() : todo -> TodoItem()
```
#### show All list items in `Todos.js` using for Loop and `Higher order method` of JavaScript

```jsx
// Todos.js
... 
// return of `Todos` function 
export const Todos = (props) => {
	return (
		<div className="container">
			<h3>Todos List</h3>
			{props.todos.map((todo)=>{ <!-- Higher order method-- ⭐>
				return <TodoItem todo={todo}/>
			})}
		</div>
	)
}
...
```
*Note:* to use for multiple tags in jsx, for example `<h3>` `</h3>` inside return, you should wrap whole content inside `<></>`  and use `()` to enclose return value

#### Implement Delete Function

1. In `TodoItem.js` Take `onDelete` props from `Todos.js` (Taken itself from `App.js`)
```jsx
// TodoItem.js

// taking `onDelete` as weel as `todo` as props directly
export const TodoItem = ({todo, onDelete})=>{ 
	return(
		<div>
			<h4>{todo.title}</h4>
			<p>{todo.desc}</p>
			<button className="btn btn-sm btn-danger" onClick{onDelete(todo)}> Delete </button> 
			{/* Logical Error: ❌ onDelete() should be passed as arrow function, otherwise it will be called without calling onClick()*/}
		</div>
	)
}
// if we passed `props` as props, than we would use `props.title`, `props.desc` and `props.onClick`
```

2. Update `Todo.js` to pass `onDelete()` as props.
```jsx
// Todos.js
... 
export const Todos = (props) => {
	return (
		<div className="container">
			<h3>Todos List</h3>
			{props.todos.map((todo)=>{ // Will give error (bug solved in future ❌)
				return <TodoItem todo={todo} onDelete={props.onDelete}/> // one line return
			})}
		</div>
	)
}
...
```

3. Define `onDelete()` function in `App.js`
```jsx
// App.js
...
function App(){
	const onDelete =(todo)=>{
		console.log("I am on delte of todo", todo);
	// let todos = .....
	// return (.... )
	}
}
...
```
*Note: todo is object*

---
#### Fixing Bugs.

##### 1. Console Warning: `"Each child in a list should have a unique 'key' prop."`
**Reason:** When using `map()` to render a list in React, each item must have a unique `key` prop to help React manage re-renders efficiently.
**Fix:** Add a unique `key` prop to each element, e.g., `key={todo.sno}`.

```jsx
// Todos.js
...
return(
	<TodoItem todo={todo} key={todo.sno} onDelte={props.onDelete}/>
)
// wrapping inside <> </> giving error: Each child in a list should have a unique `key` prop
...
```
##### 2. Logical Error: Function Execution Without Pressing the Delete Button
Without pressing Delete button, the  function is executed and `consol.log` for all tasks
```
I am on todo, {sno: 1, title: "Go to the Market", desc: "You need to go to the marke to get this job1 done"}
I am on todo, {sno: 1, title: "Go to the Ghat", desc: "You need to go to the marke to get this job2 done"}
I am on todo, {sno: 1, title: "Go to the School", desc: "You need to go to the marke to get this job3 done"}
```
**Reason:** Using `onClick={onDelete()}` calls the function immediately during rendering, instead of on button click.
**Fix:** Use an arrow function to defer the call until the button is clicked, e.g., `onClick={() => onDelete(todo)}`.

```jsx
//TodoItem.js
...
<button onClick={() => onDelete(todo)}>Delete</button>
...
```
This ensures `onDelete` is executed only when the button is clicked, not during rendering.

*Note:*
- **`onDelete()`**: Executes immediately during render.
- **`() => onDelete()`**: Creates a function that calls `onDelete`, executed on the event trigger, useful for passing arguments or deferring execution.
---
## Implementing `Delete TodoItems` to update `DOM`

Deleting in this way in React doesn't work ❌
```jsx
// App.js
...
function App(){
const onDelete = (todo) =>{
	console.log("I am ondelete of todo", todo);
	let index = todos.indexOf(todo); // It will find the index of the `todo` to be deleted
	todos.splice(index, 1); // It will then remove the `todo` from the `todos` array
}
...
```
##### Issues:
- **No State Management:** Modifying the `todos` array directly won’t trigger a re-render because React doesn’t track changes to non-state variables.
- **Immutable Updates Required:** State should be updated immutably; directly altering the array won’t properly update the UI. Instead, create a new array with updated data.

 In Angular, you update variables to reflect changes in the DOM automatically. In React, you use the State Hook (`useState`) to manage state and trigger re-renders for updating the DOM.

---
## Use State Hook `useState()`

Import `useState`
```jsx
// App.js
...
import React, {useState} from 'react';
...
```

Update the `App.js` to Use this `const [count, setCount] = useState(0);` method to Declare `todos` 

```jsx
// App.js
...
function App(){
	const [todos, setTodos] = useState([
		{
			sno: 1,
			title: "Go to the Market",
			desc: "You need to go to the marke to get this job1 done"
		},
		{
			sno: 2,
			title: "Go to the Ghat",
			desc: "You need to go to the Ghat to get this job2 done"
		},
		{
			sno: 3,
			title: "Go to the School",
			desc: "You need to go to the School to get this job3 done"
		},
	])
	return (
		<>
			<Header title="My TodoList" searchBar={true}/>
			<Todos/>
			<Footer/>
		</>
	);
}
...
```

use State hook in `onDelete()`
```jsx
// App.js
...
function App(){
const onDelete = (todo) =>{
	console.log("I am ondelete of todo", todo);
	// Update the state by filtering out the todo item 
	// `filter` creates a new array excluding the `todo` to be deleted
	setTodo(todos.filter((e)=>{
		return e!==todo;  // Explicit Return (We could also use Implicit)
		}))
}
...
```

---
#####  `useState` Hook :
**Syntax**: `const [state, setState] = useState(initialState);`
- **Parameters**:- `initialState`: The initial value of the state.
- **Returns**: An array with two elements - The current state value and A function to update the state value.
##### `setTodo()`
`setTodos` is a updater of `useState`, function provided by the `useState` hook in React. The `useState` hook is a built-in React hook that allows you to add state to functional components.

*Example:* 
```jsx
const [todos, setTodos] = useState(initialState);

// Update state (will use in deleteTodo())
setTodos([...todos, newTodo]);

// Update state (will use in addTodo())
setTodos(todos.filter(todo => todo.id !== idToDelete));
```
---
*Note:*-In JavaScript arrow functions you can you Implicit or Explicit Return. Implicit Return: Omit `return` and `{}` if there's a single expression.
  ```jsx
  setTodo(todos.filter(e => e !== todo)); // Implicit Return
  ```

If todos is empty, i.e. `list.lengt==0` print No item else, render the list UI
```jsx
// Todos.js
... 
export const Todos = (props) => {
	return (
		<div className="container">
			<h3>Todos List</h3>
			<!--{ condition ? <TrueComponent /> : <FalseComponent /> }-->
			{props.todos.length===0? "No Todos to display":
			props.todos.map((todo)=>{
				return <TodoItem todo={todo} key={todo.sno} onDelete={props.onDelete}/>
			})}
		</div>
	)
}
...
```

---
## Style in React

```jsx
// Footer.js
import React from 'react';

export const Footer = () => {
    return (
        <footer className="bg-dark text-light py-3" style={{
            position: "absolute",
            top: "100vh",
            width: "100%"
        }}>
            <p className="text-center">
                Copyright &copy; MyTodoList.com
            </p>
        </footer>
    );
};
```

**Better Approach** in React using `footerStyle = {}` Object and `inline` Style :
```jsx
// Footer.js
import React from 'react'

export const Footer = () =>{
	let footerStyle = { // footerStyle object
		position: "absolute",
		top: "100vh",
		width: "100%"
	}
	return(
		// style={footerStyle}
		<footer className="bg-dark text-light py-3" style={footerStyle}> 
			<p className="text-center">
			Copyright &copy; MyTodoList.com
			</p>
		</footer>
	)
}
```
**Inline Styles**: This approach directly embeds the CSS properties within double curly braces `{{}}` inside the `style` attribute. Each CSS property is defined as a key-value pair where the key (property name) is a string.


```jsx
// App.js
...
import {Footer} from "./components/Footer";
...
```

---
We could also use a external `Stylesheet`
```css
/*footer.css*/
/* CSS Content here*/
```

```jsx
// Footer.js
...
import `./footer.css`
...
```
but we will not use external stylesheet here

---

### Add Todo using `AddTodo.js` Component
```jsx
// AddTodo.js

import React from 'react'

export const AddTodo = () =>{
	return(
		<div className="container my-3">
			<h3>Add a Todo</h3>
			<form onSubmit={submit}>
				<div className="mb-3">
					<label htmlFor="title" className="form-label"> Todo Title</label>
					<input type="text" className="form-control" id="desc"/>
				</div>
				<div>
					<label htmlFor="desc" className="form-label"> Todo Description</label>
					<input type="text" className="form-control" id="desc"/>
				</div>
			<button type="submit" className="btn btn-sm btn-success"> Add Todo </button>
			</form>
		</div>
	)
}
```
*Reminder:* Use `className` not `class`  and `htmlFor` not `for` inside `jsx` like above code

import  AddTodo
```jsx
// App.js
import {Todos} from "./components/Todos";
import {AddTodo} from "./components/AddTodos";
import React, {useState} from 'react';
...
return(
	<>
		<Header title="My Todos List" searchBar={false}/>
		<Addtodo/>
		<Todos todos={todos} onDelete={onDelete}/>
		<Footer/>
	</>
);
...
```

On Add Todo Page, Reflect the changes , i.e. Add and Show form submitted item in list

Update `AddTodo` function and takes `props`
```jsx
// AddTodo.js
...
import React, {useState} from 'react';

export cosnt AddTodo = (props) => {
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	return (
				...
				// value = {title}
					<label htmlFor="title" className="form-label"> Todo Title</label>
					<input type="text" value={title} className="form-control" id="desc"/>
				...
				// value = {desc}
					<label htmlFor="desc" className="form-label"> Todo Description</label>
					<input type="text" value={desc} className="form-control" id="desc"/>
				...
	)
}
```

#### Fixing Bugs.

##### Logical Error: When we Try to type in the input form, it is not typed
The issue of not being able to type in the input form is due to using controlled components (`value={title}` and `value={desc}`) without providing `onChange` handlers to update the state. This causes the input fields to display fixed values, preventing any typing.

To fix this, in `AddTodo.js` you need to add `onChange` handlers that update the state when the user types in the input fields.

```jsx
// AddTodo.js
...
// onChange={(event)=>{setTitle(event.target.value)}}
	<label htmlFor="title" className="form-label"> Todo Title</label>
	<input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className="form-control" id="desc"/>
...
// onChange={(event)=>{setDesc(event.target.value)}}
	<label htmlFor="desc" classNameform-label"> Todo Description</label>
	<input type="text" value={desc} onChange={(e)=>setDesc(e.target.value)} className="form-control" id="desc"/>
...
```
---
##### Activate Submit Button, passing `props`

In `App.js` Define `addTodo()` function and pass as props
```jsx
// App.js
...
	// addTodo function to reflect submit button changes  , that will take `title` and `desc` as argument
	const addTodo = (title, desc) => {
		console.log("I am adding this todo", title, desc)
		let sno = 0;
		// sno = serial number of last element in todo list = ((n-1) +1), where n is the length 
		if(todos.length!=0) sno = todos[todos.lenght-1].sno + 1
		
		const myTodo = {
				sno: sno,
				titile: title,
				desc: desc,
			}
			// using useState Hook function `setTodo()` 
			setTodo([...todos, myTodo]); //Use the spread operator `...` to create a new array that includes all the previous items along with the new item.
			console.log(myTodo);
	}
...
	<AddTodo addTodo={addTodo}/> 
...

```

Use `addTodo()` function in `AddTodo.js` and call it when `submit` function
```jsx
// AddTodo.js
...
export cosnt AddTodo = (props) => {
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	
	const submit =(e)=>{ // e-> passed event
		e.preventDefault(); // prevent page reload on submit
		if(!title || !desc){
			alert("Title or Description cannot be blank")
		}
		else{
			props.addTodo(title, desc) // props 
			setTitle(""); // Reset Title using useState()
			setDesc(""); // Set Description using useState()
		}
	}
	return (...
	)
}
...
```
---
#### Remove the Manually elements and storing in Local Storage

Updated `App.js` to add todo item in `localStorage` (so that on refresh list will not reset)
```jsx
// App.js
...
function App(){
	let initTodo;
	
	// If the `"todos"` key does not exist, it returns `null`.
	if(localStorage.getItem("todos")===null){
		initTodo = [];
	}
	else{ initTodo = JSON.parse(localStorage.getItem("todos"));
	}
	
	const Delete = (todo) => { /* Delte Method Declaration*/
	// update localstorage when deleted
	localStorage.setItem("todos", JSON.stringify(todos));
	}
	
	const addTodo = (title, desc) => { /* Add Method Declaration */
	// update localstorage when added
	localStorage.setItem("todos", JSON.stringify(todos));
	}
	 /*Reinitialised the todos list with dynamic content*/
	const [todos, setTodos] = useState([initTodo]) ;
	return (
	<>
	...
	<AddTodo addTodo={addTodo}/>
	...
	</>
	);
}
...
```

*Note:*
 **localStorage.setItem**
- **Syntax**: `localStorage.setItem(key, value)`
- **Parameters**:- `key`: A string representing the name of the key you want to create/update. `value`: A string representing the value you want to store. If you need to store an object or array, you must first convert it to a JSON string using `JSON.stringify`.

**localStorage.getItem**
- **Syntax**: `localStorage.getItem(key)`
- **Parameters**:- `key`: A string representing the name of the key you want to retrieve.
- **Returns**: The value associated with the specified key. If the key does not exist, it returns `null`.

---
#### Fixing Bugs.

On Reloading, Some Items are Disappear and Some are Appear on Todo List.
Reason: In 
```jsx
// In onDelete() Fucntion
	setTodo(todos.filter((e)=>{ return e!==todo; }));
	localStorage.setItem("todos", JSON.stringify(todos));
}
```

```jsx
}
// In addTodo() Function
	setTodo([...todos, myTodo]);
	localStorage.setItem("todos", JSON.stringify(todos));
}
```

When we call updater of `useState` Hook  i.e. `setTodo`, it will not update `todos` Immediately. It means Sometime without properly updating `todo` we are storing in local Storage

Solution : `useEffect`

---
## Use Effect Hook `useEffect()`

Import `useEffect` in `App.js`
```jsx
// App.js
import React, { useState, useEffect } from `react`;
...
// In onDelete() Fucntion
	setTodo(todos.filter((e)=>{ return e!==todo; }))
}

// In addTodo() Function
	setTodo([...todos, myTodo]);
}

// useEffect()
	useEffect(() =>){
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos])
```
 *Note:* Whenever there is a change in `todos`  , the `useEffect` Method will be called Immediately. it means item will be saved in local storage only after change in todo is successful.

---
## React Router

React Router is a library for managing routing in React applications. It allows you to define and handle different routes within a single-page application (SPA), enabling navigation between different views or components based on the URL on the Same Page.

- It render different URI into same page
###### [React Router Guide](https://v5.reactrouter.com/web/guides/quick-start)

```sh
npm install react-router-dom
```


In `App.js` use `Router`
```jsx
// App.js
import {About} from "./components/About" //Name Export
...
import  {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
...
	// here we are taking props as directly for learning purpose
	return(
		<Router>
			<Header title="My Todos List" searchBar={false} />
			
			<switch>
				<Route exact path="/" render={()=>{
					return(
						<>
							<AddTodo addTodo={addTodo}/>
							<Todos todos={todos} onDelete={onDelete}/>
						</>
					)
				}}
				</Route>
				
				<Route exact path="/about">
					<About/>
				</Route>
			
			</switch>
			</Footer>
		</Router>
	)
//...
```

if not use exact,

1. Rendering `<Header>` and `<Footer>` for every page because it is outside `<switch></switch>.

2. We not use `render` for `</About>` because In React Router, the `render` prop is not required for simple component rendering. `render` purpose is to provide more control over rendering, allowing for inline functions or passing additional props.

3. We use `exact path = "/"` because  this route will only render  component when the URL is exactly `/`, otherwise  using simply `path="/"` will render all components start with `/`  like `/about`


### `Link` Router

in `Header.js` use `Link` of Router
```jsx
import { Link } from "react-router-dom";
// Header.js
// In Navbar Links
// Replace `<a>` tags with `<Link>`
// Replace `href` properties with `to`

// Change <a href="#"> About </a>  to <Link = to="/about"> About </Link>
```
*Note:*  Change
`href` ->`to` 
`<a>` -> `<Link>`


##### Useful Extension - React Developer Tools (by Facebook)
This will provide features in `Inspect` options.   You can show, props, states of components, It will tell How tell what thing is coming from where, How something is happening etc.

### Make App for Production
```sh
npm run build
```

A Production build directory `build/` will be created in the project
in this  open `build/index.html` with live server
it will take you to the route `localhost:127.0.0.1.5500/index.html`
In this `127.0.0.1.5500` you can go to different routes and use your production app

A **production build** in the context of a web application is a version of your application optimized for performance, security, and stability. It’s intended to be deployed to a live environment where end users will interact with it. Here's a summary of what happens during the production build process:

# Notes By GPT 
### **What is a Production Build?**

1. **Optimization**:
   - **Minification**: Reduces the size of JavaScript and CSS files by removing unnecessary characters (like whitespace) and shortening variable names.
   - **Bundling**: Combines multiple JavaScript and CSS files into a single file to reduce the number of HTTP requests.
   - **Tree Shaking**: Removes unused code to make the final bundle smaller.
   - **Compression**: Often includes gzip or Brotli compression to reduce file sizes even further.

2. **Compilation**:
   - **Transpilation**: Converts modern JavaScript (ES6+) and JSX into compatible code for older browsers using tools like Babel.
   - **Code Splitting**: Divides the application into smaller chunks that are loaded on demand to improve performance.

3. **Configuration**:
   - **Environment Variables**: Configures environment-specific settings (e.g., API endpoints, feature flags) for production.
   - **Error Handling**: Sets up proper error handling and logging for production environments.

4. **Deployment**:
   - **Static Files**: Outputs static files (HTML, CSS, JavaScript) that can be served by a web server.
   - **Cache Busting**: Includes unique hashes in filenames to ensure browsers load the latest version of assets.

### **How to Create a Production Build**

Using `npm` for React applications (or similar setups):

```sh
npm run build
```

- **Command**: Executes the build script defined in your `package.json` file.
- **Output**: Creates a `build/` directory containing optimized static files.

### **Serving the Production Build**

- **Live Server**: You can use a local server to test the production build.
  - **Command**: For example, using `live-server` or another local server tool.
  - **Access**: Open `build/index.html` with a live server to test your application.

- **Production URL**: The `localhost` address (`localhost:127.0.0.1:5500/index.html`) indicates where you can test your production build locally.

# --The End-- ✅



