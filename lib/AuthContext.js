'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!auth) {
      setError('Firebase Authentication is not initialized');
      setLoading(false);
      return;
    }

    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
        setError(null);
      });

      return unsubscribe;
    } catch (err) {
      console.error('Auth state change error:', err);
      setError(err.message);
      setLoading(false);
    }
  }, []);

  async function signup(email, password, username) {
    if (!auth) {
      throw new Error('Firebase Authentication is not initialized');
    }

    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Create user profile in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        username,
        email,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      });
      return userCredential;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  async function login(email, password) {
    if (!auth) {
      throw new Error('Firebase Authentication is not initialized');
    }

    try {
      setError(null);
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  async function logout() {
    if (!auth) {
      throw new Error('Firebase Authentication is not initialized');
    }

    try {
      setError(null);
      return await signOut(auth);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  async function signInWithGoogle() {
    if (!auth) {
      throw new Error('Firebase Authentication is not initialized');
    }

    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      // Check for internet connectivity
      if (!navigator.onLine) {
        throw new Error('No internet connection. Please check your network and try again.');
      }

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      try {
        // Check if user profile exists in Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (!userDoc.exists()) {
          // Create user profile if it doesn't exist
          await setDoc(doc(db, 'users', user.uid), {
            username: user.displayName || user.email.split('@')[0],
            email: user.email,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            photoURL: user.photoURL || null
          });
        } else {
          // Update last login time
          await setDoc(doc(db, 'users', user.uid), {
            lastLogin: new Date().toISOString()
          }, { merge: true });
        }
      } catch (firestoreError) {
        console.error('Firestore operation failed:', firestoreError);
        // Don't throw here - the user is still authenticated, just couldn't update the profile
        // We'll just log the error and continue
      }

      return result;
    } catch (error) {
      console.error('Google sign-in error:', error);
      if (!navigator.onLine) {
        setError('No internet connection. Please check your network and try again.');
      } else if (error.code === 'auth/popup-blocked') {
        setError('Pop-up was blocked by your browser. Please allow pop-ups for this site.');
      } else if (error.code === 'auth/popup-closed-by-user') {
        setError('Sign-in was cancelled. Please try again.');
      } else if (error.code === 'auth/network-request-failed') {
        setError('Network error. Please check your internet connection and try again.');
      } else if (error.code === 'auth/internal-error') {
        setError('An internal error occurred. Please try again later.');
      } else {
        setError(error.message || 'Failed to sign in with Google. Please try again.');
      }
      throw error;
    }
  }

  async function resetPassword(email) {
    if (!auth) {
      throw new Error('Firebase Authentication is not initialized');
    }

    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  const value = {
    currentUser,
    loading,
    error,
    signup,
    login,
    logout,
    signInWithGoogle,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 