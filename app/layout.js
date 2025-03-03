import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";  // Import Footer component
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/providers/AuthProvider";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CodeBank - Coding Resources",
  description: "by GKmeena",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-p-20 scroll-smooth">

      <body className={`${inter.className} flex flex-col min-h-screen`}>

      { /*Add Google Analytics */}
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-7FLDG657GW"/>
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7FLDG657GW');
          `}
        </Script>

      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <AuthProvider>
          <Navbar/>
          <main className="flex-grow">{children}</main>
          <Footer/>
        </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
