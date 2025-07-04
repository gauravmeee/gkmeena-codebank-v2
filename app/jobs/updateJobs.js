'use server'

import { revalidateTag } from 'next/cache';
import admin from '@/lib/firebaseAdmin';

  
// Server Action to update jobs and revalidate cache
export default async function updateJobs() {
  try {
    // Fetch latest jobs from external API
    const response = await fetch("https://flask-jobs-api.onrender.com/");
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
    const jobs = await response.json();

    // Get current jobs from Firestore
    const docRef = admin.firestore().collection('public').doc('jobsData');
    const docSnap = await docRef.get();
    const currentJobs = docSnap.exists ? docSnap.data().jobs : [];

    // Compare new data with current data
    const isChanged = JSON.stringify(currentJobs) !== JSON.stringify(jobs);
    // Always update jobs and updatedAt if fetch is successful
    await docRef.set({
      jobs,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    // Always revalidate cache
    revalidateTag("jobs");
    return { message: isChanged ? "Jobs updated and cache revalidated" : "No changes in jobs data, but time updated" };
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