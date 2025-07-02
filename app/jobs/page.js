import JobsClient from './JobsClient';
import RefreshButton from './RefreshButton';


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

// Add this export to make the page dynamic
export const dynamic = 'force-dynamic';

export default async function JobsPage() {
  // Fetch data on the server
  const jobs = await getJobs();
  
  return (
    <div className="relative">
      <JobsClient initialJobs={jobs} />
      <div className="fixed bottom-4 right-4 z-50">
        <RefreshButton />
      </div>
    </div>
  );
}



