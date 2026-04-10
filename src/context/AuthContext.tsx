import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isPremium: boolean;
  login: () => void;
  logout: () => void;
  upgrade: () => void;
  isAuthModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  const login = () => { 
    setIsAuthenticated(true); 
    setAuthModalOpen(false); 
  };
  
  const logout = () => { 
    setIsAuthenticated(false); 
    setIsPremium(false); 
  };
  
  const upgrade = () => { 
    setIsPremium(true); 
    setAuthModalOpen(false); 
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      isPremium, 
      login, 
      logout, 
      upgrade, 
      isAuthModalOpen, 
      setAuthModalOpen 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
