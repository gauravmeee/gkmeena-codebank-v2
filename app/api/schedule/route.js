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
          title = 'Notification';
          body = 'You have a new notification';
      }
      return { title, body };
    })();

    console.log('Building message payload...');

    // Normalize the platform for icon selection
    const platform = (data.platform || 'default').toLowerCase();
    const origin = request.nextUrl.origin;

    // Generate absolute URLs for icons
    const iconUrl = `${origin}/assets/contests/${platform}.png`;
    const badgeUrl = `${origin}/assets/contests/badge.png`;
    const defaultIconUrl = `${origin}/assets/contests/default.png`;

    // Generate a unique notification ID
    const notificationId = `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Calculate delivery time and TTL
    const deliveryTime = data.scheduledTime ? parseInt(data.scheduledTime) : Date.now();
    const ttl = Math.max(deliveryTime - Date.now() + (60 * 60 * 1000), 60 * 1000); // minimum 1 minute TTL

    // Construct the message with proper configuration for background delivery
    const message = {
      token,
      android: {
        priority: 'high',
        ttl: ttl,
        notification: {
          icon: '@drawable/ic_notification',
          color: '#4CAF50',
          priority: 'high',
          defaultSound: true,
          channelId: 'default',
          visibility: 'public',
          importance: 'high',
          icon: iconUrl // Add icon URL for Android
        },
        data: {
          click_action: 'FLUTTER_NOTIFICATION_CLICK',
          id: notificationId,
          status: 'done',
          icon: iconUrl, // Add icon URL in data payload
          ...data
        }
      },
      apns: {
        headers: {
          'apns-priority': '10',
          'apns-expiration': Math.floor((Date.now() + ttl) / 1000)
        },
        payload: {
          aps: {
            alert: {
              title: notificationPayload.title,
              body: notificationPayload.body
            },
            sound: 'default',
            badge: 1,
            'mutable-content': 1,
            'content-available': 1
          },
          notificationId,
          icon: iconUrl, // Add icon URL for iOS
          ...data
        }
      },
      webpush: {
        headers: {
          Urgency: 'high',
          TTL: ttl.toString()
        },
        notification: {
          title: notificationPayload.title,
          body: notificationPayload.body,
          icon: iconUrl,
          badge: badgeUrl,
          image: data.image,
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
            url: data.url || '/contests',
            type,
            platform,
            id: notificationId,
            timestamp: new Date().toISOString(),
            scheduledTime: deliveryTime,
            icon: iconUrl, // Add icon URL in data
            badge: badgeUrl, // Add badge URL in data
            ...data
          },
          tag: type === 'contest' ? 'contest-reminder' : `${type}-notification`,
          timestamp: deliveryTime
        },
        fcmOptions: {
          link: data.url || '/contests'
        }
      },
      data: {
        type,
        platform,
        url: data.url || '/contests',
        id: notificationId,
        timestamp: new Date().toISOString(),
        scheduledTime: deliveryTime.toString(),
        title: notificationPayload.title,
        body: notificationPayload.body,
        icon: iconUrl, // Add icon URL in root data
        badge: badgeUrl, // Add badge URL in root data
        ...data
      }
    };

    console.log('Sending message to FCM:', JSON.stringify(message, null, 2));

    // Implement exponential backoff retry logic
    const maxRetries = 3;
    let lastError = null;
    let response = null;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        if (attempt > 0) {
          // Wait with exponential backoff
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }

        response = await admin.messaging().send(message);
        console.log(`Successfully sent message on attempt ${attempt + 1}:`, response);
        break;
      } catch (error) {
        lastError = error;
        console.error(`Attempt ${attempt + 1} failed:`, error);

        // Don't retry for invalid tokens or other permanent errors
        if (error.code === 'messaging/invalid-argument' || 
            error.code === 'messaging/registration-token-not-registered') {
          throw error;
        }

        // If this was the last attempt, throw the error
        if (attempt === maxRetries - 1) {
          throw error;
        }
      }
    }

    // Store the notification in Firestore for tracking
    try {
      await admin.firestore().collection('notifications').doc(notificationId).set({
        token,
        type,
        platform,
        status: 'sent',
        scheduledTime: deliveryTime,
        sentAt: admin.firestore.FieldValue.serverTimestamp(),
        messageId: response,
        payload: {
          title: notificationPayload.title,
          body: notificationPayload.body,
          data: data
        }
      });
    } catch (error) {
      console.error('Error storing notification record:', error);
      // Don't fail the request if storage fails
    }

    return NextResponse.json({ 
      success: true, 
      messageId: response,
      notificationId,
      scheduledTime: deliveryTime,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    
    // Enhanced error response
    const errorResponse = {
      error: error.message || 'Failed to send notification',
      code: error.code,
      timestamp: new Date().toISOString()
    };

    // Specific status codes for different error types
    let status = 500;
    if (error.code === 'messaging/invalid-argument') status = 400;
    if (error.code === 'messaging/registration-token-not-registered') status = 404;

    return NextResponse.json(errorResponse, { status });
  }
} 