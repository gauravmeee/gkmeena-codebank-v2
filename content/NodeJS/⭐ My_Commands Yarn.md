
## yarn

`Yarn` is a package manager for JavaScript, similar to **npm**. It was developed by Facebook  to address some of the shortcomings of` npm` at the time. Yarn introduced several features to improve performance, reliability, and security when managing dependencies.

*Note:* Both npm (`package-lock.json`) and Yarn (`yarn.lock`) use a `lockfile` to ensure consistency across different environments.

```sh
# Initialize a project
yarn init

yarn # npm install
# or 
yarn install
 
yarn add package-name # add -> install

yarn add package-name@version

yarn add package-name --dev # --dev -> --save-dev

yarn global add package-name # global add -> install -g

yarn upgrade # upgrade -> update

yarn upgrade package-name 

yarn remove package-name # remove -> uninstall

yarn list

yarn outdated

yarn run script-name

yarn install --frozen- lockfile # install --frozen- lockfile -> ci
```

---

**Key Benefits of Yarn**
1. **Speed**: Yarn installs packages faster due to caching and parallel downloads. It reuses downloaded packages in subsequent installs.
2. **Consistency**: Yarn uses a `yarn.lock` file to ensure consistent dependency versions across all environments.
3. **Security**: Yarn verifies package integrity using checksums to ensure no tampering has occurred.
4. **Offline Mode**: Yarn can install previously installed packages without an internet connection, using its cache.
5. **Better Dependency Resolution**: Yarn avoids "dependency hell" by ensuring predictable dependency trees.
6. **Workspaces**: Yarn has built-in support for managing monorepos, making it easier to work with multiple projects in one repository.

**Which to Choose?**
- **Yarn**: Choose if you need speed, better dependency management, or `monorepo` support.
- **npm**: Choose if you prefer simplicity or the latest npm features (like workspaces and performance improvements).