import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../services/firebaseConection';

type AuthenticateContextType = {
  isAuthenticated: boolean;
  loadingAuth: boolean;
};

type AuthenticateProviderProps = {
  children: React.ReactNode;
};

interface UserData {
  uid: string;
  email: string;
  name: string;
}

const AuthenticateContext = createContext({} as AuthenticateContextType);

export function AuthenticateProvider({ children }: AuthenticateProviderProps) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email || '',
          name: user.displayName || '',
        });
      } else {
        setUser(null);
      }
      setLoadingAuth(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthenticateContext.Provider
      value={{ isAuthenticated: !!user, loadingAuth }}
    >
      {children}
    </AuthenticateContext.Provider>
  );
}

export function useAuthenticate() {
  return useContext(AuthenticateContext);
}
