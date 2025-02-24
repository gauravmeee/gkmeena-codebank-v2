
[Code With Harry JS PDF Notes](https://cwh-full-next-space.fra1.cdn.digitaloceanspaces.com/notes/JS_Chapterwise_Notes.pdf)

# [JavaScript Tutorial In Hindi](https://youtu.be/hKB-YGF14SY)


- JavaScript which is often known as JS, is a **high-level dynamic interpreted** programming language.
- It allows **client-side scripting** to create completely dynamic web applications and websites
- initially designed for making pages "alives"

- can be executed on the browser(client) ans well as the server

---
## try out
Try these codes on console of Google Chrome.
>Google Chrome -> right Click -> Inspect -> console.
- `alert("Hello world")`
- `console.log("Hello world")`
- `34+897`
- `931`

Right click and `Inspect HTML` documents, and find some class let - "button1" and some  `Id` let - "navbar1"\
try (use dot before name for class)\
Let Do some DOM Manipulatoin
- > `document.querySelector(".button1")`
- > `document.querySelector(".button1").click()`
- > `document.getElementById("navbar1")`
- > `document.getElementById("navbar1").click()`

- `> button1`
- > `button1.innerHTML ="Hello Harry";
- > `document.getElementsByTagName('h1')`
- > `document.getElementsByTagName('h1')[0]`
- > `document.getElementsByTagName('h1')[0].style.fontSize = "99px"`
- > `document.getElementsByTagName('h1')[0].style.background = "red"`
- > `document.getElementsByTagName('h1')[0].style.visibility = "hidden"`
- > `document.getElementsByTagName('h1')[0].style.display = "none"`

>this is **client side javascript**

---
## Website

```
HTML (Structure) + CSS(Design) + JavaScript(Client side Scripting) = WebPage
```

## How website work
`Browser(Client) ---request---> Server`
- request like (Get `www.google.com`)

`Browser(Client) <---response--- Server`
- response like (HTML with CSS and JS embedded in it)

Website
- Client Side -> only java script
- Server Side -> JavaScript(NodeJS), Python(Django) etc.

---
## Lets work on .html file

**Inline JavaScript**
```html
...
<body> Hello World! </body>
<script> console.log("Hello World"); </script>
...
```
"Hellow World" is shown on browser->inspect->console

similarly, add these in html, and check what is shown on browser's document, console etc

```html
<script> alert("me") </script>

```html
<script> document.write("I am writing") </script>
```
```html
<script> console.warn("this is a warning")</script>
```
```html
<script> console.error("this is an error")</script>
```
```html
<script> console.assert(4==(6-2))</script>
```
```html
<script> console.log("Hello World", 4+6,"Another log")</script>
```
# .js file

**External Java Script** : add this line in .html
```html
<script> src ="index.js"> </script>
```
now use index.js file seperately , the Javascript engine in browser will automaticlly embed it in html

---
## **Java Script Variables**

variables -> container to store data values
```js
var num1 = 34;
var num2 = 56;
console.log(num1 + num2);
```

---
## **Comments**

Comments -> for developers readability ,but to ignore by the compiler
`//` -> single line comment\
`/* */` -> multi line comment
```js
// single line comment
/* Multi line comment */
```

---
## **Data Types**

In java Script , there are two types of Data Type,i.e **Primitive data types** & **Reference data types**

#### Primitive Data Types

- `number`, `string`, `boolean`, `undefined`, `null`, `symbol`
```js
// Number
var num1 = 455;

// String
var str1 = "This is a string";

// Booleans
var a=true // or var a = 1
var b=false //or var b= 2

// Undefined
var und = undefined; // or simply not assign the value like -> var und; 

// Null
var n = null;

// Symbol
symbol('')// not much imprtant, leave it
```

*Note:*
- in javascript, you can use, comma `,` between objects during functions like `console.log(a,b)` to separate print value by White space (` `)
 - Semicolon is important in JavaScript but Java Script is very forgiving language 🥹, it provide flexibilities such as not using `;`, `let` etc 
- `''` and `" "` are the same in JavaScript for defining strings, but template literals `` ` ` `` allow for multi-line strings and string interpolation.

#### Reference Datatype 

`Array`, `Objects`
```js
//Array
var arr = [1,2,"doe",4,5]
console.log(arr) // 0:1 1:2 3:"doe" 4:5
console.log(arr[0]) //print 1
```
*Note:-* Arrays (or lists) in Python and JavaScript -> different datatypes,\ unlike arrays in C++ -> a single data type.

```js
// Objects
var marks = {
    ravi: 34,
    shubham: 78,
    harry: 99.977}
    //try console.log(marks);
```

---
## **Operators in JS**

```js
x @ y = z -> Statement
// x, y -> operands
// @ ->Operator
```

#### Assignment Operators
```js
var b = 5
var c
// Assignment Operators
c=b
c+=b
c-=b
c*=b
c/=b
```

#### Arithmetic Operators
```js
var a = 100
var b = 10
// Arithmetic Operators
a+b  // 110
a-b  // 90
a*b  // 1000
a/b  // 10
```

#### Comparison Operators
```js
var x = 34
var y = 56
// Comparison Operators
x == y // false
x < y // true
x > y // false
x <= y // true
x > =y // false
```

#### Logical Operators

- `&&`  -> for AND
- `||` -> for OR
```js
true && true // true
true && false // false
false && true // false
false && false // false

true || true // true
true || false // true
false || true // true
false || false // false

!false // true
!true // false
```
Note:- Unlike other languages like Python & C++, JavaScript does not support using words `and` or `or` directly. Instead, it uses `&&` for logical AND and `||` for logical
#### Bitwise Operator

`&` and `|`

// 1:23:05 Functions

---
## Functions
works on DRY Principle\
DRY = Do not repeat yourself\
reuse peace of code/logic

```js
function avg(a,b){
    return(a+b)/2 ;
}
avg(4,6) //call avg()
```
Chrome console log :\
blue color number output : Number Datatype\
black color number output : String Datatype

---
#### Types of Functions in JavaScript:

1. **Anonymous Function**
```javascript
// Anonymous Function Expression
const funcVar = function() { };

// Immediately Invoked Function Expression (IIFE)
(function() {})();

// Callback Example
setTimeout(function() {}, time);

// Event Handler Example
document.getElementById("elementId").addEventListener("event", function() {});
```
- **Note**: Anonymous functions do not have a name. They need to be assigned to a variable if you need to use them later, except when used as an IIFE or in contexts like callbacks and event handlers.

2. **Named Function (Assigning to variable is optional)**
```javascript
// Named Function Declaration
function funcName() { }

// Named Function Expression
const funcVar = function funcName() { };

// Named Function Expression with Immediate Invocation
(function funcName() {})();
```
- **Note**: Named function expressions can be used for recursion and debugging but are not hoisted.

3. **Arrow Function**
```javascript
// Arrow Function
const funcName = () => { };

// Immediately Invoked Arrow Function
(() => {})();
```
- **Note**: Arrow functions have a concise syntax and capture the `this` value from their surrounding context. They also need to be wrapped in parentheses for immediate invocation.

*Note :* **Call Back Function** callback function is a function passed as an argument to another function, which is then executed after some operation has completed. It’s a general programming concept used to ensure that certain code is executed after a task finishes

---
## Conditionals in JavaScript

1. single if statement : only if condition.
2. if - else statement : both if and else condition
3. if-else Ladder statement : if, series of else if ,and else conditons

```js
var age = 21;
// if-else Ladder
if(age<18){
    console.log('You are kid');
else if(age>30){
    console.log('you are youth')
}
else{
    coonsole.log('you are man')
}
}
```

---
## Loop
### for loop

```js
var arr[1,2,3,4,5,6,7]

//for loop
for(var i =0;arr.length; i++){
    console.log(arr[i])
//1234567
} 
```

`for loop:` best to iterate from a lower bound value to upper bound value
```js
// for-Each loop ⭐
arr.forEach(functions(element){
    console.log(element)
}) //1234567
```
`forEach loop` : best to iterate over elements of sequence - array, string etc.

### while loop

```js
//while loop
while(j<arr.length){
    console.log(arr[j]);
    j++;
} //1234567
```
`while loop` : Iterate until a given condition is true

```js
//do-while loop ⭐
do{
    console.log(arr[j]);
    j++;
}while (j < arr.length);
```
`do while` : best when we have to run a loop,at least one time.

## Break and Continue;
```js
//breaks;
for( var i = 0; i<10; i++){
    if(i==4){
        break;
    }
    console.log(i)
}//123
```
`break`: terminate loop based on condition

```js
for( var i = 0; i<10; i++){
    if(i==4){
        continue;
    }
}//1235678
```
`continue`: skip loop's execution for a condition

---
## let var const

`var` :
- Function-scoped
- hoisted & initialised with `undefined`
- Can be re-declared

`let` : 
- Block-scoped (`{}`)
- hoisted but not initialized.
- Cannot be re-declared (only re-assign possible)

`const` : can't updated once after initialisation
- neither be re-declared nor re-assigned

```js
var a
let b
const c
```

Note: - Hoisted mean moving declarations to the top of their scope (either global or function scope) before the code execution begins.\
This means that you can use variables and functions before they are formally declared in the code. 

'var' is a old js standard, we should use 'let' and 'const' whenever possible possible, that make temporary variables in blocks, without appending the global one.

---
## Methods in JavaScript

####  Methods on array 
```js
let myArray = ["Fan", "Camera", 34, null, true ]

// Length of Array
myArr.length

// Remove last elment from array
myArr.pop() // ["Fan", "Camera", 34, null]

// Push an element to an Index
myArr.push("harry") 

// Remove first element from array ⭐
myArr.shift()

// Add element to Starting ⭐
myArr.unshift("Harry")

// Print array
console.log(myArr) // ["Harry", "Camera", 34, null, "harry"]

// Print length of new array ⭐
console.log(myArr.unshift("Gurav")) // 6

// Convert array to string ⭐
myArr.toString() // "Harry,Fan,Camer,34,,true"

// Sort Array (in Dictionary Order) ⭐
let d = [1,4,6,43,23,32324]
d.sort() // [1, 23, 32324, 4, 43, 6]
```
Note: javascript allow storing different datatypes in single array

#### String Methods in JS
```js
let myLovelyString = "Gaurav is a good boy, Gaurav";

// Length of string
myLovelyString.length // 20

// Starting index of substring
myLovelyString.indexOf("Gaurav") //0 (first matched index)

// Starting index of substring
myLovelyString.lastIndexOf("Gaurav") //23 (last matched index)

// Slicing in string (startIndex, size)
myLovelyString.slice(0,3) // "Gau

// Replace first substring occurence in string
myLovelyString.replace("Gaurav","Meena") //"Meena is a good boy, Gaurav"
```

#### Date-Time Method in JS
```js
// Date
let myDate = new Date(); // Mon July 01 2024 22:47:00 GMT+0530 (Indian Standard Time)

//more
myDate.getTime()
myDate.getFullYear()
myDate.getDay() //1   (sun = 0 to sat =6)
myDate.getMinutes()
myDate.getHours()
```
Note: In JavaScript, the `new` keyword is used to create instances of objects that have a constructor function.

Note: JS Methods are generally in `camelCase` in format

---
# Document Object Model (DOM)
DOM - Everything inside body of browser is DOM
`document` is used to access HTML page's element and apply DOM manipulation

## Get Element 

`document.getElementById('click').click()`
`document.getElementById('click').style.border = '2px solid blue'`

```js
// Get HTML elment by Id
let elem    = document.getElementById('click');
console.log(elem)

// Get Collection of HTML elments by Class Name
let elemClass = document.getElementByClassName('container');

// Access elements elemClass and Style them
elemClass[0].style.background = "yellow"

// Add a class in a element (class can be more than one, unlike Id )
elemClass[0].classList.add("bg-primary") 

// Remove a class of a element
elemClass[0].classList.remove("bg-primary")

// Get the Inner HTML of element
elemClass[0].innerHTML
elemClass.innerHTML

// Get only the Text Inside HTML
elemClass[0].innerText
elemClass.innerText

// Get collection of element by Tag Name
tn = document.getElementsByTagName('button')
console.log(tn)

document.getElementsByTagName('div`)
```

Tired of typing `getElementById` , `getElementByClassName` type 'gebi', 'gebcn' as shortcut respectively in vscode , explore more

Tag Name : tag names refer to the names of HTML elements used to structure and display content on a web page. Here’s an overview:
`<body>`, `<div>`, `<img>`

>`getElementsByClassName` , `getElementsByTagName` , `getElementsByName`=  Elements (plural)
>`getElementById` = Element (Singular)

```js
// Create a Element <p></p>
createdElement = document.createElement('p');

