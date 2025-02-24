# Command Prompt


**what is `sh`, the most time command-line??**
- In a Markdown file, `sh` refers to the "Bourne Shell", a command-line interpreter and programming language for Unix-like operating systems.
- note:- The `sh` command typically refers to the Unix shell and is not directly applicable to the Windows Command Prompt or PowerShell environments.

**Command Prompt vs Powershell**
- **Command Prompt (cmd.exe)** -> Command Prompt is the traditional command-line interpreter in Windows, tracing its roots back to MS-DOS.2
	- **Functionality:** It's suitable for basic tasks like navigating the file system, running simple utilities, and executing batch scripts.5
- **PowerShell** -> PowerShell is a more modern and powerful command-line shell and scripting language built on the .NET framework.6
	- **Functionality:** It's designed for system administration, automation, and advanced tasks.9

**What is Unix- like shell?** 
common Unix-like shells that are available on Windows **1. Bash (Bourne Again Shell)** such as Git Bash:** 

**Directory Separator**
- **Windows:** 
	- Uses the **backslash** (`\`) as the directory separator.
	 - `C:\Users\YourName\Documents\myfile.txt`
- **Unix-like systems (Linux, macOS, etc.):**
	- Use the **forward slash** (`/`) as the directory separator.
	- `/home/yourname/documents/myfile.txt`

---
### Commands

`touch` (Unix-like Shells) : It update the access and modification timestamps of a file. (Creates if doesn't exist)

`nul` (Window Cmd) : It is a special device in Windows, essentially a "black hole" for output. Anything redirected to `nul` is discarded.

`type` (Windows Cmd) : It is used to display the contents of a file.

`echo` (Unix-like Shells and Windows Cmd) : It is used to display provided arguments (text or variables).

`>` (Redirection Operator)
- It is a redirection operator. It redirects the output of a command to a file.
---

Clean Terminal
```
clear
```

---
**Remove a file** (In Window)
```sh
# Remove a file
del path\to\your\file

# Remove a Folder
rmdir /s /q path\to\your\folder
```
`/s`: option removes the folder and its contents
`/q`: suppresses confirmation prompts


Understand **`type` & `nul`**
```sh
# Output nothing into a file (Used to Create a empty file or overwrite if exist)
nul > app.js
#or
> app.js

# display content from a file
type app.js

# display and store nothing into a file
type nul > app.js

# display and output content into a file 
type Hello world > app.js # Not Valid ❌
```

**Display an output** `type/echo`
```sh
type app.js

echo app.js ❌ # output string i.e. app.js
```
- `type <file>` : display the contents of a file in the terminal (Windows Command Prompt).
- `echo <file>` : prints the string provided after it to the terminal. in this case print filename, not its content

**Create a empty file or clear a file.** `>`
```sh
# Creates a empty file or overwrites
nul > index.html
# or shorthand
> index.html

# unix-based system.
touch index.html
```

**Create or overwrite empty file and display file** `>` & `type/echo`
```sh
type nul > app.js
# or
echo > app.js
```
- `type nul` : It is used to output nothing (`nul` system null)
- `echo` : this by itself outputs a blank line
  
**Create or overwrite text in a file** 
```sh
# create or clear a file
echo > app.js

# create or overwrite a file with a 'single blank line'
echo. > app.js

# create or overwrite a file with 'Hello World' text
echo Hello world > html.txt
```

---
### `Cntrl`+ `C` 
is used to terminate a running Process in Unix-like Operating System + `cmd` & `shell`
### Comment

`REM`
```cmd
REM This is a comment
```
`::`
```cmd
:: This is a comment
```
## echo ?
The echo command in Unix-like operating systems, including Linux and macOS, as well as in the Windows Command Prompt and PowerShell, is used to display a line of text or a string.

### Syntax
```sh
echo [option(s)] [string(s)]
```
### Display a simple message
```sh
echo "Hello, World!"
```
note:- like powershell `""` is not used in `cmd`

### Write output to a file (create file if not exist)

```sh
echo Hello, world! > myfile.txt
```

###  Display the value of a variable
```sh
name="Gaurav"
echo "Hello, $name!"
```

###  Print multiple lines
```sh
echo -e "Line 1\nLine 2\nLine 3"
```
### Common Options
- `-e`: Enable interpretation of backslash escapes (like `\n` for newline).
- `-n`: Do not output the trailing newline.
- `-E`: Disable interpretation of backslash escapes (default behavior).

### Using incorrect directory separators 
(e.g. `require('.\myFile.js')`, when it should be `.//myFile.js`. Remember, 
- Windows systems use backslashes while Unix-like systems use forward slashes


---


