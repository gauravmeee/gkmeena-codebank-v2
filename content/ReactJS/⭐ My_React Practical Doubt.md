
---

## ensures that Components like `Header` return `jsx` so can be properly rendered in Another Component like `App.js`.

```js
// App.js
import Header from './Header'
function App(){
	return(
	<>
		<Header/> // it should be jsx
		...
	</>
	);
}
```

❌ **Invalid**: Component does not return valid JSX
```jsx
// Header.js
export default function Header() {
    return "abc"; // Returns plain text, not JSX
}
```

✅ **Valid**: Component returns valid JSX
```jsx
// Header.js
export default function Header() { 
    return <header>abc</header>; // Returns JSX
}
```

---

## `<.../>` vs `</...>`


**For Self-closing Tags:**  `/` should be write at ending of the tag
```jsx
<input/>, <br/>, <Header/>
```

**Opening and Closing Tags:** `/` should be written at starting of in Closing Tag
```jsx
<nav></nav>, <div></div>
```


---

### React Doesn't Render Any Component if Some Are Incomplete

```jsx
function App() {

  return (
    <div className="App">
      <Header/>
      <About/>
    </div>
  );
}
```

If any child component (e.g., `<Footer/>`, `<About/>`) has issues like being incomplete or not exported properly, React throws an error, and would not render even complete one like `<Header/>`

---
## Call by Referenence

- **React Issue:** The `onDelete()` function **Executes immediately** when the component renders.
```jsx
const onDelete = () => {
  console.log("Function executed");
};

<button onClick={onDelete()}>Delete</button>;

// `onDelete()` executes immediately because `()` calls the function right away.
// The button gets `<button onClick={undefined}>` because `onDelete()` returns nothing.
```


- **Solution: Pass by reference** The `onDelete` function runs only when the button is clicked.
```jsx
<button onClick={onDelete}>Delete</button>;

// Now, `onDelete` is passed as a function reference** and will only execute on a click.
```

