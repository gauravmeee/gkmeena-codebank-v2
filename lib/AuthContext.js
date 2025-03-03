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
      const result = await signInWithPopup(auth, provider);
      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      if (!userDoc.exists()) {
        // Create new user profile if doesn't exist
        await setDoc(doc(db, 'users', result.user.uid), {
          username: result.user.displayName,
          email: result.user.email,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        });
      }
      return result;
    } catch (error) {
      setError(error.message);
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