// Add content/Text into element
createdElement.innerText = "This is a created para"

// place the element inside a element
tn[0].appendChild(createdElement);

createdElement2 = document.createElement('b')
createdElement2.innerText = "This is a created bold"

// Replace Child - createdElement2 with  CreateEllement
tn[0].replaceChild(createdElment2,createdElement )

tn[0].removeChild(createdElment2)
```

`document.location`- many information like href,  hostname, origin, port etc
`document.title`
`document.URL`
`document.scripts` // collection of JS scripts
`document.links`
`document.images`
`document.forms`
`document.domain`

*Note:* focus on singular plural words, in js it worked as they are written

## Selecting using Query /CSS

the `querySelector` and `querySelectorAll` methods provide a concise and powerful way to select elements using CSS selectors, demonstrating their flexibility and ease of use compared to traditional `getElement` methods.

```js
check all by console.log(sel)
// Select first element using Id
sel = document.querySelector('.container')

// Select all element using Id
sel = document.querySelectorAll('.container')
```
---
# Events in JS 

`onclick`
```html
<!--Add function call in HTML Element Manually-->
<button id="click"> onclick="clicked()"> Click Me </button>
```

//call function `clicked()` when `onclick` event occured
```js
//function definition 
function clicked(){
    console.log('The button was clicked')
}
```

More events
```js
mouseover
onmouseout
onload //when page is load

