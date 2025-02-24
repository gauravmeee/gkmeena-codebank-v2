
# [MongoDB Tutorial in 1 Hour (2024) 🍃](https://www.youtube.com/watch?v=J6mDkcqU_ZE&ab_channel=CodeWithHarry)
Manual 👉 [MongoDB Manual](https://www.mongodb.com/docs/manual/crud/)

- MongoDB is a document based Database, i.e. store database in form of Document


to MongoDB comparison:

|**Relational DB**|**MongoDB**|**Description**|
|---|---|---|
|**Database**|**Database**|A collection of related data stored in one place.|
|**Table**|**Collection**|A grouping of related data (like a table in SQL).|
|**Row**|**Document**|An individual record in the collection.|
|**Column**|**Field**|A key-value pair within a document.|
- documents are like Javascript objects
- Mongodb can be used with any programming language

---

#### MongoDB Products

1. <ins>MongoDB Shell</ins>: A command-line interface to interact directly with MongoDB databases.
2.  <ins>MongoDB Compass</ins>: A GUI tool to visually manage, query, and analyze MongoDB data.
3. <ins>MongoDB Atlas</ins>: A cloud-based service for hosting, managing, and scaling MongoDB databases.

#### Installation MongoDB Community Server

**Mac**
1) Official website > Products > Community Server : Download
 2) extract downloaded file `mongodb-macos--xxx`
 3) in `mongodb-macos-xxx/bin` there are three executive file.
	 1. `install_compass`
	 2. `mongod` : mongo demon (Main file that is useful to process mongodb in pc)
	 3. `mongos`

4) Create Directory where you want to store database let `Users/Harry/db`
5) Open Terminal in `mongod-macos-xxx/bin` folder
6) type `mongod --dbpath /Users/Harry/db`
7) for more help `./mongod --help`

**Window**
1) Official website > Products > Community Server : Download
2) Install the downloaded `MongDBxxx.msi` setup
3) 'Install MongoD as a Service' should be checked, this will allow us to use MongoD anytime without manually starting it every time
4) Restart System (Recommended)
5) Mongodb Compass is automatically installed with Window installer

#### Install Mongodb Compass

- Mongodb Compass is the Main Application used to Perform operations (unlike Terminal), in GUI

Note: In Window's mongodb Community Server , compass is automatically installed ( but if not, then install it manually )

**Mac/Window**

1) Official website > Products > Compass : Download
2) Install the setup
---

# GPT
### JSON vs MongoDB

| **Aspect**               | **JSON**                                                | **MongoDB (BSON)**                                                         |
| ------------------------ | ------------------------------------------------------- | -------------------------------------------------------------------------- |
| **Format Type**          | Text-based, human-readable.                             | Binary, designed for efficient storage and traversal.                      |
| **Data Representation**  | Pure JSON (e.g., `{"key": "value"}`).                   | BSON (Binary JSON) with extended support for types.                        |
| **Supported Data Types** | Limited to basic types (string, number, array, object). | Includes additional types like Date, ObjectId, binary data, etc.           |
| **Size Efficiency**      | Larger in size due to text representation.              | Smaller due to binary encoding and optimized storage.                      |
| **Usage**                | Data exchange (e.g., APIs, config files).               | Data storage and manipulation in MongoDB collections.                      |
| **Example**              | `{"name": "John", "age": 30, "active": true}`           | `{"_id": ObjectId("507f1f77bcf86cd799439011"), "name": "John", "age": 30}` |

### JSON:

- **Quotes Required Around Field Names**:
    - JSON strictly adheres to its specification, which mandates that field names (keys) must be **strings enclosed in double quotes**.
    - Example:
        
        ```json
        {
          "name": "John",
          "age": 30,
          "active": true
        }
        ```
        
- **Purpose**: JSON is designed as a lightweight, text-based data format for structured data exchange.

### MongoDB Shell Representation:

- **Quotes Optional Around Field Names**:
    - In MongoDB's shell, objects are represented using JavaScript object notation, which follows JavaScript syntax rules.
    - JavaScript does not require quotes around field names unless the name contains special characters (e.g., spaces, hyphens).
    - Example:
        
        ```javascript
        {
          name: "John",
          age: 30,
          active: true
        }
        ```
        
