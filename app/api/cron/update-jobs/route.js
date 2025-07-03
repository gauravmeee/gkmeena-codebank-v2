import { NextResponse } from 'next/server';
import updateJobs from '@/app/jobs/updateJobs';

export async function POST() {
  const result = await updateJobs();
  return NextResponse.json(result);
}

export function GET() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
} 