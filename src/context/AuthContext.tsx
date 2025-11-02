import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'westelle_user_session';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize from sessionStorage on mount
    // This keeps user logged in during the browser session
    try {
      const storedUser = sessionStorage.getItem(USER_STORAGE_KEY);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Error loading user from session:', error);
      return null;
    }
  });

  // Save to sessionStorage whenever user changes
  useEffect(() => {
    if (user) {
      sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      sessionStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem(USER_STORAGE_KEY);
  };

  const updateUser = (userData: User) => {
    setUser(userData);
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        login, 
        logout, 
        updateUser 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}