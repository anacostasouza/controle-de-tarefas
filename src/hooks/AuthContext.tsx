/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, type ReactNode } from "react";
import { useAuth as useAuthHook } from "./useAuth";
import type { User } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  loginEmail: (email: string, password: string) => Promise<any>;
  loginGoogle: () => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, loginEmail, loginGoogle, logout } = useAuthHook();

  return (
    <AuthContext.Provider value={{ user, loginEmail, loginGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext deve ser usado dentro de um AuthProvider");
  }
  return context;
};
