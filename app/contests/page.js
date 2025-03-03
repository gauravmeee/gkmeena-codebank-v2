import { revalidateTag } from 'next/cache';
import ContestsClient from './ContestsClient';

// Server Action to update contests and revalidate cache
export async function updateJobs() {
  try {
    await fetch("https://flask-jobs-api.onrender.com/update", { method: "POST" });
    revalidateTag("contests");
    return { message: "Jobs updated and cache revalidated" };
  } catch (error) {
    console.error("Failed to update jobs:", error);
    return { message: "Failed to update jobs" };
  }
}

async function getContests() {
  try {
    const response = await fetch('https://flask-contest-api.onrender.com/', {
      next: { 
        revalidate: 3600,
        tags: ['contests']
      }
    });

    const data = await response.json();
    return data.contests || [];
  } catch (error) {
    console.error("Failed to fetch contests:", error);
    return [];
  }
}

export default async function ContestsPage() {
  const contests = await getContests();
  
  if (!contests.length) {
    return (
      <div className="flex justify-center items-center pt-40">
        <p className="text-xl text-red-500">No contests available at the moment.</p>
      </div>
    );
  }

  // Get all unique platforms for the filter dropdown
  const platforms = [...new Set(contests.map(contest => contest.platform))];

  return (      
      <ContestsClient initialContests={contests} platforms={platforms} />
  );
}

