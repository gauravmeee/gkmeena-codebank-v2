
# [React Markdown Editor](https://www.youtube.com/watch?v=x5JdT5KJBzw&pp=ygUVcmVhY3QgbWFya2Rvd24gZWRpdG9y)

This project is a simple Markdown editor built with React. You can write Markdown syntax on the left side, and it will automatically render into an HTML preview on the right side.

### 1. Installation Instructions

Provide clear instructions on how to clone the repository and install dependencies.

```bash
# Clone the repository
git clone https://github.com/your-username/markdown-editor.git

# Navigate to the project directory
cd markdown-editor

# Install dependencies
npm install

# Start the development server
npm start
```

### 2. Features

Highlight the key features of your Markdown editor to showcase its functionality.

- **Live Preview:** Instantly see the rendered Markdown as you type.
- **Syntax Highlighting:** Code blocks are automatically highlighted according to the language specified.
- **Responsive Design:** The editor adjusts to different screen sizes.
- **Customizable:** Easily switch syntax highlighting themes by modifying the code.

### 3. Usage

Provide an example of how to use the editor, including some common Markdown syntax.
```markdown
# This is a Heading

You can write **bold** text, _italicized_ text, or `inline code`.

```javascript
// This is a code block in JavaScript
function greet(name) {
    return `Hello, ${name}!`;
}
```

For More  you can learn from [Markdown documentation](https://www.markdownguide.org/getting-started/)

---

### 18. Future Enhancements

Mention any features or improvements you plan to add in the future.

```markdown
## Future Enhancements

- **Save and Load Files:** Allow users to save their Markdown as a file or load Markdown files into the editor.
- **Dark Mode:** Add a toggle for dark mode to make the editor more comfortable to use in low-light conditions.
- **Plugins:** Support for additional plugins to extend the editor's functionality.
```

---
# Steps to Create the Basic Markdown Editor

### 1. Setup Your React App
Create a new React application using `create-react-app`:
```bash
npx create-react-app markdown-editor
```

### 2. Install Required Packages

#### React Markdown
To render Markdown content, install the [React Markdown](https://www.npmjs.com/package/react-markdown) package:
```bash
npm install react-markdown
```

#### React Syntax Highlighter
To add syntax highlighting for code blocks in your Markdown, install the [React Syntax Highlighter](to highlight according to coding languages) package:
```bash
npm i react-syntax-highlighter
```

### 3. Create the Basic Layout in `App.js`

In the `App.js` file, start by setting up a basic structure with a text area for input and a `ReactMarkdown` component for rendering the Markdown preview.

```js
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';

export default function App() {
    return (
        <div className="App">
            <textarea className="textarea" />
            <ReactMarkdown className="markdown" />
        </div>
    );
}
```

### 4. Style the Components with CSS

Use Flexbox to divide the screen into two halves, with the text area on the left and the Markdown preview on the right.

```css
/* App.css */
.App {
    display: flex;
}

.textarea {
    width: 50%;
    height: 100vh;
    padding: 20px;
    font-size: 2rem;
    outline: none;
}

.markdown {
    width: 50%;
    height: 100vh;
    padding: 20px;
}
```

### 5. Add State and Event Handling in `App.js`

Add a state to manage the input from the text area and update the Markdown preview as the user types.

```js
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';

export default function App() {
    // State to store the input from the textarea
    const [input, setInput] = useState('');

    return (
        <div className="App">
            <textarea
                autoFocus
                className="textarea"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <ReactMarkdown source={input} className="markdown" />
        </div>
    );
}
```

### 6. Add Syntax Highlighting to Code Blocks

To highlight code blocks according to their respective languages, integrate `react-syntax-highlighter` into the `App.js` file.

First, choose a style from the available options, such as `docco`, `prism`, etc., and import it into your project.

```js
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeBlock = ({ value, language }) => {
    return (
        <SyntaxHighlighter language={language ?? null} style={docco}>
            {value ?? ''}
        </SyntaxHighlighter>
    );
};
```

### 7. Integrate Syntax Highlighter in `App.js`

Modify the `ReactMarkdown` component to use the custom `CodeBlock` component for rendering code blocks with syntax highlighting.

```js
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './App.css';

export default function App() {
    const [input, setInput] = useState('');

    return (
        <div className="App">
            <textarea
                autoFocus
                className="textarea"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <ReactMarkdown
                className="markdown"
                source={input}
                renderers={{
                    code: CodeBlock,
                }}
            />
        </div>
    );
}

// Custom component for rendering code blocks with syntax highlighting
const CodeBlock = ({ value, language }) => {
    return (
        <SyntaxHighlighter language={language ?? null} style={docco}>
            {value ?? ''}
        </SyntaxHighlighter>
    );
};
```
