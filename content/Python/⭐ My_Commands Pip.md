
## Python 

```sh
# Check python version (py ~ python, -v ~ --version)
python --version
# or
py -v

# Run python program
py app.py
#or
python app.py

# shows  paths where the `python` ,exe found on system 
where python # window
#or
which python # Linux/MacOS
```

```python
# Install package within a python script
import subprocess
subprocess.run(['pip', 'install', 'opencv-wrapper'])
```

---
### Pip Installs Packages (pip)

`pip` is the package installer for Python. It allows you to install and manage additional libraries and dependencies from `PyPI` or other sources that are not part of the standard Python library.
or
`pip` is a package management system used to install and manage software packages written in Python. It stands for "Pip Installs Packages." 

*Note:* 
- Installing `Python` will install `pip` automatically. 
- In `pip` 'i' doesn't stand for `install`

**Manually Install/Upgrade `pip`**
```sh
python -m ensurepip
python -m pip install --upgrade pip
```
- The `-m`stands for **"module"**, allows you to run a Python module as a script. `python -m <module_name> [arguments]`

**Install Package**
```sh
# insttall package
pip install package_name

# Install multiple packages
pip install package_name1 package_name2 

# Install Specific Version
pip install package_name==version # pip install django==3.2.5
```

**Upgrade Package**
```sh
# Upgrade NumPy:
pip install --upgrade package_name
```

**Uninstall Package**
```sh
# Uninstall Package
pip uninstall package_name
```

**List Packages**
```sh
# List All installed packages
pip list

# List Outdated Packages:
pip list --outdated

# show package information
pip show package_name
```
Note: - **Inside a virtual environment**, both commands will show the packages installed within that virtual environment (and not the global environment) and  **Outside a virtual environment** (i.e., in the global environment), they show the global packages.

**`Requirements.txt` Related command**
```sh
# Displays a list of installed packages in `<package_name>==<version>` format.
pip freeze

# Install from requirements.
pip install -r requirements.txt

# Generates `requirements.txt` containing a list of all installed Python packages in your environment, (env+global)
pip freeze > requirements.txt

# scans your project and creates `requirements.txt` with only used packages.
pip install pipreqs
pipreqs . --force 

# Note: `pipreqs` does not delete or uninstall packages.
```


Note:
- **`pip`**: Used in the command line/terminal to install Python packages.
- **`!pip`**: Used in Jupyter Notebooks to run `pip` commands within a code cell.
- **`%pip`**: A newer magic command in Jupyter Notebooks that ensures package installation in the notebook's Python environment.
---
### Virtual env

Virtual environments are a fundamental tool in Python development, allowing you to manage dependencies and project environments more effectively. They ensure that your projects remain isolated and that your development setup remains clean and organized.

*Note:* The `venv` module is not a standalone command; it must be run as a module/script using the `-m` option.


 **Create** Virtual Environment using `venv` (Built-in Module)
```sh
# Create a Virtual Environment in /myenv
python -m venv myenv 

# Activate (Window)
myenv\Scripts\activate
# or
.\myenv\Scripts\activate

# Now  install packages in Virtual env
pip install package_name 
```

**Create** Virtual Environment using `virtualenv` (Third-Party Package)
```sh
# install virtual env
pip install virtualenv

# Create Virtual env
virtualenv myenv

# Activate, Intsall, Deactivate using same method
```

**Deactivate** Virtual Environment
```sh
# deactivate the current virtual environment
deactivate
```

**Delete** Virtual Environment
```sh
# Delete the existing virtual environment folde
rmdir /s /q venv 
```

---

## Flask

```sh
# install Flask
pip install Flask
```

```python
# Create app.py and Run the application
python app.py
```

*Note :* Jinja2 templating is Included with flask so no explicitly install required

---
