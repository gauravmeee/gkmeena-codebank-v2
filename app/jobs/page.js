import JobsClient from './JobsClient';
import RefreshButton from './RefreshButton';
import admin from '@/lib/firebaseAdmin';

// Function to fetch jobs from Firestore
async function getJobs() {
  try {
    const docSnap = await admin.firestore().collection('public').doc('jobsData').get();
    if (docSnap.exists) {
      return docSnap.data().jobs || [];
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch jobs from Firestore:", error);
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
      <div className="fixed bottom-4 right-4 z-50">
        <RefreshButton />
      </div>
      <JobsClient initialJobs={jobs} />
    </div>
  );
}



