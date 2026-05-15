"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

// Toggles the `dark` class on <html> and persists the choice.
// The no-flash decision is made by the inline script in app/layout.js
// before paint; this just keeps the UI in sync after hydration.
export function ThemeToggle({ className = "" }) {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("cu-theme", next ? "dark" : "light");
    } catch {
      /* storage unavailable — preference simply won't persist */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground/80 transition-colors hover:bg-cu-surface-vault hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cu-brandy-light ${className}`}
    >
      {mounted && isDark ? (
        <Moon size={17} strokeWidth={1.6} />
      ) : (
        <Sun size={17} strokeWidth={1.6} />
      )}
    </button>
  );
}
