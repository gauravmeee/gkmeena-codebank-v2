---
title: Notes_Express Basic Template and dotenv
---

## Express
```js
// import express
const Express = require('express');

// Create Express application object
const app = express();
```


## dotenv `.env`

```js
// import dotenv
const dotenv = require('dotenv');

// Load environment variable from .env
dotenv.config();

// assign environment value to variable from '.env' file's 'PORT:'
const port = process.env.PORT || 3000; // https://localhost:3000
```