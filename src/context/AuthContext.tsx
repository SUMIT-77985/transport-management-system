"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("tm_user");
      if (stored) setUser(stored);
    } catch (e) {
      // ignore (SSR safety)
    }
  }, []);

  const login = (username: string) => {
    setUser(username);
    try {
      localStorage.setItem("tm_user", username);
    } catch (e) {}
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("tm_user");
    } catch (e) {}
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