- **Purpose**: MongoDB shell uses JavaScript-like syntax for convenience, as it's an interactive environment for developers.

---

### Behind the Scenes:

- When data is stored in MongoDB, it is converted to **BSON** (Binary JSON). BSON retains the structure of JSON, so field names are effectively strings internally.

---

### Key Notes:

- JSON field names **must** have quotes (for strict adherence to the JSON standard).
- MongoDB shell allows omitting quotes for simplicity unless the field name has special characters or conflicts with JavaScript reserved words. For example:
    
    ```javascript
    { "first-name": "John", "age": 30 } // Quotes required for "first-name".
    ```

---
### Use MongoDB Compass

**Launch Compass Application**

- It will show Local and Cloud Database on left side, New Connection URI `mongodb://localhost:27016` (Default).
- Click Connect to Connect with the Server `xxx27016`

Note: Compass will only work, if Mongodb server is running in background other wise Error `connect ECONNREFUSED 127.0.0.1:27017`, that means no instance `127.xxx` server is running.

- Now you will able to see your databases in Database Section.

**Create Databases**
- Click on Create Database 
- Enter Database Name let `employee` & Collection Name let `managers`

**Add Data**
- Open Collection `employees.managers`
- Now you can add `objects/documents` Dynamically
- Let Click on `Add Data` > `Insert Document`
```json
{
	"_id":{
		"$oid": "644319dc47........"
	},
	"name": "Rohan",
	"role": "Programmer"
}
```

Note: Like Relational Database, we do not require Schema in collections.
This is The beauty of MongoDB or NoSQL

So next time you need not to follow the structure
- `Add Data` > `Insert Document`

```json
{
	"_id":{
		"$oid": "644319dc47........"
	},
	"name": "Harry",
	"location": "San Francisco"
}
```

Standard connection String Format
```
mongodb://[username:password@]host1[:port1[,...hostN[:portN]][/[defaultauthdb][?options]]
```

Note: Local Host URI is not secured with username and Password

---
In Compass a Document Look like
```json
_id: objectId('644xxxxxxxxx)
item : "canvas"
qty: 100
tags:Array
	0: "cotton"
size: object
	h:28
	w:35.5
	uom: "ch"
```
where
```
_id -> Document/Object unique Id
{} -> object
[] -> Array
"" -> String value
```

---
# MongoDB Commands

#### Setup Commands

To run MongoDB (in Terminal/Shell)
```
mongo sh
```

```sh
show dbs # show all the databases 
use employee # use database named 'employee'
```


**Note:** 
- `use <database>` Create a new database if it is not present
- We can directly reference a database and use functions like `databaseName.collectionName.func({})`. However, using `use <database>` sets the context to that database, allowing us to use the shorthand `db.collectionName.func({})` without explicitly mentioning the database name each time.

### CRUD Operations
 (Run these commands in MongoDB Shell or Terminal )
1. Create : Insert One, Insert Many
2. Read  : Find
3. Update : Update One, Update Many, Replace One
4. Delete : Delete One, Delete Many, Remove

---
Summary
`db.collection.insertOne()` 
`db.collection.insertMany()`
`db.collection.find({..})
`db.collection.findOne()`
`db.collection.updateOne()`
`db.collection.updateMany()`
`db.collection.ReplaceOne()` *
`db.collection.deleteOne()`
`db.collection.deleteMany()`
`db.collection.remove()` *

---
#### Create

**Insert One** `db.collection.insertOne()` 
```js
//  inserts a single document into `inventory` collection
db.inventory.insertOne(
	{item: "canvas", qty:100, tags:["cotton"], size:{h :28, w:35.5, uom:"cm:"}}
)
```

**Insert Many** `db.collection.insertMany()`
```js
//  inserts multiple document into `inventory` collection on , Pass an array of documents to the method.

