---
slug : react-my-practical-doubts-notes
---

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
