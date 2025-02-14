import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>CodeBank - Your All-in-One Programming Resources</title>
      </Head>

      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        {/* Hero Section */}
        <section className="text-center py-20">
          <div className="container mx-auto">
            <h1 className="text-4xl font-semibold mb-4">Welcome to CodeBank 👐</h1>
            <p className="text-xl mb-6">
              Your ultimate platform for coding services, contests, job posts, and notes!
            </p>
            <a
              href="#services"
              className="bg-blue-500 text-white py-2 px-8 rounded-lg hover:bg-blue-600 transition"
            >
              Explore Services
            </a>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-10 text-gray-900 dark:text-white">Our Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              
              <a href="/" className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg over:shadow-2xl hover:scale-105 transition-transform duration-200">
                <h3 className="text-xl font-semibold mb-4">Programming Services</h3>
                <p>Professional coding services for your projects.</p>
              </a>

              <a href="/notes" className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg over:shadow-2xl hover:scale-105 transition-transform duration-200">
                <h3 className="text-xl font-semibold mb-4 ">Notes & Resources</h3>
                <p>Access study notes, tutorials, and more.</p>
              </a>

              <a href="/contests" className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg over:shadow-2xl hover:scale-105 transition-transform duration-200">
                <h3 className="text-xl font-semibold mb-4">Upcoming Contests</h3>
                <p>Stay updated with the latest coding contests.</p>
              </a>

              <a href="/jobs" className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg over:shadow-2xl hover:scale-105 transition-transform duration-200">
                <h3 className="text-xl font-semibold mb-4">Job Postings</h3>
                <p>Find the best tech job opportunities.</p>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
