import JobsClient from './JobsClient';
import { revalidateTag } from 'next/cache';

// Server Action to update jobs and revalidate cache
export async function updateJobs() {
  try {
    await fetch("https://flask-jobs-api.onrender.com", { method: "POST" });
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

// Add this export to make the page dynamic
export const dynamic = 'force-dynamic';

export default async function JobsPage() {
  // Fetch data on the server
  const jobs = await getJobs();
  
  return <JobsClient initialJobs={jobs} />;
}

