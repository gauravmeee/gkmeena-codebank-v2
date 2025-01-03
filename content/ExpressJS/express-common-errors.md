---
title: Errors_Express Solution
---

**Error:** ❌
```sh
D:\gkmee\Downloads\Rest API>node index.js (node:16836) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension. (Use `node --trace-warnings ...` to show where the warning was created) D:\gkmee\Downloads\Rest API\index.js:1 import express from 'express'; ^^^^^^ SyntaxError: Cannot use import statement outside a module at wrapSafe (node:internal/modules/cjs/loader:1350:18) at Module._compile (node:internal/modules/cjs/loader:1379:20) at Module._extensions..js (node:internal/modules/cjs/loader:1518:10) at Module.load (node:internal/modules/cjs/loader:1249:32) at Module._load (node:internal/modules/cjs/loader:1065:12) at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:158:12) at node:internal/main/run_main_module:30:49 Node.js v22.2.0 D:\gkmee\Downloads\Rest API>
```

Solution:

The error you're encountering occurs because you are using the `import` syntax, which is part of ES modules, but Node.js is expecting CommonJS syntax (using `require`) by default.

### Two Ways to Resolve the Issue:

1. Use `require` Syntax (CommonJS)

You can replace the `import` statements with `require` to use CommonJS modules. Modify your `index.js` file like this:
```javascript
const express = require('express');
```


#### 2. Enable ES Modules


- In the same folder as `index.js`, create or edit a `package.json` file and add `"type": "module"`.

```json
{
  "name": "your-app-name",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module", // Add this
  "scripts": {
	"start": "node index.js"
  },
  "dependencies": {
	"express": "^4.17.1"
  }
}
```

---

**Error:** ❌
```
const express = require('express');
                ^

ReferenceError: require is not defined in ES module scope, you can use import instead
This file is being treated as an ES module because it has a '.js' file extension and 'D:\gkmee\Downloads\Rest API\package.json' contains "type": "module". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.
    at file:///D:/gkmee/Downloads/Rest%20API/index.js:2:17
    at ModuleJob.run (node:internal/modules/esm/module_job:262:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:475:24)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:109:5)

Node.js v22.2.0
[nodemon] app crashed - waiting for file changes before starting...
```