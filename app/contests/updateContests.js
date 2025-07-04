'use server'

import { revalidateTag } from 'next/cache';
import admin from '@/lib/firebaseAdmin';

// Server Action to update contests and revalidate cache
export default async function updateContests() {
    try {
      // Fetch latest contests from external API
      const response = await fetch("https://flask-contest-api.onrender.com/");
      if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
      const data = await response.json();
      const contests = data.contests || [];

      // Get current contests from Firestore
      const docRef = admin.firestore().collection('public').doc('contestsData');
      const docSnap = await docRef.get();
      const currentContests = docSnap.exists ? docSnap.data().contests : [];

      // Compare new data with current data
      const isChanged = JSON.stringify(currentContests) !== JSON.stringify(contests);
      // Always update contests and updatedAt if fetch is successful
      await docRef.set({
        contests,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
      // Always revalidate cache
      revalidateTag("contests");
      return { message: isChanged ? "Contests updated and cache revalidated" : "No changes in contests data, but time updated" };
    } catch (error) {
      console.error("Failed to update Contests:", error);
      return { message: "Failed to update Contests" };
    }
}