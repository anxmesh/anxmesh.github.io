"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";
import styles from "@/styles/components/ThemeToggle.module.css";

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();
  const [animating, setAnimating] = useState(false);
  const [displayTheme, setDisplayTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (mounted) setDisplayTheme(theme);
  }, [theme, mounted]);

  if (!mounted) return <div className={styles.placeholder} />;

  function handleClick() {
    setAnimating(true);

    // After exit animation, switch theme and play enter
    setTimeout(() => {
      toggleTheme();
      setAnimating(false);
    }, 400);
  }

  // Determine which icon to show and which animation class
  const isSun = displayTheme === "light";
  let animClass = "";

  if (animating) {
    // Currently exiting
    animClass = isSun ? styles.sunExit : styles.moonExit;
  } else {
    // Entered / idle
    animClass = isSun ? styles.sunEnter : styles.moonEnter;
  }

  return (
    <button
      className={styles.toggle}
      onClick={handleClick}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      disabled={animating}
    >
      <span className={`${styles.iconWrapper} ${animClass}`}>
        {isSun ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </span>
    </button>
  );
}
