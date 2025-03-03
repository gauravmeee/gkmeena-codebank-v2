import Head from "next/head";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import AuthButtons from "@/components/auth/AuthButtons";

export default function Home() {
  
  return (
    <>
      <Head>
        <title>CodeBank - Your All-in-One Programming Resources</title>
      </Head>

      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white ">
        {/* Hero Section */}
        <section className="text-center py-10">
          <div className="container mx-auto">
            <h1 className="text-4xl font-semibold mb-4">Welcome to CodeBank 👋</h1>
            <p className="text-xl mb-6">
              Your ultimate platform for coding services, contests, job posts, Resources and more!
            </p>
            <div className="flex justify-center mb-8">
              <AuthButtons variant="hero" />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 mx-5 px-10 rounded-lg bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-10 text-gray-900 dark:text-white">Our Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              
              <a href="/" className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md  hover:shadow-lg shadow-red-500/30 hover:shadow-red-600/30 transition-transform duration-200">
                <h3 className="text-xl font-semibold mb-4">Programming Services</h3>
                <p>Professional coding services for your projects.</p>
              </a>

              <a href="/notes" className="bg-white dark:bg-gray-700 p-6 rounded-lg  shadow-md hover:shadow-lg shadow-green-600/30 hover:shadow-green-600/30 transition-transform duration-200">
                <h3 className="text-xl font-semibold mb-4 ">Notes & Resources</h3>
                <p>Access study notes, tutorials, and more.</p>
              </a>

              <a href="/contests" className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md  hover:shadow-lg shadow-yellow-400/30 hover:shadow-yellow-400/30  transition-transform duration-200">
                <h3 className="text-xl font-semibold mb-4">Upcoming Contests</h3>
                <p>Stay updated with the latest coding contests.</p>
              </a>

              <a href="/jobs" className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md  hover:shadow-lg shadow-blue-600/30 hover:shadow-blue-600/30 transition-transform duration-200">
                <h3 className="text-xl font-semibold mb-4">Job Postings</h3>
                <p>Find the best tech job opportunities.</p>
              </a>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 text-center">
  <h2 className="text-3xl font-semibold mb-6">Contact us</h2>
  <div className="flex flex-col items-center justify-center gap-2">
    <a href="https://www.linkedin.com/in/gauravmeee/" target="_blank" className="text-blue-600 dark:text-blue-400 text-xl flex items-center gap-2">
      <FaLinkedin size={24} /> linkedin.com/in/gauravmeee
    </a>
    <a href="https://github.com/gauravmeee" target="_blank" className="text-gray-900 dark:text-gray-300 text-xl flex items-center gap-2">
      <FaGithub size={24} /> github.com/gauravmeee
    </a>
  </div>
</section>

      </div>
    </>
  );
}
