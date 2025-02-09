export default function InProgress() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-center text-gray-900 dark:text-white">
        <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-xl max-w-md mx-auto">
          <h1 className="text-4xl font-semibold mb-6">This Page is In Progress</h1>
          <p className="text-lg mb-6">We are working on it! Stay tuned for updates.</p>
          <div className="mt-6">
            <a href="/" className="bg-blue-400 text-white py-2 px-6 rounded-lg hover:bg-blue-500 transition">
              Go Back to Home
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