db.inventory.insertMany(
	[{item: "canvas1", qty:100, tags:["Zinc"]},
	{item: "canvas2", qty:100, tags:["copper"]},
	{item: "canvas3", qty:100, tags:["Aluminium"]}]
)
```

Note: 
- Use `db.collection.insertOne()` in MongoDB shell where `db` refers to the current active database.
- Use `databaseName.collection.insertOne()` in programming contexts to explicitly reference a specific database object.
#### Read

**Find** `db.collection.find({..})
```js
//  Fetch all documents from `inventory` collection

db.inventory.find() // All documents
// or db.inventory.find({})

// WHERE
db.inventory.find({qty:30}) // Where qty=30

// AND
db.inventory.find({status:"A", qty:30}) // Where qty=30 and status = "A"

// OR
db.inventory.find({tags: {$or: ["zinc", "copper"]}}) // Where tags="zinc" or tags="copper

// IN
db.inventory.find({tags: {$in: ["zinc", "copper"]}}) // Where  value of a 'tags' field matches element any element from the array. Same as tags="zinc" or tags="copper

// Less Then
db.inventory.find({status:"A", qty:{$lt:30}}) // where status="A" and qty<`30`
```


```js
// AND
db.inventory.find({$and:[{tags:"copper"}, {tags: "zinc"}]}) // where `tags` is array and contain both `"copper"` and `"zinc"

// ALL (Same as above)
db.inventory.find({tags:{$all:["copper", "zinc"]}}) // where `tags` is array and contain both `"copper"` and `"zinc"
```

**Find One** `db.collection.findOne()`
```js
// retrieves only the first document

db.inventory.findOne({status:{$in:["A", "D"]}}) // where status= "A" or "D"
```

Note: `find()` In terminal give output as java script array. while `findOne()` pull directly a document.

**Query Selectors:** used to filter MongoDB documents effectively

- Basic Match: `{ field: value }` (Exact match)
- Equality: `$eq`, `$ne` (Equal, Not equal)
- Comparison: `$gt`, `$gte`, `$lt`, `$lte`
- Inclusion: `$in`, `$nin` (In/Not in array)
- Logical: `$and`, `$or`, `$not`, `$nor`
- Existence: `$exists` (Field exists or not)
- Type: `$type` (Field type)
- Regex: `$regex` (Pattern match)
- Array: `$elemMatch`,  `$size` (Match array elements, Array length)

#### Update

**Update One `db.collection.updateOne()`**
```js
// Update the First documennt.

