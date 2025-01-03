---
slug : react-project-cardsui-tutorial-notes
---

# [How to Create React Card UX Component with Bootstrap - React Project](https://youtu.be/rH9jM-8hAD8)

## 1. Set Up the React App

**Create a new React application:**
```bash
npx create-react-app my-cards
```
This command initializes a new React project in a directory named `my-cards`.

## 2. Directory Structure

Create the following directory structure inside `src`:
```
src
 |-- Cards
    |--- CardUI.jsx
    |--- Cards.jsx
    |--- card-style.css
|--- index.js
```
- **`CardUI.jsx`**: Contains the UI component for a single card.
- **`Cards.jsx`**: Contains the component that renders multiple cards.
- **`card-style.css`**: Contains custom styles for the card components.
- **`index.js`**: The entry point of the React application.

## 3. Install Necessary Packages

**Install Bootstrap for styling:**
```bash
npm install bootstrap@latest
```
This command installs the latest version of Bootstrap to style your React components.

**Install Webpack service worker plugin:**
```bash
npm install serviceworker-webpack-plugin
```
This plugin helps in setting up service workers for offline capabilities.

## 4. Card Component (`CardUI.jsx`)

```jsx
// CardUI.jsx

import React from 'react'; // Import React library
import './card-style.css'; // Import custom styles

const Card = (props) => {
	return (
		<div className="card text-center shadow">
			<div className="overflow">
				<img src={props.imgsrc} alt="Image" className='card-img-top' />
			</div>
			
			<div className="card-body text-dark">
				<h4 className="card-title">{props.title}</h4>
				<p className="card-text text-secondary">
					{props.description}
				</p>
				<a href="#" className="btn btn-outline-success">Go Anywhere</a>
			</div>
		</div>
	);
}

export default Card;
```
- **`import React from 'react';`**: Imports React to create the component.
- **`import './card-style.css';`**: Imports the custom CSS file for styling.
- **`<Card />`**: A functional component that receives `props` for image, title, and description, and displays them within a Bootstrap card.

## 5. Card Container (`Cards.jsx`)

```jsx
// Cards.jsx

import React, { Component } from 'react'; // Import React and Component
import Card from './CardUI'; // Import the Card component

// Import images
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';

class Cards extends Component {
	render() {
		return (
			<div className="container-fluid d-flex justify-content-center">
				<div className="row">
					<div className="col-md-4">
						<Card imgsrc={img1} title="Project 1" description="This is project 1 description" />
					</div>
					
					<div className="col-md-4">
						<Card imgsrc={img2} title="Project 2" description="This is project 2 description" />
					</div>
					
					<div className="col-md-4">
						<Card imgsrc={img3} title="Project 3" description="This is project 3 description" />
					</div>
				</div>
			</div>
		);
	}
}

export default Cards;
```
- **`import React, { Component } from 'react';`**: Imports React and the `Component` class.
- **`import Card from './CardUI';`**: Imports the Card component.
- **`import img1, img2, img3 from '../assets/...';`**: Imports images to be used in cards.
- **`<Cards />`**: A class component that renders multiple `<Card />` components within a Bootstrap grid layout.

## 6. Custom Styles (`card-style.css`)

```css
/* card-style.css */

/* Background gradient for the entire page */
body {
	background: radial-gradient(#e5e5e5, #ffff, #e5e5e5);	
}

/* Card width and hover effect */
.card {
	width: 20rem;
}
.card:hover {
	box-shadow: 5px 10px 20px 1px rgba(0, 0, 0, 0.253) !important;
}

/* Card body padding and text styling */
.card-body {
	padding: 3rem 0 !important;
}
.card-text {
	font-size: 0.9rem;
	padding: 0.4rem 1.9rem;
}

/* Spacing above the card container */
.container-fluid .row {
	padding-top: 6rem;
}

/* Image scale and hover effect */
.card-img-top {
	transform: scale(1);
	transition: transform 0.5s ease;
}
.card-img-top:hover {
	transform: scale(1.5);
}

/* Hide overflow of the image */
.overflow {
	overflow: hidden;
}
```
- **`body { ... }`**: Applies a radial gradient background to the page.
- **`.card { ... }`**: Sets the width of the card and defines a hover effect.
- **`.card-body { ... }`**: Adjusts padding and font sizes inside the card body.
- **`.card-img-top { ... }`**: Defines image scaling and transition effects on hover.
- **`.overflow { ... }`**: Ensures images don’t overflow their container.

## 7. Entry Point (`index.js`)

```js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18+
import './index.css'; // Import global styles
import * as serviceWorker from './serviceWorker'; // Import service worker setup

import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Cards from './Cards/Cards'; // Import the Cards component

// Render the Cards component into the root element
const root = ReactDOM.createRoot(document.getElementById('root')); // Updated for React 18+
root.render(<Cards />);

// Service worker registration (optional)
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```
- **`import React from 'react';`**: Imports React library.
- **`import ReactDOM from 'react-dom/client';`**: Correct import for React 18.
- **`import './index.css';`**: Imports global styles.
- **`import "bootstrap/dist/css/bootstrap.min.css";`**: Imports Bootstrap CSS for styling.
- **`import Cards from './Cards/Cards';`**: Imports the `Cards` component to render.
- **`ReactDOM.createRoot(...).render(<Cards />);`**: Renders the `Cards` component into the root element of the HTML.
- **`serviceWorker.unregister();`**: Unregisters the service worker for offline capabilities.
