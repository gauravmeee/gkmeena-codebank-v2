
### **Problem:** Unhandled Runtime Error in Next.js: "Event handlers cannot be passed to Client Component props."

**Cause:**
- In Next.js with the App Router, Server Components cannot handle interactivity like event handlers (`onClick`).
- The error occurs when trying to directly pass an event handler in a Server Component.

**Solution:**
1. **Convert to a Client Component**
    - Add "use client" at the top of the file.
2. **Define Scroll Function & Attach to Button**
    - Create a function to scroll to the "Contact" section.
    - Use `scrollIntoView({ behavior: "smooth" })` to enable smooth scrolling.

**Fixed Code:**
```tsx
"use client"; // Ensures it's a Client Component
import Head from "next/head";

export default function Home() {
  return (
    <>
    </>
  );
}
```

**Key Takeaways:**
- Always use `"use client"` when handling interactivity in Next.js App Router.
- Use `document.getElementById("contact").scrollIntoView({ behavior: "smooth" })` for smooth scrolling.
- Ensure event handlers are defined inside Client Components.

---