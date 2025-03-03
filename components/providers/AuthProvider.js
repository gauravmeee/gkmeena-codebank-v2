'use client';

import { AuthProvider as FirebaseAuthProvider } from '@/lib/AuthContext';

export function AuthProvider({ children }) {
  return <FirebaseAuthProvider>{children}</FirebaseAuthProvider>;
} 