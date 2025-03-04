'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import AdminNav from '@/components/admin/AdminNav';
import { toast } from 'sonner';

export default function AdminLayout({ children }) {
  const { currentUser, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!currentUser) {
        setCheckingAdmin(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setIsAdmin(userDoc.data().isAdmin || false);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        toast.error('Failed to verify admin status');
      } finally {
        setCheckingAdmin(false);
      }
    };

    checkAdminStatus();
  }, [currentUser]);

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/login');
    } else if (!checkingAdmin && !isAdmin) {
      toast.error('Access denied. Admin privileges required.');
      router.push('/');
    }
  }, [currentUser, loading, isAdmin, checkingAdmin, router]);

  if (loading || checkingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!currentUser || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      <main>{children}</main>
    </div>
  );
} 