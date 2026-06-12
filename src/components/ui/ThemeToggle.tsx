"use client";
import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check initial layout theme preference
    const savedTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && systemDark)) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-full border border-border-ink bg-paper-node text-ink hover:text-accent hover:border-accent transition-all duration-300 shadow-sm cursor-pointer flex items-center justify-center"
      aria-label="Toggle visual theme"
    >
      {theme === "light" ? (
        <Moon className="w-4 h-4 transition-transform duration-300 hover:rotate-12" />
      ) : (
        <Sun className="w-4 h-4 transition-transform duration-300 hover:rotate-45" />
      )}
    </button>
  );
}
