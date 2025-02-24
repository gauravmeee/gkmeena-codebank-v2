
HTML Structure
```html
<!DOCTYPE html>
<html>
	<head>
		<title> ... </title>
	</head>
	
	<body>
	.
	.
	.
	</body>
	
</html>
```

Heading 
```html
<!--Max Size-->
<h1> Heading 1 </h1>
<h2> Heading 2 </h2>
<h3> Heading 3 </h3>
<h4> Heading 4 </h4>
<h5> Heading 5 </h5>
<h6> Heading 6 </h6>
<!--Min Size-->
```

Paragraph
```html
<p>
	This is  Paragraph line 1
    This is Paragraph line 2
</p>
```

Text Style
```html
<em> This is Italic Text </em>
<strong> This is Bold Text </strong>
```

List
```html
<ul> These are Unordered list
	<li> Item x </li>
	<li> Item y </li>
</ul>

<ol> These are Ordered List
	<li> Item 1 </li>
	<li> Item 2 </li>
<ol>
```

HTML Links
```html
<!-- Directing Link -->
<a href="link.com"> This is a Link to link.com </a>

<!-- InterLink -->
<a href ="#Section2"> Click to Go to Section 2 </a>
<h3 id="Section2"> This is Section2 </h3>
```

Next Line
```html
... This is line 1 <br> This is line 2 ...
```

Table
```html
<table>
	<thead>
		<tr>
			<th> Column 1 Heading </th>
			<th> Column 2 Heading </th>
		</tr>
	</thead>
	
	<tbody>
	
		<tr>
		<td> Column 1 Data 1 </td>
		<td> Column 2 Data 1 </td>
		</tr>
		
		<tr>
		<td> Column 1 Data 2 </td>
		<td> Column 2 Data 2 </td>
		</tr>
		
	</tbody>
	
</table>
```

Image
```html
<img src="image.jpg" alt="Alternate Text" breadth="10px" height="10px">
```

Inline Style
```html
<!-- Style to Tags -->
<style>
	h2{ color: rgb(0, 232, 15);} 
	p{color: red;}
	body {background-color: rgb(97, 250, 255); }
</style>

<!-- Style to ids -->
<style>
	#id1{/* Style here will applied one element that contain id="id1" */}
	#id2{/* Style here will applied one element that contain id="id2" */}
</style>

<!-- Style to Class -->
<style>
	.class1{/*Style here will applied on all element with class="class1" */}
	.class2{/*Style here will applied on all element with class="class2" */}
</style>
```

---

## HTML Import & Usage

- **`href` Used when referring to a resource** : The browser doesn’t load the file immediately but references it when needed. (ex: Stylesheets, hyperlinks.)

- **`src` Used when embedding a resource** : The browser **fetches and loads** the file immediately as part of the page. (ex: Images, scripts, iframes.)

- `rel` stands for **relationship**. It is an attribute used in `<link>` and `<a>` elements  to specify the relationship between the current document and the linked resource (`href`)

#### Inside `<head>`

- **Favicon `<link>`** -> (`href` & `rel`)
```html
<link rel="icon" type="image/png" href="favicon.png">
```

- **CSS `<link>` (Custom Styles, Google Fonts, Bootstrap, etc.)** -> (`href` & `rel`)
```html
<!-- Custom CSS -->
<link rel="stylesheet" href="styles.css">

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">

<!-- Bootstrap CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
```

- **Other `<link>`** -> (`href` & `rel`)
```html
<link rel="canonical" href="https://example.com"> <!-- Preferred URL for SEO -->
<link rel="alternate" href="rss.xml" type="application/rss+xml"> <!-- RSS Feed -->
<link rel="manifest" href="site.webmanifest"> <!-- PWA Manifest File -->
<link rel="preload" href="styles.css" as="style"> <!-- Preload CSS for faster load -->
<link rel="preconnect" href="https://fonts.googleapis.com"> <!-- Preconnect for faster font loading -->
```


#### Inside `<body>` (`src` mostly)


- **`<a>` (Hyperlink)** -> (`href` & `rel`)
```html
<a href="https://example.com">Visit Example</a> 

<!-- Add target="_blank" to open in a new tab -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">Open in New Tab</a>

<!-- Add `download="" to make File Downloadable -->
<a href="file.pdf" download="MyDocument.pdf">Download PDF</a>

<!-- Other Useful `rel` Attributes -->
<a href="https://example.com" rel="nofollow">No SEO Link</a>
<a href="https://example.com" rel="noopener noreferrer" target="_blank">Security Best Practice</a>
<a href="mailto:someone@example.com">Send Email</a>
<a href="tel:+1234567890">Call Now</a>
```

- **Icons  `<i>`  (FontAwesome)**
```html
<i class="fas fa-home"></i>
```

- **`<script>` (Custom JS, Bootstrap, etc.)** -> `(src)`
```html
<!-- Custom JavaScript -->
<script src="script.js"></script>

<!-- Bootstrap JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<!--Note: Place JavaScript before the closing `</body>` tag for better performance.-->
```

- **`<img>` (PNG, GIFs, SVG)** -> (`src`)
```html
<!-- Image-->
<img src="image.jpg" alt="Description" width="300">

<!-- GIFs -->
<img src="animation.gif" alt="Loading Animation">

<!-- SVG-->
<img src="icon.svg" alt="SVG Icon" width="50">
```

- **`<iframe>`**
```html
<!--YouTube Video Embed-->
<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" allowfullscreen></iframe>

<!--Google Maps Embed-->
<iframe src="https://www.google.com/maps/embed?pb=YOUR_MAP_LINK" width="600" height="450"></iframe>
```


- **`<audio>` (MP3, OGG)** -> (`src`)
```html
<!--Simpler: Only one format supported, If the browser doesn’t support the file, it won’t play -->
<audio src="audio.mp3" controls></audio> 

<!--Multiple formats supported,Fallback text if the browser doesn't support, More -->
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    Your browser does not support the audio tag.
</audio>
```

- **`<video>` (MP4, WEBM)** -> (`src`)
```html

<!--Simpler: Only one format supported, If the browser doesn’t support the file, it won’t play -->
<video src="video.mp4" controls width="400"></video>

<!--Multiple formats supported,Fallback text if the browser doesn't support, More -->
<video controls width="400">
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    Your browser does not support the video tag.
</video>
```






