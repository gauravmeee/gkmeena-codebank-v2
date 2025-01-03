---
slug : react-project-notes-app-tutorial-notes
---

# [# Build a Notes App with React.js for Beginners (James Grimshaw)](https://www.youtube.com/watch?v=ulOKYl5sHGk&ab_channel=JamesGrimshaw)

### Step 1 : Create Sidebar and Main Component

**Create** `src/components/Sidebar.js`
```jsx
import React from 'react';

const Sidebar = () => {
  return (
    // Sidebar
    <div className="app-sidebar">  
      {/* Section 1: Sidebar Header */}
      <div className="app-sidebar-header">  
        <h1>Gkmeena Notes</h1>
        <button>Add</button>
      </div>
      {/* Section 2: Sidebar Notes */}
      <div className="app-sidebar-notes">
        <div className="app-sidebar-note">
          {/* Section 2.1: Sidebar Notes Title */}
          <div className="sidebar-note-title">  
            <strong>Title</strong>
            <button>Delete</button>
          </div>
          {/* Section 2.2: Sidebar Notes Preview */}
          <p>Note Preview</p>
          <small className="note-meta">Last modified [date]</small>
        </div>
      </div>
    </div>
  );

}

export default Sidebar;
```

`src/components/Main.js`
```js
import React from "react";

const Main = () => {
  return (
    // Main Section
    <div className="app-main">
      {/*Section 1: Main Note Edit*/}
      <div className="app-main-note-edit">
        <input type="text" id="title" autoFocus /> {/*input & Autofocus ⭐*/}
        <textarea id="body" placeholder="Write your note here..." /> {/*TextArea ⭐*/}
      </div>
      {/*Section 3: Main Note Preview*/}
      <div className="app-main-note-preview">
        <h1 className="preview-title">TITLE</h1>
        <div className="markdown-preview">note preview</div>
      </div>
    </div>
  );
};
export default Main;
```

### Step 2 : Add Sidebar Functionalities through `App.js` Component

Updated  **Create** `src/App.js`
```jsx
import React, { act } from "react";

import Sidebar from "./components/Sidebar";

import Main from "./components/Main";

import { useState } from "react";

import uuid from "react-uuid"; // library for random ID ⭐

  

function App() {

  // Notes State Array

  const [notes, setNotes] = useState([]); // Array State for Notes ⭐

  const [activeNote, setActiveNote] = useState(false); // State (initialy boolean=false) for Active or not ⭐

  

  // Note: All Event handling function will be Arrow function.

  const onAddNote = () => {

    const newNote = {

      id: uuid(), // random 'uuid' for the object ⭐

      title: "Untitled Note",

      body: "",

      lastModified: Date.now(), // Javascript function for current date ⭐

    };

    setNotes([newNote, ...notes]); // Append an object in State Array using spreadoperator⭐

  };

  

  const onDeleteNote = (idToDelete) => {

    setNotes(notes.filter((note) => note.id !== idToDelete)); // Filter Array and Save to set States ⭐

  };


  

  return (

    <div className="App">

      {/* Sidebar Component*/}

      <Sidebar

        notes={notes} //Notes State Prop⭐

        onAddNote={onAddNote}

        onDeleteNote={onDeleteNote}

        activeNote={activeNote} // activeNote State Prop⭐

        setActiveNote={setActiveNote} // activeNotes set State Prop⭐

      />

      {/* Main Component*/}

      <Main/>

    </div>

  );

}

  

export default App;
```

Updated **Create** `src/components/Sidebar.js`
```jsx
import React from 'react';

  

const Sidebar = ({notes, onAddNote, onDeleteNote, activeNote, setActiveNote}) => { // Props Taken from `App.js`

  return (

    // Sidebar

    <div className="app-sidebar">  

      {/* Section 1: Sidebar Header */}

      <div className="app-sidebar-header">  

        <h1>Notes</h1>

        <button onClick={onAddNote}>Add</button> {/*onDeleteNote() use*/}

      </div>

  

      {/* Section 2: Sidebar Notes */}

      <div className="app-sidebar-notes">

  

        {notes.map((note)=> // Map Function for Dynamically Use Notes

            <div className={`app-sidebar-note ${note.id === activeNote && "active" /* Dynamically return "active" if condition true note: using template literal for js logic*/}`} onClick={()=>setActiveNote(note.id)}> {/* setActiveNote() to show current Note Active*/}

            {/* Section 2.1: Sidebar Notes Title */}

            <div className="sidebar-note-title">  

              <strong>{note.title}</strong> {/*using props.note title*/}

              <button onClick={()=>onDeleteNote(note.id)}>Delete</button> {/*onDeleteNote() use, Note: onDelete()❌ -> ()=>onDelete() ✔️ ⭐*/}

            </div>

            {/* Section 2.2: Sidebar Notes Preview */}

            <p>{note.body && (note.body.length>100? note.body.substr(0,100)+"..." : note.body)}</p> {/* Using props.note body and only show upto 100 string if greater ⭐*/}

            <small className="note-meta">{new Date(note.lastModified).toLocaleDateString("en-GB", { hour: "2-digit", minute:"2-digit"})}</small> {/* show note.lastModified to date format  and also minute and Hour ⭐*/}

          </div>

        )}

  

      </div>

    </div>

  );

}

  

export default Sidebar;
```

