import { createContext } from "react";
import firebase from "firebase/auth";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  user: firebase.User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);
