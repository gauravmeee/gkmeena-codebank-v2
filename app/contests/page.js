import ContestsClient from './ContestsClient';
import RefreshButton from './RefreshButton';
import admin from '@/lib/firebaseAdmin';

// Function to fetch contests from Firestore
async function getContests() {
  try {
    const docSnap = await admin.firestore().collection('public').doc('contestsData').get();
    if (docSnap.exists) {
      return docSnap.data().contests || [];
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch contests from Firestore:", error);
    return [];
  }
}

export const dynamic = 'force-dynamic';

export default async function ContestsPage() {
  const contests = await getContests();
  const normalizedContests = contests.map(contest => ({
    ...contest,
    platform: contest.platform.trim(),
    contestName: contest.contestName.trim()
  }));
  const platforms = [...new Set(normalizedContests.map(contest => contest.platform))].sort();

  return (
    <div className="relative">
      <div className="fixed bottom-4 right-4 z-50">
        <RefreshButton />
      </div>
      <ContestsClient initialContests={normalizedContests} platforms={platforms} />
    </div>
  );
}

