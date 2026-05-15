"use client";

import { useState, useEffect, useCallback } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check localStorage first (user's explicit choice)
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      document.documentElement.setAttribute("data-theme", stored);
      return;
    }

    // Fall back to system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const systemTheme: Theme = prefersDark ? "dark" : "light";
    setTheme(systemTheme);
    document.documentElement.setAttribute("data-theme", systemTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }, [theme]);

  return { theme, toggleTheme, mounted };
}
