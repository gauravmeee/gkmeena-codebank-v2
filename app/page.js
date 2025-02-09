import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>HackDeck - Your Coding Hub</title>
      </Head>

      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  {/* Hero Section */}
  <section className="text-center py-10">
    <div className="container mx-auto">
      <h2 className="text-4xl font-semibold mb-4">Welcome to HackDeck</h2>
      <p className="text-xl mb-6">Your ultimate platform for coding services, contests, job posts, and notes!</p>
      <a href="#services" className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-400 transition">Explore Services</a>
    </div>
  </section>

  {/* Services Section */}
  <section id="services" className="py-10 flex-grow">
    <div className="container mx-auto text-center">
      <h2 className="text-3xl font-semibold mb-10">Our Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition">
          <h3 className="text-xl font-semibold mb-4">Programming Services</h3>
          <p>Get professional coding services for your projects.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition">
          <h3 className="text-xl font-semibold mb-4">Upcoming Contests</h3>
          <p>Stay updated with the latest coding contests.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition">
          <h3 className="text-xl font-semibold mb-4">Job Postings</h3>
          <p>Find the best job opportunities in the tech industry.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition">
          <h3 className="text-xl font-semibold mb-4">Notes & Resources</h3>
          <p>Access study notes, tutorials, and resources to boost your skills.</p>
        </div>
      </div>
    </div>
  </section>

  {/* Footer */}
  <footer className="bg-gray-800 dark:bg-gray-700 text-white py-6 text-center pt-10">
    <p>&copy; 2025 HackDeck. All Rights Reserved.</p>
  </footer>
</div>



    </>
  );
}
