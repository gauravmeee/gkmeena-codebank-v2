'use client';

import { useAuth } from '@/lib/AuthContext';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AuthButtons({ className = '', variant = 'default' }) {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (currentUser) {
    if (variant === 'hero') {
      return (
        <div className="text-lg font-medium whitespace-nowrap">
          <span className="text-primary">Hello</span>, {currentUser.displayName || currentUser.email.split('@')[0]}!
        </div>
      );
    }
    return (
      <Button
        onClick={handleLogout}
        variant="outline"
        className="hover:bg-destructive hover:text-destructive-foreground"
      >
        Logout
      </Button>
    );
  }

  if (variant === 'navbar') {
    return (
      <Link href="/login">
        <Button variant="ghost" className="hover:bg-accent">
          Sign In
        </Button>
      </Link>
    );
  }

  if (variant === 'hero') {
    return (
      <Link href="/signup">
        <Button className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
          Get Started
        </Button>
      </Link>
    );
  }

  // Default variant shows both buttons
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Link href="/login">
        <Button variant="ghost" className="hover:bg-accent">
          Sign In
        </Button>
      </Link>
      <Link href="/signup">
        <Button className="bg-primary hover:bg-primary/90">
          Get Started
        </Button>
      </Link>
    </div>
  );
} 