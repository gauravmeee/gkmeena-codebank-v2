
## Installation Using Tailwind `CLI` or `PostCSS`

**Step 1: Install Tailwind CSS**

For **CLI**:
```sh
# Install Tailwind CSS
npm install -D tailwindcss

# Create `tailwind.config.js` file
npx tailwindcss init
```

**Step 2: Configure Template Paths**

Update `tailwind.config.js` to include the paths to all your template files:
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"], // Adjust paths as per your project structure
  theme: {
    extend: {},
  },
  plugins: [],
}
```
- `./src/` -> starts from the `src` directory of your project.
- `**/`(glob pattern)  -> search recursively in all subdirectories.
- `*` ->This means any file, regardless of its name.
- `{js,ts,jsx,tsx}` -> defines the file extensions Tailwind should look for.

**Step 3: Add Tailwind Directives to CSS**

Create your main CSS file (e.g., `src/index.css`) and include Tailwind's layers:
```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Step 4: Build Process**

For **CLI**:
```sh
# Scan template files for classes and build your CSS
npx tailwindcss -i ./src/index.css -o ./src/output.css --watch
```

For **PostCSS**: 
```sh
# Install  PostCSS and Autoprefixer
npm install -D  postcss autoprefixer
```

```js
// setup `postcss.config.js`
module.exports = {
  plugins: {
	tailwindcss: {},
	autoprefixer: {},
  },
}
```
    
**Step 5: Include the Generated CSS**

For **CLI**:
```js
import './output.css';
```
or
```html
<head>
  <link href="./output.css" rel="stylesheet">
</head>
```

For **PostCSS**: 
```js
import './index.css';
```
or
```html
<head>
  <link href="./index.css" rel="stylesheet">
</head>
```

---


**Using the Tailwind CLI**
- **`PostCSS` and Autoprefixer are NOT explicitly required** because:
- The Tailwind CLI internally uses `PostCSS` for processing styles, so you don't need to install `PostCSS` manually.
- Autoprefixer is also bundled and applied internally by the Tailwind CLI, meaning vendor prefixes are added automatically without a separate installation.


**Using Tailwind as a `PostCSS` Plugin**
- **`PostCSS` and `Autoprefixer` are explicitly required** because:   
- In this case, `PostCSS` processes the Tailwind directives (`@tailwind base`, `@tailwind components`, etc.), and Autoprefixer ensures browser compatibility by adding vendor prefixes.

---
## [Utility-First Fundamentals](https://tailwindcss.com/docs/utility-first)

- Traditionally, whenever you need to style something on the web, you required to write custom CSS. ❌
- With tailwind CSS, We can use utility classes to build custom designs without writing CSS ✅


Tailwind CSS Advantage
- This approach allows us to implement a completely custom component design without writing a single line of custom CSS.

Advantage over Inline style
- choosing styles from a predefined design system, which makes it much easier to build visually consistent UIs.
- You can’t use media queries in inline styles, 
- Inline styles can’t target states like hover or focus

---
# Tailwind Cheat sheet

