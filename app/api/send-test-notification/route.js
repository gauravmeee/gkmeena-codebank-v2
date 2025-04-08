import { NextResponse } from 'next/server';
import admin from '@/lib/firebaseAdmin';

export async function POST(request) {
  try {
    const { token, data, type, notification } = await request.json();

    if (!token) {
      throw new Error('No FCM token provided');
    }

    console.log('Received notification request:', { type, data, notification });

    // Use provided notification or create one based on type and data
    const notificationPayload = notification || (() => {
      let title, body;
      switch (type) {
        case 'contest':
          title = 'Contest Notification';
          body = `${data.name} on ${data.platform}`;
          break;
        case 'job':
          title = 'Job Notification';
          body = `New job posting: ${data.role} at ${data.company}`;
          break;
        case 'platform':
          title = 'Platform Notification';
          body = `New contests available on ${data.platform}`;
          break;
        default:
          title = 'Test Notification';
          body = `Test notification for ${data.name || 'unknown'}`;
      }
      return { title, body };
    })();

    console.log('Building message payload...');

    const message = {
      token,
      notification: {
        title: notificationPayload.title,
        body: notificationPayload.body,
      },
      webpush: {
        headers: {
          Urgency: 'high'
        },
        notification: {
          title: notificationPayload.title,
          body: notificationPayload.body,
          icon: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://gkmeena-codebank-v2.vercel.app'}/assets/contests/default.png`,
          badge: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://gkmeena-codebank-v2.vercel.app'}/assets/contests/default.png`,
          vibrate: [100, 50, 100],
          requireInteraction: true,
          actions: [
            {
              action: 'view',
              title: 'View Details'
            },
            {
              action: 'dismiss',
              title: 'Dismiss'
            }
          ],
          data: {
            ...data,
            type,
            timestamp: new Date().toISOString(),
          }
        },
        fcmOptions: {
          link: data.url || '/contests'
        }
      },
      data: {
        ...data,
        type,
        timestamp: new Date().toISOString(),
      }
    };

    console.log('Sending message to FCM:', JSON.stringify(message, null, 2));
    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);
    
    return NextResponse.json({ success: true, messageId: response });
  } catch (error) {
    console.error('Error sending notification:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send notification' },
      { status: 500 }
    );
  }
} 