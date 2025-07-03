import { NextResponse } from 'next/server';
import updateContests from '@/app/contests/updateContests';

export async function POST() {
  const result = await updateContests();
  return NextResponse.json(result);
}

export function GET() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
} 