import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getCurrentUser, signIn, signOut } from "../libs/puter.action";
import type { AuthContextType, User } from "../types";

const AuthContext = createContext<AuthContextType | null>(null);

const waitForPuter = (): Promise<void> =>
  new Promise((resolve) => {
    if (typeof window !== "undefined" && window.puter) return resolve();
    const interval = setInterval(() => {
      if (typeof window !== "undefined" && window.puter) {
        clearInterval(interval);
        resolve();
      }
    }, 100);
  });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    waitForPuter().then(() =>
      getCurrentUser().then((u) => {
        setUser(u);
        setLoading(false);
      })
    );
  }, []);

  const handleSignIn = async () => {
    await waitForPuter();
    await signIn();
    const u = await getCurrentUser();
    setUser(u);
  };

  const handleSignOut = async () => {
    await waitForPuter();
    await signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, handleSignIn, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
