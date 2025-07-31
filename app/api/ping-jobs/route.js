import { redirect } from 'next/navigation';

export async function GET() {
  redirect('https://flask-jobs-api.onrender.com/');
} 