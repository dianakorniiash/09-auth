'use client';


import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import React, { useEffect } from 'react';

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);

  useEffect(() => {
    const gethUser = async () => {
      try {const isAuthenticated = await checkSession();
      if (isAuthenticated) {

        const user = await getMe();
        if (user) setUser(user);
      } else {
        clearIsAuthenticated();
      }
  
      } catch {
        clearIsAuthenticated()
}
      
    };
   gethUser();
  }, [setUser, clearIsAuthenticated]);

  return children;
};

export default AuthProvider;