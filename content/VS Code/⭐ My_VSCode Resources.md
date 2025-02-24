

---

Open VS Code from Terminal like `cmd`
```sh
code .
```

---
### Opens the `my_project` folder in the current VS Code window. 
& If no window is open, it will create a new one.

```bash
code -r my_project # code -r "path/to/My API"
```

- **`code`**: Refers to the VS Code command-line tool.
- **`-r`**: Stands for "reuse window," which means it will open the specified project in the currently open VS Code window instead of creating a new one.
- **`project`**: Refers to the folder or project directory you want to open in VS Code.

If you face issues running `code` from the terminal, you may need to install the command-line tool:

1. Open VS Code.
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS).
3. Type and select **"Shell Command: Install 'code' command in PATH"**.

---
### Indentation:

`Cntrl + [` & `Cntrl + ]`
note: cursor should be on the line which indentation need to be change.

---

### If you want to get Suggestion without typing anything
`cntrl` + `space`

---
### Rename All Occurrence Using Multi Cursor

**1. Select the Variable:**

Place your cursor on the variable you want to rename.

**2. Select Multiple Occurrences:**

- Select All Occurrence
Press `Ctrl + D` to select the next occurrence of the variable.
Keep pressing `Ctrl + D` until all occurrences are selected, or press `Ctrl + Shift + L` to select all occurrences at once.

- Select multiple manually
Hold `Alt` and `double click` on the words one by one to select each of them

**3. Rename the Variable:**
Start typing the new variable name. All selected occurrences will be renamed simultaneously.

---
### Important Extensions
1. `Live server (~Ritwick Dey)` : Launch a development local Server with live reload feature for static & dynamic pages
2. `Live Preview (~Microsoft)` : Hosts a local server in your workspace for you to preview your webpages on.
3. `ES7+ React/Redux/React-Native snippets (~dsznajder )` : Extensions for React, React-Native and Redux in JS/TS with ES7+ syntax. Customizable. Built-in integration with prettier.
4. `Live Share (~Microsoft)` : Real-time collaborative development from the comfort of your favorite tools.
5. `C/C++(~Microsoft)` : C/C++ IntelliSense, debugging, and code browsing.
6. `Tailwind CSS IntelliSense (~Tailwind Labs)` : Intelligent Tailwind CSS tooling for VS Code
7. `Prettier`
8. `Competitive Programming Helper (cph) (~Divyanshu Agrawal)` : Makes judging, compiling, and downloading problems for competitve programming easy.

