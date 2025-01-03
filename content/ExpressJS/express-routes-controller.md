---
title: Express Routes and Controller
description: This is a note focused on route and controller made from youtube tutorials
author: Gkmeena (from Tutorial)
---

--- 
## Basic Express Setup and using `dotenv` & `mongoose`

**Define environment variables** in a `.env` file:
```sh
# .env
PORT=5000
MONGODB_URL=mongodb://localhost:27017/myDatabase
```

**Loading Environment Variables in `App.js`** Using `dotenv`
```js
// Import dotenv
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL; // MongoDB URL
const PORT = process.env.PORT || 3000;      // Server port
```

**Connecting MongoDB using Mongoose** using `MONGODB_URL`:
```js
// Import mongoose
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
    .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));
```

**Running Express Server**  on the specified `PORT`:
```js
// Import express
const express = require("express");

const app = express(); // Initialize Express

// Express Logic .........

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

Notes:
1. **Use `.env` for sensitive data like `PORT` and `MONGODB_URL`.
2. **Error Handling:** Always handle MongoDB connection errors.
3. **Middleware:** Add any required middleware (e.g., `express.json()`).
4. **Keep `.env` Secure:** Add `.env` to `.gitignore`.

---

# [Rest API #3: Setup Routes & Controllers using Express Routers in Hindi](https://www.youtube.com/watch?v=AzmWXD-uGjI&ab_channel=ThapaTechnical)

## Routes and Controller

We generally made Routes simply with `app.get()`
```js
// app.js

app.get("/", (req, res) =>{
	res.send("Hi, I am live");
});
```

But in Future if we gonna make our application big, using `app.get()` for each routes will not be efficient

So we use Routes and Controller
- Routes -> Tells what to do
- Controller -> Then it do

Added `Routes/products.js` and `controller/products.js`
```
server
├── controllers
|       └── products.js   
├── routes
|       └── products.js  
└── app.js
```

**Setup Controller `controllers/products.js` :** Define the Function to be used for each Routes
```js
const getAllProducts = async (req, res)=>{
	res.status(200).json(msg: "I am getAllProducts"});
}

const getAllProductsTesting = async (req, res)=>{
	res.status(200).json(msg: "I am getAllProductsTesting"});
}

module.exports = {getAllProducts, getAllProductsTesting};
```

**Setup Router `routes/proudcts.js`:** Define the routes and Use the Functions in each routes
```js
const router = express.Router(); // import router
const {getAllProducts, getAllProductsTesting} = require("../controllers/products"); // import controller

// Route for All products through `getAllProducts()` Function
router.route("/").get(getAllProducts);
// routes for getAllProducts for testing purpose
router.route("/testing").get(getAllProductsTesting);

module.exports = router;
```

**Setup Server (`app.js`):** 
```js
// import Router
const productsRoutes = require("./routes/products"); 

// Home Page
app.get("/", (req, res) => {
    res.send("Hi, I am live"); // localhost:5000/
});

// Middleware to use Router
app.use("/api/products", productsRoutes);
// Routes:
// - localhost:5000/api/products/ -> getAllProducts
// - localhost:5000/api/products/testing -> getAllProductsTesting
```

---

# [Rest API #5: Introduction to MongoDB & Mongoose || Connect Backend to Database ](ZwkXyI&ab_channel=ThapaTechnical)

mongoose Connection function
```js
mongoose.connect(uri, options, callback)
```

Added `db/connect.js`
```
server
├── controllers
|       └── products.js 
├── db
|       └── connect.js  
├── routes
|       └── products.js  
└── app.js
```

Connect MonogoDB using its framework mongoose in `dp/connect.js` using mongoose
```js
// import mongoose
connect mongoose = require("mongoose");

uri = "mongodb+srv://thapa:myPassword@thapaapi.mi9m8rx.mongodb.net/ThapaAPI?retryWrites=true&w=majority"; // replace with the uri of your database

