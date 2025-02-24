```sh
# Initialise a new git repository
git init

# Create a new README.md
echo "# Project Title" > README.md

# Add specific file to the Staging Area
git add README.md

# Add all changes to the staging area.
git add .

# After stagin, you need to commit them.
git commit -m "ADD README.md with project description"

# show the current status of your working directory and staging area.
git status
```

```sh

# Add remote repository to your local git configuration.
git remote add origin https://github.com/username/repository.git

# Update remote repository to your local git configuration.
git remote set-url origin https://github.com/username/repository.git

# verify or list the remote repositories and their urls
git remote -v


# Push Changes to the remote repository (master/main)
git push origin master

# note: using "git push -u origin master", "-u" flag sets the upstream for the branch so feature pushes can be done with just "git push"

# push subsequent changes
git push

# pull changes from the remote repository
git pull origin master

# Rename the remote from origin to something else
git remote rename origin "new-origin"

# Remove remote
git remote remove origin 

# Clone a repository
git clone https://github.com/username/repository.git

#clone a specific branch
git clone --branch branchname https://github.com/username/repository.git

# Create a new branch
git checkout -b my-new-branch

# switch existing branches
git checkout my-new-branch

# Merge another branch into current branch
git merge main

# view commit history
git log
```

More
```sh
# Remove file
git rm mynotes/javascript.md

# Stage file at once
git add -u
```

.gitignore
```sh
# Create a .gitignore
touch .gitignore # only for linux-based system
# or
echo. > .gitignore ✅
# or
copy nul .gitignore

# add node_modules/ in .gitignore
echo node_modules/ >> .gitignore ✅

# Edit a .gitignore
nano . gitignore

# Check ignored files
git status --ignored
```

Manual Add  .gitignore file 
```sh
# .gitignore
# Ignore all .log files
*.log

# Ignore node_modules directory
node_modules/

# Ignore specific file
config/settings.json

# Ignore all files in tmp directory
tmp/**/

```

Here's a summary of your note on creating and pushing a new branch:

---

### Creating New Branch on Git and Push on New Branch in Github

   ```bash
   # Create a New Branch Locally
   git checkout -b new-branch-name
   
   # Push the New Branch to GitHub
   git push -u origin new-branch-name
   ```

_Note:_ This process is useful for managing different versions or features within the same project by using separate branches.