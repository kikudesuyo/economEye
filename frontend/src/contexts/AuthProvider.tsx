import { useState, ReactNode, useEffect, useMemo } from "react";
import firebase from "firebase/auth";
import { FirebaseAuth } from "@/auth/auth";
import { AuthContext } from "@/contexts/AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const firebaseAuth = useMemo(() => new FirebaseAuth(), []);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebaseAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [firebaseAuth]);

  const login = async (email: string, password: string) => {
    await firebaseAuth.login(email, password);
  };

  const logout = async () => {
    await firebaseAuth.logout();
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, user, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
