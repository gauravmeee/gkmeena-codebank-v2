
## Node and NPM version

```sh
node -v 
npm -v
```

---

## Node Package Manager (npm)

`npm`  is a package manager for JavaScript, primarily used to manage dependencies for Node.js projects. It allows you to install, update, and uninstall packages, as well as manage your project's dependencies.

*Note:* installing `Node` automatically install `npm`

**Project Initialization:** Initialize a new Node.js project and create a `package.json` file
```sh
# intialize a new project
npm init
npm init -y # -y(optional) -> yes all prompts
```

**Package Installation:** Install all dependencies listed in `package.json`
```sh
# install all dependencies from package.json
npm install

# Install package
npm i package_name # i -> install
#or
npm install package-name

# Install multiple package
npm install package-name1 package-name2

# Install a package globally
npm install <package-name> -g

# add it to `devDependencies` in package.json.
npm install <package-name> --save-dev # Install Devlopment Dependencies

# install a specific version
npm install package-name@version
```

**Updating Packages:** Update all packages to the latest version according to the `package.json` version range.
```sh
# upgrade all dependencies
npm update

# update package
npm update package-name
```

**Package Removal:** Install a Specific package and remove it from `dependencies` in `package.json`
```sh
# unistall
npm uninstall package-name

# Uninstall a package from `devDependencies`
npm uninstall package-name --save-dev

# Uninstall a globally installed package
npm uninstall -g package-name
```

**Running Scripts:** Run a script defined in the `scripts` section of `package.json`
```sh
# Executes custom scripts from `package.json`
npm run script-name #  npm run build

# execute predifned commands
npm script_name  #  npm start, npm test

# Run `app.js` manually
node src/app.js
```
`package.json`
```
{ "scripts": { "start": "node src/app.js", "build": "webpack", "test": "jest" } }
```

**Viewing Packages**: List all installed packages and their dependencies.
```sh
# List installed packages
npm list

# list all globally installed packages
npm list -g

# view outdated packages
npm outdated
```

*Note:* 
- Dev dependencies are packages that are only needed during the development of a project, not in the production environment.
- `npm start` is a shorthand of `npm run start` to run the `start` script defined in `package.json`.
- It is not necessary to share the `node_modules`. All dependencies in this folder are already specified in you `package.json` and `package-lock.json`(or yarn.lock)
- `npm install --save` Installs the package and adds it to the `dependencies` section of your `package.json` file. but now `--save` flag* is Redundant since npm 5, as `npm install` automatically updates `package.json` with `dependencies`.


**Miscellaneous:**
```sh
# Run a security audit of your project's dependencies.
npm audit

# Automatically fix vulnerabilities found by npm audit.
npm audit fix
 
# Clear npm's cache.
npm cache clean --force

# Set an npm configuration key to a value.
npm config set <key> <value>

# Get the value of an npm configuration key.
npm config get <key>

# Display help information for npm commands.
npm help: 
```

**`-` vs `--`**
- `-`  : indicates a shorthand flag or option:
```sh
npm install -g # Installs a package globally 
npm run build -s # Silences the output
```

- `--` : Used to pass arguments to scripts defined in `package.json`
```sh
npm run dev -- --port 3000 # Passes --port 3000 to the dev script
npm install some-package --save-dev # Long-form flag equivalent to -D
```

---
## Express Setup

```sh
# Create an new project directory
mkdir my-express-app
cd my-express-app

# Initialize Node.js Project
npm init -y

# Install Express
npm install express

# run the server
node index.js

# install and start nodemon for autostart
npm install --save-dev nodemon
npm run dev

# Install MongoDB Client (ex mongoose)
npm install mongoose
```

---
## React Setup

```sh
# install create-react-app globally
npm i -g create-react-app
create-react-app my-app
        #or
# Create New react project (npm version >5)
npx create-react-app my-react-app

# create a new React application in the current directory
npx create-react-app .

# go to directory
cd my-react-app

# run the app
npm start
```

Note: 
- `npx` is a tool (that come with npm v5.2.0 & above) to execute packages. It allows you to run Node.js commands without globally installing the package. It is useful for running CLI tools and one-off commands.
- `create-react-app` automatically installs the latest versions of `react` and `react-dom` in your project, along with other necessary dependencies like `react-scripts`.

---
### React-Native Setup
```sh
# Create a new react-native project
npx react-native init ProjectName

# run the app
npx react-native start 

# run in android
npx react-native run-android
```

---
### Vite Setup

`Vite` is a modern frontend build tool that provides a faster and more efficient development experience for web applications
Vite works seamlessly with `React, Vue, and Svelte.`

**Create a new Vite Project/app**
```sh
# Creates a new Vite project
npx create-vite@latest
# or
npm create vite@latest
# or
yarn create vite
# >> name of project & framework entered when prompted.
```

**Creates a new Vite project in a folder named `myApp`.**
```sh
npx create-vite@latest myApp # preffered
#
npm create vite@latest myApp
#
yarn create vite myApp

# >> these  will prompt you to choose a framework and variant (e.g., React, Vue, Svelte, etc.).
```

**Create a new Vite project in folder named `myApp` and with `react` Template**
```
npx create-vite@latest myApp # preffered -- --template react
```


**Older way to Initialize Vite project in folder named `myApp` (with react template)**
```sh
# Creates a new Vite project in a folder named `my-project` with the React template.
npm init vite@latest my-project -- --template react

# go to directory
cd my-project

# Install required packages 
npm install
```

*Note :* You can install vite explicitly using
`npm install vite` even with `-g` or `--save-dev` options

Difference between  `npm init` & `npm create` & `npx create` in vite
- `npm init vite` - Older syntax used to initialize a project with `create-vite`.
- `npm create vite` - Similar to `npx`, but explicitly invokes the `create-vite` package as an npm initializer script.
- `npx create vite` - Executes the `create-vite` package directly without needing to install it globally or locally.

---
### Dotenv Setup

The `dotenv` package reads environment variables from a `.env` file located in the root of your project and loads them into `process.env`, making them available throughout your application.

Install `dotenv`
```sh
npm install dotenv
```

Create `.env` File
```.env
PORT=3000 MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mydatabase JWT_SECRET=your_jwt_secret_key
```
*Note:* If using local mongodb `MONGO_URI=mongodb://localhost:27017/your-database-name`

Load and Access the Environment variable
```javascript
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env file

// Now you can access environment variables
const mongoUri = process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET;
const port = process.env.PORT || 3000;
```

Add `.env` to `.gitignore` to protect sensitive information.
```.gitignore
.env
```
---
### Nodemon Setup

`nodemon` is a tool that automatically restarts your Node.js application when it detects file changes. This is particularly useful during development

```sh
# install nodemon
npm install --save-dev nodemon

# start your application
nodemon index.js

# scripts{"dev":"nodemon index.js"}
npm run dev 
```
*Note :* install with `--save-dev` is recommended for project-specific use rather than `-g` option
