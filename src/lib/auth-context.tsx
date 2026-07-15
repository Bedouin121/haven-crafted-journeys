// Mock authentication context — swap for real auth later.
// Isolated intentionally so the shape (user, role, login, logout, isLoggedIn)
// maps cleanly onto whatever backend gets wired in.
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type MockRole = "user" | "admin";

export type MockUser = {
  id: string;
  name: string;
  email: string;
  role: MockRole;
  avatar?: string;
};

type AuthContextValue = {
  isLoggedIn: boolean;
  user: MockUser | null;
  role: MockRole | null;
  login: (email: string, _password: string, opts?: { asAdmin?: boolean }) => Promise<void>;
  signup: (name: string, email: string, _password: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: MockRole) => void; // dev helper for reviewing role-gated UI
};

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = "mock-auth-user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = (u: MockUser | null) => {
    setUser(u);
    try {
      if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const login: AuthContextValue["login"] = async (email, _password, opts) => {
    await new Promise((r) => setTimeout(r, 400));
    const isAdmin = opts?.asAdmin || email.toLowerCase().startsWith("admin");
    persist({
      id: "mock-" + email,
      name: email.split("@")[0].replace(/[.]/g, " "),
      email,
      role: isAdmin ? "admin" : "user",
    });
  };

  const signup: AuthContextValue["signup"] = async (name, email) => {
    await new Promise((r) => setTimeout(r, 400));
    persist({ id: "mock-" + email, name, email, role: "user" });
  };

  const logout = () => persist(null);
  const switchRole = (role: MockRole) => user && persist({ ...user, role });

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!user,
        user,
        role: user?.role ?? null,
        login,
        signup,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
