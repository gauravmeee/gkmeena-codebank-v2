import ContestsClient from './ContestsClient';
import RefreshButton from './RefreshButton';
import admin from '@/lib/firebaseAdmin';


// Function to fetch jobs with caching
async function getContests() {
  try {
    // Using Next.js fetch with revalidation
    const response = await fetch('https://flask-contest-api.onrender.com/', {
      next: { 
        revalidate: 3600,
        tags: ['contests'] 
      }
    });

    const data = await response.json();
    // Update Firestore with last refreshed time on every fetch
    try {
      await admin.firestore().collection('public').doc('lastRefreshedContests').set({
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    } catch (firestoreError) {
      console.error('Failed to update Firestore lastRefreshedContests:', firestoreError);
    }
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

  // Normalize contests data
  const normalizedContests = contests.map(contest => ({
    ...contest,
    platform: contest.platform.trim(),
    contestName: contest.contestName.trim()
  }));

  // Get all unique normalized platforms
  const platforms = [...new Set(
    normalizedContests.map(contest => contest.platform)
  )].sort();

  return (
    <div className="relative">
      <ContestsClient initialContests={normalizedContests} platforms={platforms} />
      <div className="fixed bottom-4 right-4 z-50">
        <RefreshButton />
      </div>
    </div>
  );
}

