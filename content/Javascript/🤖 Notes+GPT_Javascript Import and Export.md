
#### ES6 Syntax (`.mjs`)

- **Default Import/Export**
```js
// Export
export default ComponentDefault;

// import
import ComponentDef from './component'; // 'ComponentDef' can be any name.
```

- **Named Import/Export**
```js
// Export
export  {component1, component2};

// import
import {component, component2} from './component';
```

---
#### Common JS Syntax (`.js`)`

- **Default Import/Export**
```js
// Export
module.exports = ComponentDefault};

// import
const ComponentDef = require('./component'); // 'ComponentDef' can be any name.
```

- **Named Import Export :**
```js
// Export
module.exports = {component1, component2};

// import
const {component1, component2} = require('./component');
```

---

#### **`require` vs `import` **

|Feature|`require` (CommonJS)|`import` (ES Modules)|
|---|---|---|
|**Syntax**|`const module = require('module')`|`import module from 'module'`|
|**Context**|CommonJS (CJS)|ES Modules (ESM)|
|**Usage In**|Node.js (default)|Modern JavaScript (Browsers, Node.js with `"type": "module"`)|
|**Loading Type**|**Synchronous** (blocks execution until module loads) ⭐|**Asynchronous** (supports `import()` for dynamic loading) ⭐|
|**Static Analysis**|**No** (Cannot be optimized at compile time)|**Yes** (Allows tree-shaking & optimization)|
|**Dynamic Import**|**Yes** (Can be used inside functions)|**Yes** (`import()` is available)|
|**Top-Level Usage**|Can be used anywhere (inside functions, conditionally)|Must be at the top-level (except dynamic `import()`)|
|**Default Export Handling**|`module.exports = value;`|`export default value;`|
|**Named Export Handling**|`module.exports = { val1, val2 };` (Object Destructuring)|`export { val1, val2 };` (Direct Import)|
|**Tree Shaking**|**No** (Loads everything, even unused exports)|**Yes** (Only imports used code) ⭐|
|**File Extension**|`.js`|`.mjs` or `.js` (with `"type": "module"`)|
|**Support in Node.js**|Default support|Requires `"type": "module"` in `package.json` or `.mjs` extension|
|**Module Execution**|Runs immediately when required|Deferred execution (module graph is analyzed first)|


---

#### `ES6` Default vs Named Export

**default exports** are specific to **ES Modules (ESM)** and do not exist in **CommonJS (CJS)**.

|Feature|Default Export|Named Export|
|---|---|---|
|**Definition**|Exports a single value per module|Exports multiple values per module|
|**Syntax**|`export default value;`|`export { value1, value2 };`|
|**Declaration**|Can be declared inline or later|Each export must be explicitly named|
|**Number of Exports**|Only one per module|Multiple per module|
|**Import Syntax**|`import anyName from './module';`|`import { value1, value2 } from './module';`|
|**Import Naming**|Can use any name|Must match exported names (unless using aliases)|
|**Aliasing**|Implicitly allows renaming|Requires `as` keyword (`import { value1 as alias }`)|
|**Use Case**|Best for exporting a single main function, class, or object|Best for utility functions, constants, or multiple exports|
- **Default export**: Imported without curly braces.
- **Named export**: Imported with curly braces and the exact name.

---
#### Example `default + {named Exports}`

- **Export**
```javascript
// defining Function+ export default
export default function add(a, b) {
  return a + b;
}

// defining Function + named export
export function multiply(a, b) {
  return a * b;
}

// defining Variable
export const PI = 3.14;

// defining Function
function sub(a, b){ 
	return a-b; 
}

// export function
export sub;
```
- **Import**
```javascript
// app.js
import add, { multiply, PI, sub } from './math.js';
```

