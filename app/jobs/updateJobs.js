'use server'

import { revalidateTag } from 'next/cache';
import admin from '@/lib/firebaseAdmin';

  
// Server Action to update jobs and revalidate cache
export default async function updateJobs() {
  try {
    await fetch("https://flask-jobs-api.onrender.com", { method: "POST" });
    revalidateTag("jobs");
    // Update Firestore with last refreshed time
    await admin.firestore().collection('public').doc('lastRefreshedJobs').set({
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    return { message: "Jobs updated and cache revalidated" };
  } catch (error) {
    console.error("Failed to update jobs:", error);
    return { message: "Failed to update jobs" };
  }
}

async function getJobs() {
  try {
    const response = await fetch('https://flask-jobs-api.onrender.com/', {
      next: { revalidate: 3600, tags: ['jobs'] }
    });
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
    const data = await response.json();
    // Ensure data is always an array
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    return [];
  }
}