### Step 3 : Add Main Component Functionalities through `App.js` Component

**Updated** `src/App.js`
```jsx
import React from "react";

import Sidebar from "./components/Sidebar";

import Main from "./components/Main";

import { useState } from "react";

import uuid from "react-uuid"; // library for random ID ⭐

  

function App() {

  // Notes State Array

  const [notes, setNotes] = useState([]); // Array State for Notes ⭐

  const [activeNote, setActiveNote] = useState(false); // State (initialy boolean=false) for Active or not ⭐

  

  // Note: All Event handling function will be Arrow function.

  const onAddNote = () => {

    const newNote = {

      id: uuid(), // random 'uuid' for the object ⭐

      title: "Untitled Note",

      body: "",

      lastModified: Date.now(), // Javascript function for current date ⭐

    };

    setNotes([newNote, ...notes]); // Append an object in State Array using spreadoperator⭐

  };

  

  const onDeleteNote = (idToDelete) => {

    setNotes(notes.filter((note) => note.id !== idToDelete)); // Filter Array and Save to set States ⭐

  };

  

  // Get Active Helper function to get the current stored id

  const getActiveNote = () => {

    return notes.find((note)=> note.id===activeNote); // activeNote is set by seActive Note inside Sidebar.js ⭐

  }

  

  // Update Note

  const onUpdateNote = (updatedNote) => {

    const updatedNotesArray = notes.map((note)=>{ // Map function to update Notes array ⭐

      if(note.id === activeNote){

        return updatedNote; // update only for activeNote in newarray ⭐

      }

  

      return note;

    });

    setNotes(updatedNotesArray) // set State to Updated returned Note Array ⭐

  }

  

  return (

    <div className="App">

      {/* Sidebar Component*/}

      <Sidebar

        notes={notes} //Notes State Prop⭐

        onAddNote={onAddNote}

        onDeleteNote={onDeleteNote}

        activeNote={activeNote} // activeNote State Prop⭐

        setActiveNote={setActiveNote} // activeNotes set State Prop⭐

      />

      {/* Main Component*/}

      <Main

      // Why not Directly passing activeNote ⭐❓

        activeNote={getActiveNote()}  // getActiveNote() automatically running a function as a prop and update activeNote ⭐

        onUpdateNote={onUpdateNote} // Run only when called

  

      />

    </div>

  );

}

  

export default App;
```


**Updated** `src/components/Main.js`
```jsx
import React from "react";

  

const Main = ({activeNote, onUpdateNote}) => { /* but activeNote is not taken*/

  

    const onEditField = (key, value) => {

      onUpdateNote({

        ...activeNote, // spread operator: creates a shallow copy of all properties of the activeNote object and spreads them into another object or array.

        // Key= title/body is Dynamically typed and shown

        [key]: value, // Set value to key

        lastModified: Date.now() // Update date

        // Note: Id need not to update, so don't write here.

      })

    }

  

  if(!activeNote) return <div className="no-active-note">No note Selected</div> // If activeNote = false

  return (

    // Main Section

    <div className="app-main">

      {/*Section 1: Main Note Edit*/}

      <div className="app-main-note-edit">

  

        <input type="text" id="title" autoFocus

          value={activeNote.title}   // Initial Value

          onChange={(e)=> onEditField("title", e.target.value)} // onEditField() to show title text change ⭐

        />

  

        <textarea id="body" placeholder="Write your note here..."

          value={activeNote.body}  // Initial Value

          onChange={(e)=> onEditField("body", e.target.value)} // onEditField() to show body text changes ⭐

        />

  

      </div>

      {/*Section 3: Main Note Preview*/}

      <div className="app-main-note-preview">

        <h1 className="preview-title">{activeNote.title}</h1>

        <div className="markdown-preview">{activeNote.body}</div>

      </div>

    </div>

  );

};

  

export default Main;
```

