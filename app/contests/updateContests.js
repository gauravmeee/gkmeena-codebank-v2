'use server'

import { revalidateTag } from 'next/cache';
import admin from '@/lib/firebaseAdmin';

// Server Action to update contests and revalidate cache
export default async function updateContests() {
    try {
      await fetch("https://flask-contest-api.onrender.com/", { method: "POST" });
      revalidateTag("contests");
      // Update Firestore with last refreshed time
      await admin.firestore().collection('public').doc('lastRefreshedContests').set({
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
      return { message: "Contests updated and cache revalidated" };
    } catch (error) {
      console.error("Failed to update Contests:", error);
      return { message: "Failed to update Contests" };
    }
  }