import { db } from './firebase';
import { doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import { toast } from 'sonner';

export async function createUserDocument(userId, email) {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      await setDoc(userRef, {
        email,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        isAdmin: false
      });
      toast.success('User document created successfully');
    }
  } catch (error) {
    console.error('Error creating user document:', error);
    toast.error('Failed to create user document');
    throw error;
  }
}

export async function makeUserAdmin(userId) {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      isAdmin: true
    });
    toast.success('User has been made admin successfully');
  } catch (error) {
    console.error('Error making user admin:', error);
    toast.error('Failed to make user admin');
    throw error;
  }
} 