

## Installation

**Automatic Installation :**
```sh
npx create-next-app@latest
```

**Manual Installation:**
```sh
npm install next@latest react@latest react-dom@latest
```

Open your `package.json` file and add the following `scripts`:
```js
// package.json
{
  "scripts": {
    "dev": "next dev", // to start Nextjs in development mode.
    "build": "next build", // to build the app. for production usage.
    "start": "next start", // to start a Nextjs production server.
    "lint": "next lint" //  to set up Nextjs built-in ESLint configuration.
  }
}
```

1. Create a `pages` directory at the root of your project. Then, add an `index.tsx` file inside your `pages` folder. This will be your home page (`/`):
2. Next, add an `_app.tsx` file inside `pages/` to define the global layout. Learn more about the [custom App file](https://nextjs.org/docs/pages/building-your-application/routing/custom-app).
3. Finally, add a `_document.tsx` file inside `pages/` to control the initial response from the server. Learn more about the [custom Document file](https://nextjs.org/docs/pages/building-your-application/routing/custom-document).
### 1. **File-Based Routing**

- **Key Difference**: In React, you define routes using a library like `react-router`. In Next.js, the file structure inside the `pages/` directory automatically defines routes.
- Example:
    - File: `pages/index.js` → Route: `/`
    - File: `pages/about.js` → Route: `/about`
    - Dynamic routes: `pages/blog/[id].js` → Route: `/blog/:id`
- Learn: [Next.js Routing Documentation](https://nextjs.org/docs/routing/introduction)

---

### 2. **Pre-rendering and Data Fetching**

- Next.js pre-renders pages to improve performance and SEO. You can choose between:
    - **Static Generation (SSG)**: Generates HTML at build time.
    - **Server-Side Rendering (SSR)**: Generates HTML on each request.
    - **Client-Side Rendering (CSR)**: Similar to React, rendering happens on the client.
- Learn about:
    - `getStaticProps` (for SSG)
    - `getServerSideProps` (for SSR)
    - `getStaticPaths` (for dynamic routes with SSG)

---

### 3. **API Routes**

- You can build backend endpoints directly in Next.js using the `pages/api/` directory.
- Example:
    - File: `pages/api/hello.js`
    - Accessible at: `/api/hello`
- Use it for handling form submissions, fetching data, or building a full API.
- Learn: [API Routes](https://nextjs.org/docs/api-routes/introduction)

---

### 4. **Built-in CSS and Styling Options**

- Supports:
    - **CSS Modules**: Scoped styles using the `.module.css` convention.
    - **Global CSS**: Add global styles in `_app.js`.
    - **Styled Components** or **TailwindCSS**: Fully compatible.
- Example:
    
    ```javascript
    import styles from './Home.module.css';
    
    function Home() {
        return <div className={styles.container}>Hello, Next.js!</div>;
    }
    ```
    

---

### 5. **Middleware and Edge Functions** (Optional)

- Middleware allows you to run code before a request is completed. Useful for authentication, localization, or redirects.
- Learn: [Middleware](https://nextjs.org/docs/middleware)

---

### 6. **Static File Serving**

- Place assets like images, fonts, or files in the `public/` folder.
- Access them directly using `/your-file-name`.
- Example:
    - File: `public/logo.png`
    - Usage: `<img src="/logo.png" alt="Logo" />`

---

### 7. **Head Management**

- Use the `next/head` component to manage the `<head>` section of your pages.
- Example:
    
    ```javascript
    import Head from 'next/head';
    
    export default function Home() {
        return (
            <div>
                <Head>
                    <title>My Next.js App</title>
                    <meta name="description" content="Learn Next.js" />
                </Head>
                <h1>Welcome!</h1>
            </div>
        );
    }
    ```
    

---

### 8. **Image Optimization**

- Next.js provides an `Image` component for automatic image optimization.
- Example:
    
    ```javascript
    import Image from 'next/image';
    
    export default function Home() {
        return <Image src="/example.jpg" alt="Example" width={500} height={500} />;
    }
    ```
    

---

### 9. **Custom `_app.js` and `_document.js`**

- `_app.js`: Customizes the root application (e.g., global styles, context providers).
- `_document.js`: Customizes the HTML structure (e.g., adding custom meta tags).

---

### 10. **Deployment**

- **Vercel** is the easiest deployment platform for Next.js (free tier available).
- Build and export static sites (`next export`) or deploy server-rendered apps.

---

### Additional Tips:

- **Learn TypeScript with Next.js**: Integrating TypeScript can make your Next.js projects more robust.
- **Understand Environment Variables**: Place them in `.env.local` for secure usage.
- **Explore Middleware for Auth**: Useful for integrating user authentication.

By focusing on these core features, you’ll quickly become proficient in Next.js. Start with small projects, like converting an existing React app to Next.js!