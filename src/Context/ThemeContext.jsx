/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  useEffect(() => {
    // Enforce dark mode permanently across the entire application
    const root = document.documentElement;
    root.classList.add("dark");
    root.style.colorScheme = "dark";

    // Clean up any old light/system preference so the app is strictly dark
    try {
      localStorage.setItem("civicpulse_theme", "dark");
    } catch {
      // ignore
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: "dark", resolvedTheme: "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