//ex
document.onload = function(){
    console.log('The document was loaded') ❌ // should attach it on window object

    window.onload = function(){
        console.log('The document was loaded')
    }
}
```
```js
// Add event on firstContainer class using js EventListener
firstContainer.addEventListener('click',fucntion()){  //you can direct access html element like firstContainer here
    console.log("clicked on container")
}

```

you can add more events in place of 'click' like:
`mouseup` : when mouse is released after click
`mousedown` : when mouse is released after hold
`mouseover`: when mouse go on an element
`mouseout` : when mouse go out of an element

To change html element on click
```js
let prevHTML = document.querySelectorAll(.container)[1].innerHTML;

//when clicked, change innerHTML
firstContainer.addEventListener('click', function(){
    document.querySelectorAll('.container'.)[1].innerHTML = "<b> we clicked </b>"
    console.log("Clicked on Container")
})

//When released click, undo changes
firstContainer.addEventListener('mousedown', function(){ document.querySelectorAll('.container')[1].innerHTML = "<b> we had clicked </b>"
    console.log("Clicked on Container Released"))
```

---
Arrow Functions
```js
//normal function
function sum(a,b){
    return a+b;
}
//arrow function (no 'function' keyword required)
sum =(a,b)=>{return a+b;}

//arrow function is used when we have to insert function in between
```
---
# setTimeout and setInterval

```js
logKaro = () => {
    document.querySelectorAll('.container')[1].innerHTML = "<b> Set Interval fired </b>"
    console.log("I am your log")
}
```
#### setTimeout: -> Schedule a function to execute after some millisecond of time

`setTimeout(function, Time_in_ms)`
```js
// Execute logKaro() after 2 second
setTimeout(logKaro, 2000); //2000 ms => 2 second
```

#### Set Interval -> repeatedly execute function after in fixed time interval

`setInterval(function,time)`
```js
// Execute logKaro() after every 2 second
setInterval(logkaro, 2000);
```
```js
// setTimeout return Id to 'timeoutId'
timeoutId = setTimeout(logkaro, 2000);

// setInterval return Id to 'intervalId'
intervalId = setInterval(logkaro, 2000);
```
```js
// pass the Id to cancel the setTimeout  
clearTimeout(timeoutId)

// pass the  Id to cancel the setInterval
clearInterval(intervalId)
```

# JavaScript local storage

```js
// set local storage
localStorage.setItem('name', 'gaurav')

// check local storage
localStorage

// Clear local storage
localStorage.clear()

// get value of  Item on local storage
localStorage.getItem('name') // 'gaurav'
```

# JSON
JavaScript Object Notation is a ligthweight data-interchange format. It is easy for humans to read and write. It is easy for machines to parse and generate. It is based on a subset of the JavaScript Programming Language Standard ECMA-262 3rd Edition - December 1999

```js
obj = {name: "harry", length: 1}
jso = JSON.stringify(obj);
console.log(jso) // {"name":"harry,"length":1}

// Type of data
typeof jso // "string"
typeof obj // "object"
```
```js
obj2 = {name: "harry", length: 1, a:{this:"that"}}

jso = JSON.stringify(obj2);
console.log(jso) // obj2 = {"name": "harry", "length": "1", a:{"this":"that"}}
```
```js
obj2 = {name: "harry", length: 1, a:{this:'tha"t'}} // valid JS object even after adding single quotes 

jso = JSON.stringify(obj2);
console.log(jso) // obj2 = {"name": "harry", "length": "1", a:{"this":"tha\"t"}}
```
similarly it behaves
```
"tha\ "t" -> "tha \"t"
"tha\"t" -> "tha\"t"
"tha\\"t" -> "tha\\\"t"

```
```js
// Object to Json string
jso = JSON.stringify(obj)

// Json string to Object
parsed = JSON.parse(jso)

// Print the object in console
console.log(parsed);


// direct json string to Object
JSON.parse(`{"name": "harry", "length": "1", a:{"this":"that"}}`) // we can write string in backticks "`"
```
Json as standard requires double quotes and will not accept single quotes.
it convert 'tha"t to "tha\"t". it changes single quotes to double , and uses backslash so that to ignore 2nd " as end of string. 

# ECMAScript

ECMA Script is a scripting-language specification standardized by Ecma International. It was created to standardize JavaScript to help foster multiple independent implementations.

1st - 5th Edition - JavaScript
6th - 10th Edition - ECMAScript(2015-2019)

6th Edition - ECMAScript 2015 - ECMAScript 6 (ES6)

Backticks -> 

---
# [Arrow Functions Revisited | JavaScript Tutorial in Hindi #91](https://youtu.be/bJKjtC9MnZ8)

Two Types of Function in Java Script 
1. Function Expression
2. Arrow Function (Introduced in ES6)

```js
// Function Expression
const sayHello = function() { console.log("Hello"); };
```

```js
// Arrow Function
const sayHello = () => {
	console.log("Hello")
}
```

```js
//
```

```js
//
```



    - **Lexical `this`**: Arrow functions do not have their own `this` context; they inherit `this` from the parent scope.
    - **Concise Syntax**: For simple functions, the arrow function syntax is more concise.
    - **No `arguments` object**: Arrow functions do not have their own `arguments` object.

    - **Standard `this`**: In a function expression, `this` refers to the object that calls the function.
    - **Named or Anonymous**: Function expressions can be anonymous (as in your example) or named.
    - **More Flexible**: You can define named functions for recursion or easier debugging.