Only Important utility classes, and variants are noted, for more check -> [flowbite/tailwind](https://flowbite.com/tools/tailwind-cheat-sheet/)

## 1. LAYOUT

#### Container
Apply the max-width of an element to fix its width to the current breakpoint.

```css
.container {width: 100%}
```
 
 `x-auto` -> center  & `px-*` ->horizontal padding
```html
<div class="container mx-auto px-4">
```

**`sm`, `lg` etc.** -> specific styles at different breakpoints.
```html
<div class="md:container md:mx-auto">
```

#### Box Sizing
Define how the width and height of an element are calculated: should they include padding and borders, or not.
```css
.box-border  {box-sizing: border-box};
.box-content  {box-sizing: content-box};
```

#### Breakpoints
Use the breakpoints (screen sizes) to set how the utility-classes respond according to the device width.

```css
sm: -> @media (min-width: 640px) { ... }
md: -> @media (min-width: 768px) { ... }
lg: -> @media (min-width: 1024px) { ... }
xl: -> @media (min-width: 1280px) { ... }
2xl: -> @media (min-width: 1536px) { ... }
```
#### Display
- Specify the display behavior (the type of rendering box) of an element.

```css
.hidden { display: none; }
.contents { display: contents; }
.list-item { display: list-item; }
.block { display: block; }
.inline { display: inline; }
.flex { display: flex; }
.table { display: table; }
.grid { display: grid; }
```

#### Float
- Place an element on the left or right side of its container, allowing text and inline elements to wrap around it.

```css
.float-right {float: right;}
.float-left {float: left;}
.float-none {float: none;}
```

#### Object Fit
- Set how the content of a replaced element, such as an `<img>` or `<video>`, should be resized to fit its container.

```css
.object-contain {object-fit: contain;}
.object-cover {object-fit: cover;}
.object-fill {object-fit: fill;}
.object-none {object-fit: none;}
.object-scale-down {object-fit: scale-down;}
```

#### Object Position
Specify the alignment of the selected replaced element's contents within the element's box.

```css
.object-center {object-position: center;}
.object-bottom {object-position: bottom;}
.object-left-top {object-position: left top}
```
- similarly `top`, `left`, `right`, `left-bottom`, `right-top`, `right-top`

#### Overflow
Set the desired behavior for an element's overflow — i.e. when an element's content is too big to fit in its block formatting context — in both directions.

```css
.overflow-auto { overflow: auto; }
.overflow-hidden { overflow: hidden; }
.overflow-x-visible { overflow-x: visible; }
.overflow-y-scroll { overflow-y: scroll; }

.overflow-x-auto { overflow-x: auto; }
.overflow-y-hidden { overflow-y: hidden; }
```
- Similarly `visible`, `scroll`, `x-auto`, `x-hidden`, `x-scroll`, `y-auto`, `y-hidden`, `y-visible`, 

Scroll Behavior
```css
.scrolling-touch { -webkit-overflow-scrolling: touch; }
.scrolling-auto { -webkit-overflow-scrolling: auto; }
```

#### Position Behavior
Set how an element is positioned in a document.

```css
.static { position: static; }
.fixed { position: fixed; }
.absolute { position: absolute; }
.relative { position: relative; }
.sticky { position: sticky; }
```

#### POSITION 
Determine the final location of positioned elements.

```css
.inset-0 {top: 0rem; right: 0rem; bottom: 0rem; left: 0rem;}
.inset-x-2.5 {right: 0.625rem; left: 0.625rem;}
.-inset-y-5 {top: -1.25rem; bottom: -1.25rem;}
.inset-x-auto {right:auto; left:auto}
```
- Similarly `-inset-[n]`, `-inset-x-[n]`, `inset-y-[n]`

```css  
.top-1/4 {top: 25%;}
.-right-24 {right: -6rem;}
.left-full {left: 100%; }
```
- Similarly `-top-[n]`, `bottom-[n]`, `-left-[n]`....
-  `x/y` direction, `t/b/l/r` sides, `+/-` Value, `4xn` -> `1 rem`
- `4 * [n]` -> `1 rem`
- **Values `[n]` range  from 0-96 in increments:** 0, 0.5, 1, 1.5, 2, 2.5, 3-16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96
- **Fractional `[n]` values :** 1/2 (50%), 1/3 (33.33%), 2/3 (66.67%), 1/4 (25%), 3/4 (75%), full (100%)
- **Special Value:** Auto, Full (100%), 

#### Visibility
Show or hide an element without changing the layout of a document

```css
.visible {visibility: visible;}
.invisible {visibility: hidden;}
```

#### Z-index
Set the z-order of a positioned element and its descendants or flex items.

```css

.z-0 {z-index: 0;}
.z-10 {z-index: 10;}
.z-auto {z-index: auto;}
```
- **Values :**  0, 10, 20, 30, 40, 50, auto
## 2. FLEXBOX

#### Display
Set how a flex item will grow or shrink to fit the space available in its flex container.

```css
.flex {display: flex;}
.inline-flex {display: inline-flex;}
```

#### Flex Direction
Set how flex items are placed in the flex container defining the main axis and the direction (normal or reversed)

```css
.flex-row { flex-direction: row; }
.flex-row-reverse { flex-direction: row-reverse; }
.flex-col { flex-direction: column; }
.flex-col-reverse { flex-direction: column-reverse; }
```

#### Flex Wrap
Set whether flex items are forced onto one line or can wrap onto multiple lines.

```css
.flex-nowrap { flex-wrap: nowrap; }
.flex-wrap { flex-wrap: wrap; }
.flex-wrap-reverse { flex-wrap: wrap-reverse; }
```

Set how a flex item will grow or shrink to fit the space available in its flex container.
```css
.flex-1 { flex: 1 1 0%; }
.flex-auto { flex: 1 1 auto; }
.flex-initial { flex: 0 1 auto; }
.flex-none { flex: none; }
```

#### Flex Grow
Set the flex grow factor of a flex item's main size.

```css
.flex-grow {flex-grow: 1;}
.flex-grow-0 {flex-grow: 0;}
```

#### Flex Shrink
Set the flex shrink factor of a flex item.

```css
.flex-shrink {flex-shrink: 1;}
.flex-shrink-0 {flex-shrink: 0;}
```


#### Order
Set the order to lay out an item in a flex or grid container.

```css
.order-first {order: -9999;}
.order-last {order: 9999;}
.order-none {order: 0;}
.order-5 {order: 5;}
```
**Values Range :** 1-12
## 3. GRID

## 4. SPACING

#### Padding
Set the padding area of an element on all sides, vertically, horizontally, or just on one side.

```css
.p-0 {padding: 0rem;}
.-px-2 {padding-left: 0.5rem; padding-right: 0.5rem;}
.pt-px {padding-top: 1px;}
```
- Similarly `py`, `pb`, `pl`, `pr`
-  `x/y` direction, `t/b/l/r` sides, `+/-` Value, `4xn` -> `1 rem`
- **Values `[n]` range  from 0-96 in increments:** 0, 0.5, 1, 1.5, 2, 2.5, 3-16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96

#### Margin
Set the margin area of an element on all sides, vertically, horizontally, or just on one side.

```css
.m-0 { margin: 0rem; } 
.mx-2 { margin-left: 0.5rem; margin-right: 0.5rem; } 
.mt-px { margin-top: 1px; }
```
- Similarly `my`, `mb`, `ml`, `mr`
-  `x/y` direction, `t/b/l/r` sides, `+/-` Value, `4xn` -> `1 rem`
- **Values `[n]` range  from 0-96 in increments:** 0, 0.5, 1, 1.5, 2, 2.5, 3-16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96

#### Space Between
Control the space between child elements using margins.

```css
.space-x-0 { margin-left: 0; margin-right: 0; }
.-space-y-14 { margin-top: -3.5rem; margin-bottom: -3.5rem; }
.space-y-reverse { flex-direction: column-reverse; }
```
- Similarly `space-x-reverse
-  `x/y` direction, `+/-` Value, `4xn` -> `1 rem`
- **Values `[n]` range  from 0-96 in increments:** 0, 0.5, 1, 1.5, 2, 2.5, 3-16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96
## 5. TYPOGRAPHY

- fonts-sans : 

#### Font size

```css
text-xs { font-size: 0.75rem; line-height:1rem;}
text-sm {font-size: 0.875re; line-height: 1.25rem}

```

## 6. SIZING

## 7. BACKGROUNDS

## 8. BORDERS

## 9. EFFECTS

## 10. TABLES

## 11. TRANSFORMS

## 12. FILTERS

## 13. SVG

## 14. TRANSITIONS AND ANIMATION

## 15. INTERACTIVITY

## 16. BOX ALIGNMENT


---

### [Handling Hover, Focus, and Other States](https://tailwindcss.com/docs/hover-focus-and-other-states)

Tailwind includes modifiers for just about everything you’ll ever need, including:

- **Pseudo-classes** -> `:hover`, `:focus`, `:first-child`, and `:required`
- **Pseudo-elements** -> `::before`, `::after`, `::placeholder`, and `::selection`
- **Media and feature queries** ->  responsive breakpoints, dark mode, and `prefers-reduced-motion`
- **Attribute selectors** ->  `[dir="rtl"]` and `[open]`

##### Hover, focus, and active :

`hover` : Mouse cursor is over the element.
`active` : Mouse click or touch is pressed down.
`focus` : Element is selected via click or keyboard.

>Tailwind also includes modifiers for other interactive states like `:visited`, `:focus-within`, `:focus-visible`, and more.

Software engineer -
frontend - 
backend
##### First, last, odd, and even

`first` : Targets the **first child** of a parent element.
`last` :  Targets the **last child** of a parent element.
`odd`: Targets **odd-numbered** children in a parent element.
`even`: Targets **even-numbered** children in a parent element.


>Tailwind also includes modifiers for other structural pseudo-classes like `:only-child`, `:first-of-type`, `:empty`, and more.

##### Form states

`required` : Targets form elements that have the `required` attribute.
`invalid` : Targets form elements that are **invalid** based on HTML5 validation.
`disabled`: Targets form elements that are **disabled** (i.e., elements that are not interactive and cannot be focused or changed).

##### Styling based on parent state (group-{modifier})

- `group` - style an element based on the state of some _parent_ element, 
- mark the parent with the `group` class, and use `group-*` modifiers like `group-hover` to style the target element:
- This pattern works with every pseudo-class modifier, for example `group-focus`, `group-active`, or even `group-odd`.

##### Styling based on sibling state (peer-{modifier})

- `peer` : style an element based on the state of a _sibling_ element, 
- mark the sibling with the `peer` class, and use `peer-*` modifiers like `peer-invalid` to style the target element:
- This pattern works with every pseudo-class modifier, for example `peer-focus`, `peer-required`, and `peer-disabled`.
- Note: `peer` marker can only be used on _previous_ siblings because of how the subsequent-sibling combinator works in CSS.
