import { NextResponse } from 'next/server';
import admin from '@/lib/firebaseAdmin';

export async function POST(request) {
  try {
    // Parse the request body
    const { token, userId } = await request.json();

    // Validate the request
    if (!token || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields: token and userId' },
        { status: 400 }
      );
    }

    console.log(`Updating FCM token for user: ${userId}`);

    // Update the user document in Firestore
    const userRef = admin.firestore().collection('users').doc(userId);
    
    await userRef.set({
      fcmToken: token,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    console.log('FCM token updated successfully');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating FCM token:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update FCM token' },
      { status: 500 }
    );
  }
} 