### Step 4 : Add Markdown Feature in Main Component

```jsx
import React from "react";

import ReactMarkdown from "react-markdown";

  

const Main = ({activeNote, onUpdateNote}) => { /* but activeNote is not taken*/

  

    const onEditField = (key, value) => {

      onUpdateNote({

        ...activeNote, // spread operator: creates a shallow copy of all properties of the activeNote object and spreads them into another object or array.

        // Key= title/body is Dynamically typed and shown

        [key]: value, // Set value to key

        lastModified: Date.now() // Update date

        // Note: Id need not to update, so don't write here.

      });

    }

  

  if(!activeNote) return <div className="no-active-note">No note Selected</div> // If activeNote = false

  return (

    // Main Section

    <div className="app-main">

      {/*Section 1: Main Note Edit*/}

      <div className="app-main-note-edit">

  

        <input type="text" id="title" autoFocus

          value={activeNote.title}   // Initial Value

          onChange={(e)=> onEditField("title", e.target.value)} // onEditField() to show title text change ⭐

        />

  

        <textarea id="body" placeholder="Write your note here..."

          value={activeNote.body}  // Initial Value

          onChange={(e)=> onEditField("body", e.target.value)} // onEditField() to show body text changes ⭐

        />

  

      </div>

      {/*Section 3: Main Note Preview*/}

      <div className="app-main-note-preview">

        <h1 className="preview-title">{activeNote.title}</h1>

        {/* <div className="markdown-preview">{activeNote.body}</div> */}

        {/*Replace the <div></div> to <ReactMarkdown></ReactMarkdown> to Render in Markdown*/}

        <ReactMarkdown className="markdown-preview">{activeNote.body}</ReactMarkdown>

      </div>

    </div>

  );

};

  

export default Main;
```

### Step 5 : Sort Notes in Sidebar Component based on LastModified

```jsx
import React from 'react';

  

const Sidebar = ({notes, onAddNote, onDeleteNote, activeNote, setActiveNote}) => { // Props Taken from `App.js`

  // function using complicated sorting algorithm to sort based on lastModified date

  const sortedNotes = notes.sort((a,b)=>b.lastModified-a.lastModified);

  return (

    // Sidebar

    <div className="app-sidebar">  

      {/* Section 1: Sidebar Header */}

      <div className="app-sidebar-header">  

        <h1>Notes</h1>

        <button onClick={onAddNote}>Add</button> {/*onDeleteNote() use*/}

      </div>

  

      {/* Section 2: Sidebar Notes */}

      <div className="app-sidebar-notes">

  

        {sortedNotes.map((note)=> // Map Function for Dynamically Use Sorted Notes

            <div className={`app-sidebar-note ${note.id === activeNote && "active" /* Dynamically return "active" if condition true note: using template literal for js logic*/}`} onClick={()=>setActiveNote(note.id)}> {/* setActiveNote() to show current Note Active*/}

            {/* Section 2.1: Sidebar Notes Title */}

            <div className="sidebar-note-title">  

              <strong>{note.title}</strong> {/*using props.note title*/}

              <button onClick={()=>onDeleteNote(note.id)}>Delete</button> {/*onDeleteNote() use, Note: onDelete()❌ -> ()=>onDelete() ✔️ ⭐*/}

            </div>

            {/* Section 2.2: Sidebar Notes Preview */}

            <p>{note.body && (note.body.length>100? note.body.substr(0,100)+"..." : note.body)}</p> {/* Using props.note body and only show upto 100 string if greater ⭐*/}

            <small className="note-meta">{new Date(note.lastModified).toLocaleDateString("en-GB", { hour: "2-digit", minute:"2-digit"})}</small> {/* show note.lastModified to date format  and also minute and Hour ⭐*/}

          </div>

        )}

  

      </div>

    </div>

  );

}

  

export default Sidebar;
```

### Step 6 : Save Notes to Local Storage


