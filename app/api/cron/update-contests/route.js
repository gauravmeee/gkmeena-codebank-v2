import { NextResponse } from 'next/server';
import updateContests from '@/app/contests/updateContests';

export async function POST() {
  const result = await updateContests();
  return NextResponse.json(result);
}

export async function GET() {
  const result = await updateContests();
  return NextResponse.json(result);
}
