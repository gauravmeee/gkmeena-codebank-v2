
// Alternative getJobs function using native fetch instead of axios
async function getJobs() {
  try {
    // Using Next.js fetch with revalidation
    const response = await fetch('https://flask-jobs-api.onrender.com/', {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    return [];
  }
}


// Log environment only on the server side
console.log(`Running in ${process.env.NODE_ENV} mode`);

export default async function JobsPage() {
  // Fetch data on the server
  const jobs = await getJobs();


  

  return (
    <div className="min-h-screen container mx-auto p-6">
      <h2 className="text-2xl md:text-4xl font-semibold mb-4 text-center">Job Updates</h2>
      {jobs.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No jobs available at the moment.</p>
      ) : (
        <ul className="space-y-6">
          {jobs.map((job, index) => {
            const datePosted = new Date(job.date_posted); // Convert to Date object
            return (
            <li
              key={index}
              className="bg-white  dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{job.role}</h3>
              <p className="text-md text-gray-600 dark:text-gray-300">Company: {job.company}</p>
              <p className="text-md text-gray-600 dark:text-gray-300">Batch Eligible: {job.batch_eligible}</p>
              <p className="text-md text-gray-600 dark:text-gray-300">Location: {job.location}</p>
              {job.expected_stipend && (
                <p className="text-md text-gray-600 dark:text-gray-300">
                  Expected Stipend: {job.expected_stipend}
                </p>
              )}
              {job.expected_benefits && (
                <p className="text-md text-gray-600 dark:text-gray-300">
                  Extra Benefits: {job.expected_benefits}
                </p>
              )}
              <p className="text-md text-gray-600 dark:text-gray-300">Date Posted: {datePosted.getDate()}-{datePosted.getMonth()+1}-{datePosted.getFullYear()}</p>
              
              <a
                href={job.apply_link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
              >
                Apply Link
              </a>
            </li>
          );
          })}
        </ul>
      )}
    </div>
  );
};