```jsx
//App.js

import React from "react";

import Sidebar from "./components/Sidebar";

import Main from "./components/Main";

import { useState , useEffect} from "react";

import uuid from "react-uuid"; // library for random ID ⭐

  

function App() {

  // Notes State Array

  const [notes, setNotes] = useState(JSON.parse(localStorage.notes) || []); // Initalize Notes to Local Storage JSON if not defined than default⭐

  const [activeNote, setActiveNote] = useState(false); // State (initialy boolean=false) for Active or not ⭐

  

  // Save Notes to local storage i.e. browser's internal storage

  useEffect(()=>{

    localStorage.setItem("notes", JSON.stringify(notes));

  }, [notes]);

  
  

  // Note: All Event handling function will be Arrow function.

  const onAddNote = () => {

    const newNote = {

      id: uuid(), // random 'uuid' for the object ⭐

      title: "Untitled Note",

      body: "",

      lastModified: Date.now(), // Javascript function for current date ⭐

    };

    setNotes([newNote, ...notes]); // Append an object in State Array using spreadoperator⭐

  };

  

  const onDeleteNote = (idToDelete) => {

    setNotes(notes.filter((note) => note.id !== idToDelete)); // Filter Array and Save to set States ⭐

  };

  

  // Get Active Helper function to get the current stored id

  const getActiveNote = () => {

    return notes.find((note)=> note.id===activeNote); // activeNote is set by seActive Note inside Sidebar.js ⭐

  }

  

  // Update Note

  const onUpdateNote = (updatedNote) => {

    const updatedNotesArray = notes.map((note)=>{ // Map function to update Notes array ⭐

      if(note.id === activeNote){

        return updatedNote; // update only for activeNote in newarray ⭐

      }

  

      return note;

    });

    setNotes(updatedNotesArray) // set State to Updated returned Note Array ⭐

  }

  

  return (

    <div className="App">

      {/* Sidebar Component*/}

      <Sidebar

        notes={notes} //Notes State Prop⭐

        onAddNote={onAddNote}

        onDeleteNote={onDeleteNote}

        activeNote={activeNote} // activeNote State Prop⭐

        setActiveNote={setActiveNote} // activeNotes set State Prop⭐

      />

      {/* Main Component*/}

      <Main

      // Why not Directly passing activeNote ⭐❓

        activeNote={getActiveNote()}  // getActiveNote() automatically running a function as a prop and update activeNote ⭐

        onUpdateNote={onUpdateNote} // Run only when called

  

      />

    </div>

  );

}

  

export default App;
```
### Style

`src/index.css`
```css
 /*index.css*/

@import url("https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css");

* {
  box-sizing: border-box;
}

/* GLOBAL STYLES */

body,
.App {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  font-size: 16px;
  background: url(https://www.toptal.com/designers/subtlepatterns/patterns/lightpaperfibers.png);
}

button {
  background: none;
  border: 0;
  margin: 0;
  padding: 0;
  font-size: inherit;
  font-family: inherit;
  cursor: pointer;
  color: #08c;
}
button:hover {
  color: #04c;
}

.App {
  display: flex;
}

/* SIDEBAR STYLES */

.app-sidebar {
  width: 30%;
  height: 100vh;
  border-right: 1px solid #ddd;
}

.app-sidebar-header {
  display: flex;
  justify-content: space-between;
  padding: 25px;
}
.app-sidebar-header h1 {
  margin: 0;
}

.app-sidebar-notes {
  height: calc(100vh - 78px);
  overflow-y: scroll;
}
.app-sidebar-note {
  padding: 25px;
  cursor: pointer;
}
.sidebar-note-title {
  display: flex;
  justify-content: space-between;
}
.app-sidebar-note button {
  color: crimson;
}
.app-sidebar-note p {
  margin: 10px 0;
}
.app-sidebar-note small {
  display: block;
  color: #999;
}

.app-sidebar-note:hover {
  background: #ddd;
}
.app-sidebar-note.active,
.app-sidebar-note.active small {
  background: #08c;
  color: white;
}

/* NOTE EDITOR/PREVIEW (MAIN) STYLES */

.app-main {
  width: 70%;
  height: 100vh;
}
.app-main-note-edit,
.app-main-note-preview {
  height: 50vh;
}

.no-active-note {
  width: 70%;
  height: 100vh;
  line-height: 100vh;
  text-align: center;
  font-size: 2rem;
  color: #999;
}

/* Editing */
.app-main-note-edit {
  padding: 25px;
}

.app-main-note-edit input,
textarea {
  display: block;
  border: 1px solid #ddd;
  margin-bottom: 20px;
  width: 100%;
  height: calc(50vh - 130px);
  padding: 10px;
  resize: none;
  font-size: inherit;
  font-family: inherit;
}
.app-main-note-edit input {
  height: 50px;
  font-size: 2rem;
}

/* Preview */
.app-main-note-preview {
  border-top: 1px solid #ddd;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.02);
}

.preview-title {
  padding: 25px 25px 0 25px;
  margin: 0;
}

.markdown-preview {
  padding: 0 25px 25px 25px;
  font-size: 1rem;
  line-height: 2rem;
}

```