db.inventory.updateOne(
{ item: "paper" }, // Where item = "paper"
$set: { "size.uom": "cm", status:"P"}, // <- Set to 
$currentDate: {lastModified: true } // $currDate set the lastModified field to Current Date.
```
Note: During updated, if field is not exist, it will create the field and add the entry.

**Update Many** `db.collection.updateMany()`
```js
// Update the First documennt, based on specified condition
db.inventory.updateMany{
	{"qty":{$lt: 50}}, // Where qty < 50
	{
		$set: {"size.uom" : "in", status: "P"}, // <- Set to 
		$currentDate: { lastModified: true}
	}
}
```

**Replace One** `db.collection.ReplaceOne()`
```js
// Replaces a single document withing the collection base on the filter
db.collection.replaceOne{
	<filter> // document
	<replacement>, // document
	{
		upsert: <boolean>, // boolean
		writenConcern: <document>,
		collation: <document>,
		hint: <document | string>
	}
}
```

#### Delete

**Delete Many `db.collection.deleteMany()`
```js
// Delete all documents that match a specified filter.
db.inventory.deleteMany({})

db.inventory.deleteMany({status : "A"}) // where status="A"

```

**Delete One** `db.collection.deleteOne()`
```js
// Delete at single first document that match a specified filter.
db.inventory.deleteOne()

db.inventory.deleteOne({status : "A"}) // where status="A"
```

Note:
- When a document is deleted, the entry for that document in the index is marked as deleted but the index structure itself is not removed immediately.

**Remove** `db.collection.remove()`
```js
// Delete a single document or all documents that match a specified filter.
```

Note: `remove` return the document, while `delete` return `boolean` 1, if founds and delete the document. 

Differ


### More Operations

**Sort**  `db.collection.find().sort()`
```js
// Sort the output
db.inventory.find().sort({qty:1}) // Ascending of 'qty'
db.inventory.find().sort({qty:-1}) // Descending of 'qty'
```

**Skip**  `db.collection.find().skip()`
```js
db.inventory.find().skip(2) // skip first 2 document
```

**Limit**  `db.collection.find().limit()`
```js
db.inventory.find().limit(3) // Limits the no. of document's output to 2
```

---
#### Example of using MongoDB for Paging in Blog

```js
// Show 8 blogs per page
db.blogs.find().skip((PageNo-1)*8).limit(8)

// Page 1 : skip (1-1)*8=0, limit 8  : blog no. 1-8
// Page 2 : skip (2-1)*8=8, limit 8 : blog no. 9-16
// Page 2 : skip (3-1)*8=16, limit 8 : blog no. 17-24
```

---
## MongoDB Atlas

- It is a MongoDB on the cloud
- Atlas is a managed service, and we don't require to deploy/Install mongodb anywhere
- **Cluster**: A group of servers (nodes) that work together to host data and provide high availability and scalability. In MongoDB Atlas, a cluster consists of multiple database servers for redundancy and distribution.
#### Steps to Use
1. Create a account and Login
2. Create Cluster
	1. Go to `Database` Page, through Left side Panel Option
	2. Click on `+CREATE` , to Create a new Cluster
	3. Choose `Shared Cluster` (out of three Serverless, Dedicated, Shared) to use a Free Cluster
	4. Choose a `Server Location` (Nearest location to user is preferred)
	5. Enter a `Cluster Name`
	6. Click on `Create Cluster`
4. Create a User 
	1. Go to `Database Access` Page, through Left side Panel Options
	2. Click on `+ADD NEW DATABASE USER
	3. Choose `Password Authenticaton`
	4. Enter `User Name` and `Password`
	5. Click on `Add User`
5. Connect Database
	1. On `Database` Page, Click on `Connect` button corresponding to the cluster you want to connect
	2. You can Connect the Cluster with  your Flask, Nodejs etc. using `Driver` Option
	3. You Can also Access through Compass, Shell, VS Code etc.
6. Connect with Compass
	1. Let click on `Compass`, choose the version of your local Compass
	2. Copy the `connection string`
	3. `mongodb+srv://<username>:<password>@<cluster-url>/<database>`
	4. Replace the placeholders as follows
		- `<username>`: Your MongoDB Atlas username.
		- `<password>`: Your MongoDB Atlas password.
		- `<cluster-url>`: The cluster URL provided by Atlas (e.g., `cluster0.mongodb.net`).
		- `<database>`: The specific database you want to connect to (optional; you can also leave it empty to connect to the default).
	5. Find Your Password through corresponding `user` from `Database Access` Page
	6. `mongodb+srv://gaurav28official:gk123@MyNotes.d8ustvt.mongodb.net/mernNotes`
	7. Use this string as `URI` in your Local Compass app to Connect

Hurray, You Can access your cloud database through Compass : )

Note: in free Plan you can Create one cluster at a time, to make a new one, you need to terminate the existing cluster

---
## Aggregation Pipeline in MongoDB

The aggregation pipeline in MongoDB is a powerful framework for data aggregation operations, similar to SQL's `GROUP BY` and aggregate functions. It allows you to process and transform documents in a collection through a series of stages. Each stage performs an operation on the data, such as filtering, grouping, or transforming, and passes the result to the next stage in the pipeline.

**Common Aggregation Stages:**
1. **`$match`** - Filters documents by specified criteria (like `WHERE` in SQL).
2. **`$group`** - Groups documents by a specified field and performs calculations, like `SUM`, `AVG`, `COUNT`, etc.
3. **`$sort`** - Sorts documents by specified fields.
4. **`$project`** - Reshapes documents, including or excluding fields.
5. **`$limit` and `$skip`** - Limits or skips a certain number of documents.

**Example:**
To find the total sales amount grouped by each product category, the pipeline might look like this:

```javascript
db.sales.aggregate([
   { $match: { status: "completed" } },
   { $group: { _id: "$category", totalSales: { $sum: "$amount" } } },
   { $sort: { totalSales: -1 } }
])
```

This example:
1. Filters completed sales.
2. Groups by `category` and sums the `amount` for each.
3. Sorts by `totalSales` in descending order.

---
>More
### Indexes in MongoDB

   - Indexes are special data structures that improve the speed of data retrieval operations on a collection. They work like an index in a book, allowing MongoDB to find documents more quickly based on the values of indexed fields.
   - An index is essentially a data structure (often a B-tree) that maps the values of indexed fields to the corresponding document IDs (or pointers) in the collection.
   - The note about delete operations and indexes in MongoDB refers to how MongoDB handles indexes when documents are deleted from a collection. Here's what it means:
