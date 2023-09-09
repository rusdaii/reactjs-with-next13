'use client';

import useAuthStore from '@/lib/authStore';
import { useEffect } from 'react';

export default function AuthStore({ isAuth }) {
  const { setIsLoggedIn } = useAuthStore();
  useEffect(() => {
    setIsLoggedIn(isAuth);
  }, [setIsLoggedIn, isAuth]);

  return null;
}