const connectDB = ()=>{
	console.log("connect db");
	return mongoose.connect( uri, {   
		// option
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
};

module.exports = connectDB;
```

Import `db/connect.js` and use `connectDB()` in `App.js`
```js
...
// import connectDB
const connectDB = require("./db/connect.js");

// Express Logic.....

const start = async() => {
	try{
		await connectDB(); // this connect will return promise
		app.listen(PORT, () => {
			console.log(`${PORT} Yes I am connected`);
		});
	} catch (error) {
		console.log(error),
	}
}
```

Note:
- `async` and `await` are used to handle asynchronous operations in JavaScript in a simpler, more readable way compared to traditional approaches like callbacks or `.then()` chaining with Promises.
- `async` Declares a function that always returns a **Promise**.
- `await` Pauses the execution of the `async` function until the Promise is resolved or rejected. ( Can only be used inside an `async` function.)

`await connectDB`: `await` ensure that the applications only starts listening on the specified port (via `app.listen())` after successfully establishng a connection to the database

**Promises :** A Promise is an object in JavaScript used to handle **asynchronous operations**. It represents a value that may be available now, in the future, or never. It allows you to work with asynchronous code in a clean, manageable way without deeply nested callbacks (callback hell).**
- **States of a Promises:** Pending, Fulfilled and Rejected 
- **Immutable:** Once a Promise is fulfilled or rejected, its state cannot change.
---

# [Rest API #7: Create Schema & Model (Collection & Tables) using Mongoose & Express JS](https://www.youtube.com/watch?v=vUW9DoWwMOE&ab_channel=ThapaTechnical)

Let Our data is like this
```json
{
	"Proudcts":[
		{ 
			"_id" : "9834dsgfw83yrhsf",
			"name" : "iphone",
			"price" : 154,
			"featured" : false,
			"rating" : 4.8,
			"createdAt" : "2022-11-17T11:39:09.640Z",
			"company" : "apple",
			"__v" : 0
		},
		{
			"_id" : "9834dsgfw83djfdkf",
			"name" : "redmi note 9 pro",
			"price" : 115,
			"featured" : false,
			"rating" : 3.5,
			"createdAt" : "2022-11-17T11:39:09.640Z",
			"company" : "xiaomi",
			"__v" : 0
		},
		...
	
	]
}
```

Now We need to define the Schema on models

Added  `models/products.js`
```
server
├── controllers
|       └── products.js 
├── db
|       └── connect.js  
├── models
|       └── products.js  
├── routes
|       └── products.js  
└── app.js
```

**Setup Model `models/proudcts.js`:** Define the Schemas or of the Document(Table)
```js
// import mongoose
const mongoose = require("mongoose");

// Make Schema using mongoose `schema()` function
const productSchema = new mongoose.Schema({
 /* Copy past one Sample Document
 		{ 
			"_id" : "9834dsgfw83yrhsf",
			"name" : "iphone",
			"price" : 154,
			"featured" : false,
			"rating" : 4.8,
			"createdAt" : "2022-11-17T11:39:09.640Z",
			"company" : "apple",
			"__v" : 0
		}
 */
})

// Export the model. 
module.exports = mongoose.model("Product", productSchema)
```

**Update :** 
- Remove `""` from field key to make `JSON` format to Object
- Remove `_id` & `__v` , it will be automatically assigned
- Write Attribute or Properties of the field in place of sample value
```js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
			name : {
				type: String,
				required: true, // must be mandatory to enter
			},
			price : {
				type: Number,
				required: [true, "price must be provide"], // mandatory to enter, and error message if not entered
			},
			featured : {
				type: Boolean,
				default: false, // default value
			},
			rating : {
				type: Number,
				default: 5.0,
				},
			createdAt : {
				type: Date,
				default: Date.now(), // Current Date
			},
			company : {
				type: String,
				enum: {
					values: ["apple", "samsung", "dell", "mi"], // only companies out of this list are allowed in our API
					message: `{value} is not supported` // error message if some other value is tried to assign
					},
			},
});

module.exports = mongoose.model("Product", productSchema)
```

Note:
- All attributes of each field are in lowercase `type`, `required`, `default`, `enum`, `message`, `values` in mongoose
- All attributes values are in Capitalize form `String`, `Number`, `Boolean`, `Date` in mongoose
- Export model name should be singular `Procuct` in mongoose `model` function, it will automatic pluralize to `Products` in mongoDB Database 

---

# [Rest API #8: Stored API data (JSON) in Database using Express & Mongoose](https://www.youtube.com/watch?v=RxkgrRzLVhw&ab_channel=ThapaTechnical)

Stored Rest API data (`.json`) to mongoDB

Added  `productDB.js` & `products.json`
```
server
├── controllers
|       └── products.js 
├── db
|       └── connect.js  
├── models
|       └── products.js  
├── routes
|       └── products.js  
├── app.js
├── productDB.js
└── products.json
```

Let our Data is stored in `prodcuts.json` 
```json
[
	{
		"name" : "iphone",
		"price" : 154,
		"featured" : false,
		"company" : "apple",
	},
	{
		"name" : "redmi note 9 pro",
		"price" : 115,
		"company" : "xiaomi",
	},
	...
]
```
- Values that are not present for a product, like rating, Date is Autofill by our `model/product.js` if set default

Setup `productDB.js`
```js
require("dotenv").config();
const connectDB = require("./db/connect"); // import `connect.js`
const Product = require("/models/product"); // import `models/product.js`

// Get data from JSON
const ProductJson = ("./products.json") // Default and Implictly exported

// Below statement was Written inside `App.js` but for simplicty and Indepent, we write here for now : )
const start = async() => {
	try{
		await connectDB(process.env.MONGODB_URL); // connect to database
		console.log("success");
		await Product.create(ProductJSON)
	} catch (error) {
		console.log(error),
	}
};

start();
```

For this Video run the Product.js Independently
```sh
node productDB.js
```

Hurray , Data is stored in MongoDB with Collection name `products` plural automatically