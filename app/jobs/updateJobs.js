'use server'

import { revalidateTag } from 'next/cache';

  
// Server Action to update jobs and revalidate cache
export default async function updateJobs() {
  try {
    await fetch("https://flask-jobs-api.onrender.com", { method: "POST" });
    revalidateTag("jobs");
    return { message: "Jobs updated and cache revalidated" };
  } catch (error) {
    console.error("Failed to update jobs:", error);
    return { message: "Failed to update jobs" };
  }
}