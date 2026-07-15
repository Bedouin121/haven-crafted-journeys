import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";
type ThemeContextValue = { theme: Theme; toggle: () => void; setTheme: (t: Theme) => void };

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "site-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  // SSR-safe: start light, hydrate the persisted value in an effect.
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
      const initial =
        stored ??
        (window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      setThemeState(initial);
    } catch {}
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
  }, [theme]);

  const setTheme = (t: Theme) => setThemeState(t);
  const toggle = () => setThemeState((t) => (t === "dark" ? "light" : "dark"));

  return <ThemeContext.Provider value={{ theme, toggle, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}
