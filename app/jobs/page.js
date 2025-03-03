// In an API route or server action where you update data
import { revalidateTag } from 'next/cache';
import JobCard from './JobCard';

// Server Action to update jobs and revalidate cache
export async function updateJobs() {
  try {
    await fetch("https://flask-jobs-api.onrender.com/update", { method: "POST" });
    revalidateTag("jobs");
    return { message: "Jobs updated and cache revalidated" };
  } catch (error) {
    console.error("Failed to update jobs:", error);
    return { message: "Failed to update jobs" };
  }
}

// Function to fetch jobs with caching
async function getJobs() {
  try {
    // Using Next.js fetch with revalidation
    const response = await fetch('https://flask-jobs-api.onrender.com/', {
      next: { 
        revalidate: 3600,
        tags: ['jobs'] // Add a cache tag
      }
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
    <div className="min-h-screen px-4 sm:px-6 py-6 max-w-7xl mx-auto backdrop-blur">
      <div className="flex items-center justify-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center">
          Tech Jobs
        </h2>
      </div>
      
      {jobs.length === 0 ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <p className="text-center text-base sm:text-lg text-gray-500">
            No jobs available at the moment.
          </p>
        </div>
      ) : (
        <ul className="space-y-4 sm:space-y-6">
          {jobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </ul>
      )}
    </div>
  );
}

