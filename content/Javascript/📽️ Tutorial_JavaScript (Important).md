---
slug : javascript-important-concepts
---

# [Map, Filter & Reduce in JavaScript | JavaScript Tutorial in Hindi #20 (Harry)](https://www.youtube.com/watch?v=bAUMuuRH99o&ab_channel=CodeWithHarry)

**Looping through Arrays**

Arrays can be looped through using the classical javascript for loop or through some other methods discussed below
1. `forEach` loop -> Calls a function, once for each element
```js
const arr = [1, 2, 3]
arr.forEach((value, index, array)=>{
	//function logic
})
```

2. `map()` -> Creates a new array by performing some operation on each array element.
```js
const arr = [1, 2, 3]
arr.map((value, index, array) =>{
	return value*value;
})
```

3. `fileter()` -> filters an array with values that passes a test. Creates a new array
```js
const arr = [1, 2, 3, 4, 5]
arr.filter((value, index, array)=>{
	return value>3;
}; 
```

4. `reduce()` -> Reduces an array to a single value
```js
const arr = [1, 2, 3, 4, 5]
arr.reduces(arr.reduce(add)); // add -> function 
// return 1+2+3+4+5 i.e. 5
```

Note:
- `Map` vs `forEach`: `map` Transforms elements in an array and returns a new array., while `forEach` Iterates over elements to perform side effects.
- `map`, `filter` &  return a new array, `reduce` returns a value and `forEach` & returns `undefined`.
- No function modify the original array

### `map()`

```js
let arr = [45, 23, 21];

let newArr = arr.map((value)=>{
	console.log(value+1)  // 46 -> 24 -> 22
	return value + 1;
})

console.log(newArr) // [46, 24, 22]
```

```js
let arr = [45, 23, 21];

let newArr = arr.map((value, index, array)=>{
	console.log(value, index)  // 45 0 -> 23 1 -> 21 2
	console.lgo(array) // [45, 23, 21] -> ,,, -> ,,,
	return value + index 
})

console.log(newArr) // [45, 24, 23]
```

### `filter()`

```js
let arr = [45, 23, 21, 0, 3, 5];

let newArr = arr.filter((value)=>{
	console.log(value<10) // 0 -> 3 -> 5
	return value < 10; 
});

console.log(newArr) // [0, 3, 5]
```

### `reduces()`

```js
let arr = [1, 2, 3, 5, 2, 1];

let newArr = arr.filter((val1, val2)=>{
	console.log(val1+val2)// 1+2 -> 3+3 -> 6+5 -> 11+2 -> 13+1 -> 14
	return value1 + value2; 
});

console.log(newArr) // 14
```
- The `reduce` method takes two values at a time (`value1` and `value2`).
- It accumulates the result by performing the operation (`value1 + value2` in this case) and returns the final accumulated value after processing all elements.

---
# [Error Handling: try and catch | JavaScript Tutorial in Hindi #60 (Harry)](https://www.youtube.com/watch?v=WRNBQCl_cPU&ab_channel=CodeWithHarry)



# [THIS and arrow function in javascript | chai aur javascript(Chai aur Code)](https://www.youtube.com/watch?v=9ksqBa8_txM&t=10s&ab_channel=ChaiaurCode)

this in global statement in browser -> point to window
this in global statement in Nodejs -> point to empty object


Implicit Return works in Single line

Explicit Return 
```js
const addTwo = (numl, num2) => return { numl + num2 }
```

❌ Implicit Return will not work (Due to curly braces)
```js
const addTwo = (numl, num2) => { numl + num2 }
```

✅ Implicit Return
```js
const addTwo = (numl, num2) => ( numl + num2 )
```

✅ Implicit Return 
```js
const addTwo = (numl,num2) => numl + num2
```

