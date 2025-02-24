# [Node Js Tutorial in Hindi 🔥🔥](https://youtu.be/BLl32FvcdVM)


**What is NodeJs?**
- An free and open source server environment
- JavaScript can be used on the server
- A single language for both frontend and backend 

```
         |                    |
	     |                    |
Client ---------Request--------->
       <--------Response--------- Server
         |                     |   
         |                     |
```    
- Client -> Show Response Through Frontend
- Server -> Process Request Through Backend
- Backend Languages - `NodeJS`, `PHP`, `Django`, `Flask`, `Rails`

Note:
- Earlier Javascript was only used for frontend, and can only be run on client side.
- NodeJS made it possible to Use javascript at server for building backend

**Setup NodeJS**
1. Download Nodejs [nodejs.org](https://nodejs.org/en/download)
2. Install Nodejs
3. Check Version  by typing `node --version` in any terminal
4. Now You can use `Node.js` Terminal to Run Javascript

**Npm**
- It is Node Package Manager
- It installed by Automatically with NodeJS Installation
- Check version of `npm` by `npm --version`

---
### Let Start

- Open a Directory in Which you want your project
- Create a javascript  `index.js` in a Directory
- Write Javascript inside the file

```
project/
└──  index.js
```

- **Run index.js**
```sh
node index
```

- **Setup NodeJS Project**
```sh
npm init
```
- Prompts will be asked to enter basic details related to the project. 

```
project/
├── index.js
└── package.json
```

**package.json**
- After file `package.json` will be created and will store all information related to project.
- `dependencies` -> Packages used In both Development and Production. ex `express`
- `devDependencies` -> Package used only during Development ex `nodemon`

- **Installing package**
```sh
npm install <package_name> --save #npm i <package_name> --save
```
- `--save` will store the package related information in `package.json`. (optional in npm 5+)

- **Install Package as Dev dependency**
```sh
npm install <package_name> --save-dev
```

- **Uninstall a Package**
```sh
npm uninstall <package_name>
```

```
project/
├── node_modules/
├── package.json
└── package-lock.json
```

**node_modules/**
- After Successful Installation of Package, `node_modules/` directory will be created, and will store all the packages.
- It is not hosted, because it have very big size generally and can be Regenerated, using `npm install`

**package-lock.json**
- Some Dependencies required other Dependencies to function it correctly.
- `pakcage-lock.json` Contains All these Dependencies of Dependencies in package.json

---
### Basic Nodejs

**Create A NodeJS File `index.js`**
```js
// Index.js
console.log("Hello world")
```

**Create Another Node file** `gaurav.js`
```js
// gaurav.js
gaurav = {
	name: "gaurav meena".
	favNum: 3,
	developer: true
}
```

**Import `gaurav.js` in `index.js` **
```js
// Index.js
const grv = require("./gaurav")
...
```

**Export `gaurav` from `gaurav.js` **
```js
...
module.exports = gaurav
```

---
### Module Wrapper Function ⭐

Nodejs Wrap modules in this format
```js
function(exports, require, module, __filename, __dirname)
```
- Whenever a module run in NodeJS, It is wrapped automatically in the this function

Note:
- `--dirname` return the path of current directory of module or file
- `--filename` return the path of current directory of module/file

---
### Import and Export

#### **Common JS** (`.cjs/)

- **Export** `module.exports = functionName`
```js
// ExportCommon.js
function simple(){
	console.log("Simple")
}

module.exports = simple
```
- **Import** `const aliasFunctionName = require("./ModuleName)`
```js
// ImportCommon.js
const simple = require("./ExportCommon")
simple()

```
Note: You can't use `require()` in `mjs` module

#### **ECMA Script (ES6) (`.mjs`)**

- **Export** Multiple Functions `export functionName`
```js
// ExportES6.mjs

// Define and Export Default Function
export default function simple(){
	console.log("simple default")
}

// Define and Export Named function
export function simple1(){
	console.log("Simpl 1")
}

// Define Named function
function simple2(){
	console.log("Simple 2")
}

// Export Named function
export simple2();

module.exports = simple
```

- **Import** `import defaultExport {Named Export} from "./ModuleName"`
```js
// ImportES6.mjs
import defsimple {simple1, simple2} from "./ExportES6.mjs"

simple2()
```
Note: 
- To use ES6 Module in `.js` , set `type ="module"` in `package.json
- One **default export**  per module is possible
- Import Default function without `{}` and Named Function  with `{}`

**Import Named Export** as Alias Name
- during import we can use any name for **default function** `{}` unlike Named Function .  To import named function with alias name use 
```js
import {funcName as aliasFunc Name} from (.'/Module.js')
```

**Import Everything** from a module
```js
import * as mymod from "./ExportES6.mjs"

console.log(mymod.simple())
```


**Node.js Importing Rules:**
1. **Extensions You Can Skip:** - `.js`, `.json`, `.node`
2. **When to Include Extensions:**
    - Custom files (e.g., `.txt`, `.mjs`)
    - Using **`import`** (ESM modules)
3. **Resolution Order:**
    - Exact match → Directory `index.js` → Core modules.
4. In JavaScript, there is no functional difference between `"` (double quotes) and `'` (single quotes). Both can be used interchangeably to represent string literals.

---
### Inbuilt NodeJS Modules

**Node.js Documentation** -> [Nodejs.org/docs](https://nodejs.org/docs/latest/api/)
**Amazing Website to Learn Node.js**[Nodejs.dev](https://nodejs.dev/learn)

#### **Operating System Module**

- Import `os` module
```js
const os = require('os');
```
- Some important `os` Functions
```js
// Return free memory in your pc 
os.freemem()

// Return users Home directory  `C:/Users/Gaurav`
os.homedir()  

//  Return hostname of your computer `DESKTOP-UBQMKH7`
os.hostname

// Return platform of your OS `win32`
os.platform()

// Return releas version of your os `10.0.19042`
os.release()

// Return type of your os `Windows_NT`
os.type()
```


#### **Path Module**

- Import `path` module
```js
const path = require('path');
```
- Some important `path` Functions
```javascript
// Return basename of path i.e 'myfile.html'
path.basename('C:\\temp\\myfile.html')

// Return directory name of path i.e 'C:\temp'
path.dirname('C:\\temp\\myfile.html')

// Return extension of path i.e `.js`
path.extname(__filename)

```

#### **URL Module**
```js
import url from 'url';

const myURL = new URL('https://example.org:8000')
myURL.pathname = '/a/b/c';
myURL.has = '#fgh'

console.log(myURL.href) // 'https://exampte.org:8000/a/b/c?d=e#fgh'

console.log(myURL) // URL {...} 
```

```bash
URL {
	href: 'https://exampte.org:8000/a/b/c?d=e#fgh',
	origin : 'https://example.org:'
	protocol : 'https:',
	username : '',
	password : '',
	host : 'example.org:8000'
	hostname: 'example.org',
	port : '8000',
	pathname : '/a/b/c '
	search: '?d=e'
	searchParams: URLSearchParams { 'd' => 'e'},
	hash: '#fgh'
}
```
#### **File System Module**

- **Import** `fs` module
```js
const fs = require('fs');
```

- **Read File**  (`file.txt`) Asynchronously 
```js
// fs.readFile(path, options, callback)
fs.readFile('file.txt', 'utf8', (err, data) => {
    console.log(err, data); // null indicate no error
});
console.log("Finished reading file");
```
```
- OUTPUT
Finished reading file
null (file.txt content)
```
- NodeJS works on Non-blocking I/O. it does not wait for the file to be read it immediately moves to the next operation (`console.log("Finished reading file");`).
- `fs.readFile()` starts reading the file asynchronously -> "Finished reading file" is printed immediately. -> Once the file is fully read, the callback is executed, printing the file contents.

- **Read File** in Synchronous manner
```js
fs.readFileSync('file.txt')
console.log(a.toString())

console.log("Finished reading file");
```
```
- OUTPUT
(file.txt content)
Finished reading file
```

- **Write File** asynchronously
```js
fs.writeFile('file2txt', "This is a data", ()=>{
	console.log("Written to the file")
})

console.log("Finished reading file")
```
```
- OUTPUT
Finished reading file
Written to the file
```

- **Write File** in Synchronous manner
```js
fs.writeFileSync('file2txt', "This is a data")

console.log("Finished reading file")
```
```
- OUTPUT
Finished reading file
Written to the file
```

**Non-blocking I/O in Node.js**:
- Node.js uses an **event-driven** and **asynchronous** architecture.
-  **`libuv`** is a **C library** that provides **asynchronous I/O** and **event-driven** capabilities for Node.js. It is the core engine responsible for handling non-blocking operations in Node.js.
- When `fs.readFile()` is called, it delegates the file reading task to the `libuv` thread pool.

---
### Event Emitter ⭐

NodeJS Works on **event driven architecture** i.e. You can fire event from anywhere, and If a event is fired you can listen for it

**When to use `EventEmitter`:**
- When you want to **trigger multiple actions** based on specific events.
- Ideal for **asynchronous** and **loosely-coupled** code where different parts of the application respond to the same event.
- Useful for **real-time** systems like handling user input, I/O operations, or API responses.

- **Create an Event Object**
```js
// Import EventEmitter from 'events' module 
const EventEmitter = require('events');

// Creating custom class inherits from built-in EventEmitter class.
class MyEmitter extends EventEmitter {}

// Creating an instance of the 'MyEmitter' 
const myEmitter = new MyEmitter(); 

```

- **Set up  Event listener**
```js
// Setting up an event listener for the 'WaterFull' event.
myEmitter.on('WaterFull', () => {
    
    // logged immediately when 'WaterFull' event is emitted.
    console.log('Please turn off the motor!');
    
    setTimeout(() => {
        
        // This message is logged after a 3-second delay.
        console.log('Please turn off the motor!');
        
    }, 3000); 
});
```

- **Emit Event**
```js
// triggering the 'WaterFull' event, which calls the listener function.
myEmitter.emit('WaterFull'); 
```

---

### HTTP ⭐


- **Import http module**
```js
const http = require('http')
```

- **Create http Server** `createServer()` ⭐
```js
const server = http.createServer((req, res)=>{
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html')
	res.end('<h> Hello </h> <p> hello world! </p>');
	// console.log(req)
})
```

- **Listen Server**
```js
server.listen(8000, ()=>{
	console.log('server is running on port 8000')
});
```

**Request Object**
- You can Check Request by writing `console.log(req)` inside server function. or through Network tab in Browser `(F12)`
- You can Also log items from `req` objects

**HTTP Status Codes**
- 200 - OK
- 500 - Server Error
- 404  - Not Found

**PORT from Environment Variable**
- Fetch port dynamically from environment Variable
```js
const port = process.env.PORT || 2000; // If PORT not set i.e. undefined, then port = 2000
```
- Listen Server Dynamically
```js
server.listen(port, ()=>{
	console.log(`server is running on port ${port}`)
});
```
- Listen Server Dynamically and Give local host url for the website
```js
server.listen(port, ()=>{
	console.log(`server is running on port http://localhost:${port}`)
});

// If Port is `8000`
// it will console `http://localhost:8000`
```


- **To use different response for different Route
```js
const server = http.createServer((req, res)=>{
	...	
	// Respone when result Url is '/'
	if(req.url=='/'){
		res.end('<h1> hello </h1> <p> Hello this is me </p>')
	}
	// Response when Request url is '/about'
	else if(req.url == '/about'){
		res.end('<h1> hello </h1> <p> Hello this is me </p>')
	}
})
```

- **To use Different Status code for Different Route**
```js
const server = http.createServer((req, res)=>{
...
// Move and Set Corresponding status code in each Route block

	if(req.url=='/'){
		res.statusCode = 200; // OK
		res.end('<h1> hello </h1> <p> Hello this is me </p>')
	}
	else if(req.url == '/about'){
		res.statusCode = 200; // OK
		res.end('<h1> hello </h1> <p> Hello this is me </p>')
	}
	// If requested some other URL
	else{ 
		res.statusCode = 404; // Not Found
		res.end('<h1>Not Found</h1> <p>This page was not found on this server</p>')
	}
})
```

- **To Serve HTML file as response**
```js
// Import FS
const fs = require('fs')

const server = http.createServer((req, res)=>{
	...
	// read HTML File
	const data = fs.readFileSync('index.html')
	// response file
	res.end(data.toString());
	...
})
```

Note:
- `res.end()` sends the response to the client and ends the connection.
- If no URL is given, the server treats it as the root route (`'/'`).

- Sometimes, it becomes too time-consuming to write route requests using the above `http` method.
- To write `HTTP` web requests in a better, more convenient, and efficient way, we use `Express`.

---

### **Nodemon**

`nodemon` is a tool that automatically restarts your Node.js application when it detects file changes.

**Why Need Nodemon?**
- When you write error or bug code, the Node.js server may crash.
- It **monitors** your code for changes and **restarts** the server automatically after crashes or updates, saving time during development.

- **Install `nodemon`**
```sh
npm install nodemon
# or 
npm install -g nodemon # install it globally
```

---
### Express

`express` is a Fast, unopinionated, minimalist web framework for Node.js

- **Install `express`**
```sh
npm install express
```

- **Create an Express app** `server.js`
```js
// Import Express
const express = require('express')
const app = express()
const port = 3000

// Route Request at `/` URL
app.get('/', (req, res)=>{
	res.send('Hello World!')
})

// Route Request at `/` URL
app.get('/about', (req, res)=>{
	res.send('This is About Page')
}) 

app.listen(8000, ()=>{
	console.log('Express app listening at port 8000')
})
```

Done Tutorial ✅

---

### **Deploy a Node.js Application on DigitalOcean** (Optional) 


**Step 1: Set Up a DigitalOcean Droplet**
1. Log in to [DigitalOcean](https://www.digitalocean.com/).
2. Create a **Droplet** (choose **Ubuntu** as the operating system).
3. Choose a plan (basic plan is sufficient for small apps).
4. Add your SSH key (for secure access) or use a root password.
5. Launch the Droplet and note down the **IP address**.

**Step 2: Access the Droplet**

1. Open a terminal and connect via SSH:    
    ```bash
    ssh root@your-droplet-ip
    ```
    
2. Update and upgrade packages:
    ```bash
    sudo apt update && sudo apt upgrade -y
    ```
    
**Step 3: Install Node.js and npm**

1. Install Node.js and npm:
    ```bash
    sudo apt install nodejs npm -y
    ```
    
2. Verify installation:
    ```bash
    node -v
    npm -v
    ```
    
**Step 4: Upload Node.js Application**

1. Clone your Node.js project from GitHub:    
    ```bash
    git clone https://github.com/your-repo.git
    ```
    
2. Move to the project directory:
    ```bash
    cd your-repo
    ```
    
3. Install project dependencies:
    ```bash
    npm install
    ```
    
4. Start the application:
    ```bash
    node app.js
    ```
    _(Ensure your app listens on port `3000` or any desired port.)_

**Step 5: Set Up PM2 (Optional for Process Management)**

1. Install **PM2** globally:
    ```bash
    npm install -g pm2
    ```
    
2. Start your Node.js app:
    ```bash
    pm2 start app.js
    ```
    
3. Set PM2 to auto-start on reboot:
    ```bash
    pm2 startup
    pm2 save
    ```
    
**Step 6: Configure Nginx as a Reverse Proxy**

1. Install Nginx:
    ```bash
    sudo apt install nginx -y
    ```
    
2. Create an Nginx configuration file:
    ```bash
    sudo vi /etc/nginx/sites-available/nodeApp
    ```
    
3. Add the following content:
    ```nginx
    server {
        server_name your-droplet-ip;
    
        location / {
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
    ```
    
4. Enable the configuration:
    ```bash
    sudo ln -s /etc/nginx/sites-available/nodeApp /etc/nginx/sites-enabled
    ```
    
5. Test and reload Nginx:
    ```bash
    sudo nginx -t
    sudo systemctl restart nginx
    ```
    

**Step 7: Allow Traffic Through Firewall**

1. Allow HTTP and HTTPS traffic:
    ```bash
    sudo ufw allow 'Nginx Full'
    sudo ufw enable
    ```
    
**Step 8: Access Your Application**

Visit **[http://your-droplet-ip](http://your-droplet-ip/)** in a browser to see your Node.js app running.

✅ **Done! Your Node.js app is now live on DigitalOcean.**

---