# [Git & GitHub Tutorial For Beginners In Hindi](https://youtu.be/gwWKnnCMQ5c)

## Git
Git is a powerful and popular version control system that enables effective tracking of changes in source code.
- Developed by *Linus Trovalds* in 2005 for Linnux Kernel development and it is used for keeping track of code changes and collaborating with others on code.
- It uses decentralised model where each developer has their own copy of repository and works immediately on the project.
- Git manages the projects with repositories and can clone a project to operate locally on it
- With staging and committing it tracks changes and control. You can pull the latest code of the project to the local copy, and push local updates to the main projects.

## Why use Git ?
70% of developers worldwide use git for development.
Reasons: 
-  Developers can work together from any where
- Developers can see the full history and can compare the previous and new changes of the project.
- Developers can retreat to earlier versions of a project


```
[Untrack]        [Unmodified]     [Modified]          [Stage]
    |                 |                |                 |
    |------------------Add File------------------------->|
    |                 |                |                 |
                      |-Edit the file->|                 |
    |                 |                |                 |
    |                 |                |-Stage the file->|
    |                 |                |                 |
    |<-Remov the file-|                |                 |
    |                 |                |                 |
                      |<------------Commit---------------|
```

In Git, files in repository can be classified into four different states.
- Untracked: Untracked files are files that exist in the working directory of your git repository but not been added to the version control system
- Unmodified : Unmodified files are files that are currently tracked by git and exist in the repository but not have been changed since the last commit.
- Modified files that have been tracked by git but their contents have been change since the last commit.
- Staged: staged files are modified files that have been added to the staging area in git.
	- Staging area Is a space where you can group and prepare changes before committing them to the repository. 

## Git Commands

- Initialize git directory
```sh
git init
```

- Check / Display current state of git repository
```sh
git status
```
red color - untracked files , Green color - Staging area

- Get a concise output of the current status of the git repository
```sh
git status -S # short/simple
```
First Column (Staging Area): A(New file added), M(Modification), D(Deleted), R(Renamed)
Second Column (Working Tree): M(Modified), D(Deleted)

- Add all file to the staging area.
```sh
git add
# or
git add -A # --all
```

- Add a file to the staging area.
```sh
git add index.html
```

- Commit/Save your changes to the local repository 
```sh
git commit #open in vim editor
```

- Commit/Save your changes directly through commit message
```sh
git commit -m "This is my first commit"
```

- Commit without staging separately ( skip `git add`)
```sh
git commit -a -m
# automatically stage any modified or deleted files(but not new, untracked file) and creates a commit with specified messages.
```

- Remove a file from working director and staging area (Delete file)
```sh
git rm waste.html # remove
```

- Remove a file from  staging area only (to untrack file)
```sh
git rm --cached waste.html # remove
```
### More

- Match all the files to the last commit
```sh
git checkout -f # --force
```

- Match a specific file to the last commit.
```sh
git checkout about.html
```

- to check what-what committed
```sh
git log
```

- to check last `x` commit ( change introduced in commit)
```sh
git log  -p -1 # --patch, -1: no of last commit to see
```

- Compare working tree with staging area
```sh
git diff # difference
```

- Compare staging area with last commit
```sh
git diff --staged
```

- Clear the terminal
```sh
clear
```

- quit
```sh
:q
```

what `-` and `--` in git??
`-`: represents options in git command
`--`: separate options from arguments explicitly


### Non Git but useful commands (Unix features)

- List all files
```sh
ls
```

- Create blank file ( use `touch`)
```sh
touch about.html
```

- To ignore files

create `.gitignore`  file
```sh
touch .gitignore
```

add files inside `.gitingnore` file manually or:
```sh
Add index.html into the .gitignore
git rm --cached index.html # file will be removed from the staging area
# or
echo "index.html" >> .gitignore
# or
printf "index.html\n" >> .gitignore
```

verify ignored files.
```sh
cat .gitignore
```

*Note:* Git Bash can be used as Unix terminal


## Branch
- In Git, a branch is a light weight movable pointer that represents an independent line of development.
- It allows you to work on different features, bug fixes, or experiments without affecting the main project code base.
- When you create a git repository, it starts with a default branch Called `master`.  you can create a new branches from this master branch or from other existing branches.
- Each branches has its own commit history, which means you can make changes, commit them, and store them independently from other branches

- Checkout new branch
```sh
git branch feature1
```

- Show all branches
```sh
git branch
```
Green - Show that you are in this branch, White color - other branches

- Switch to other branch
```sh
git checkout feature1
# or 
git switch feature1
```

- Create and switch to the new branch (in one statement)
```sh
git checkout -b feature2
#or
git switch -c feature2 # --create
```
- Merger 'feature1' branch to master
```sh
git checkout master
git merge feature`
```

*Note:* When you switch branches in git, it will remove any uncommitted changes that conflict with the target branch. This is safety measure to prevent potential data loss. However, switching branches would not delete untracked file in repository.

## Github

Github is a hosting service for git repositories and if you have a project hosted on Github, you can access and download that project with commands on any computer you have access and make your changes and push the latest version back to Github.
Github allows you to store your repo on their platform. It is also comes ability to collaborate with other developers from any location

- Connect Local (Git Rep) Repository to Remote (Github Repo) Repository
```sh
git remote add origin https://github.com/gauravmeee/git-in-one-video.git
```

- Show Remote Repositories lists.
```sh
git remote 
```

- View the remote Repo's with Corresponding URIs,
```sh
git remote -v # verbose : additional infor about remote repos, including fetch and push URIs
```

- Push Master Branch to Remote Repository
```sh
git push origin master
```

- specify the remote branch and Push & Pull
```sh
git push -u origin master # --set-upstream
git pull -u origin master
```

*Note:* The `-u` flag stands for `--set-upstream`. This sets the upstream tracking relationship for your local `master` branch to the `origin/master` branch. `git push` and `git pull` commands can be used without specifying the remote branch because Git will remember the upstream branch.

- Direct push and pull to previously specified branch
```sh
git push
git pull
```

- Clone Repository to Folder (Renamed as Remote Repo)
```sh
git clone https://github.com/gauravmeee/markdown-notes.git
```

- Clone Repository in a Folder (Renamed a Folder1)
```sh
git clone https://github.com/gauravmeee/markdown-notes.git Folder1
```

### More Remote Commands
```sh
git clean # Remove untracked files from working directory

git commit --amend # let you amend the most recent commit

git fetch # fetching downloads a branch from another repository, along with all of its associated commits and files.

git pull # Pulling is the automated version of git fetch

git reset # undoes changes to files in the working directory (that are not pushed)

git revert # Undoes a commit snapshot

git rebase # let you move branches around, helping avoid unecessary merge commits.

git reflog # git keeps track of updates to the tip of branches using a mechanism called reflog
```