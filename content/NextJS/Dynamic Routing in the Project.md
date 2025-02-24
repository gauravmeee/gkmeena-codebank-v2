

`notes`
```jsx
const notesDir = path.join(process.cwd(), 'content');

// Helper Function ------------------------------------
const fileOrFolderToFriendlySlug = (str) =>{
  return str.toLowerCase()
  .replace(/[^a-z0-9-]/gi, '-') 
  .replace(/^-+|-+$/g, '');
}
const folderToFriendlyName = (str) =>{
  return str.replace(/[^\w\s-]/g, '')
}


// Get All Folders (Subjects) ---------------------------
const getFolders = () => {
  return fs.readdirSync(notesDir, { withFileTypes: true })
    .filter(dir => dir.isDirectory())
    .map(folder => {
      const folderPath = path.join(notesDir, folder.name);
      const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.md'));

      const fileCount = files.length;
      const folderSlug = fileOrFolderToFriendlySlug(folder.name)
      const folderName = folderToFriendlyName(folder.name)
	 // Return
      return {
        name: folderName,
        slug: folderSlug,
        image: getFolderImage(folderSlug),
        fileCount
      };
    });
};


const folders = getFolders();

// JSX -----------------------------------------------
const FolderGrid = () => {
  return (
        {folders.map((folder, index) => (
          <Link key={folder.slug || index} href={`/notes/${folder.slug}`} />
        ))}
  );
};

```
  |
`<Link>`
  |
 ˅
`notes/[subject]`
```jsx
//  Helper Function ---------------------------------
const fileOrFolderToFriendlySlug = (str) =>{
	return str.toLowerCase()
	.replace(/[^a-z0-9-]/gi, '-')
	.replace(/^-+|-+$/g, '');
}
const filenameToFormattedTitle  = (str) => {
	const [tag, ...restTitle] = str.split('_');
	return restTitle.join(' ');
}
    
export default async function FolderPage({ params }) {

	    // try 1
        const notesPath = path.join(process.cwd(), 'content');
        const subjectsFolders = await fs.readdir(notesPath, { withFileTypes: true });
        const matchedSubject = subjectsFolders
            .filter(dirent => dirent.isDirectory())
            .find(dirent => fileOrFolderToFriendlySlug(dirent.name) === params.subject)?.name;
        const subjectPath = path.join(notesPath, matchedSubject);

		// try 2
		
        const files = await fs.readdir(subjectPath);
        const markdownFiles = files.filter(file => file.endsWith('.md'));

        const notesPromises = markdownFiles.map(async (file) => {
            const filePath = path.join(subjectPath, file);

			// try
				const fileContent = await fs.readFile(filePath, 'utf-8');
				const { data } = matter(fileContent);
				const stats = await fs.stat(filePath);
				const baseFilename = path.parse(file).name;
				
				const noteTitle = filenameToFormattedTitle(baseFilename)
				const noteSlug = fileOrFolderToFriendlySlug(noteTitle);

			// return 
				return {
					...data,
					slug: data.slug || noteSlug,
					title: data.title || noteTitle,
					filename: file,
					createdDate: stats.birthtime,
				};

        });

        const notes = (await Promise.all(notesPromises)).filter(Boolean);

		return (
			{notes.map((note, index) => (
				<Link key={index} href={`/notes/${params.subject}/${note.slug}`}>
	        );
	    )
    }
}
```
  |
`<Link>`
  |
 ˅
`notes/[subject]/[slug]`
```js
export default async function BlogPost({ params }) {

    const fileOrFolderToFriendlySlug = (str) =>{

        return str.toLowerCase()
        // Replace non-alphanumeric characters with '-'
        .replace(/[^a-z0-9-]/gi, '-') 
        // Remove leading and trailing hyphens
        .replace(/^-+|-+$/g, ''); 
    }
	let matchedNote = null;

if(fileOrFolderToFriendlySlug(subject)==params.subject){
	const subjectPath = path.join(contentDir, subject);
	// Read each Notes in it
	...

const notePath = path.join(subjectPath, note);
const content = await fs.readsubject(notePath, 'utf-8');
const { data } = matter(content);
const subjectSlug = data.slug || note.replace('.md', '');

	if (subjectSlug === params.slug) {

		matchedNote = {
			content,
			subjectPath: notePath,
			subjectname: note
		};
		break;
	}
}
```