"use client"
// ThemeContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';

interface ThemeContextProps {
  theme: string;
  setTheme: (theme: string) => void;
}

interface ThemeProviderProps {
  children: React.ReactNode,
}

const ThemeContext = createContext<ThemeContextProps>({ theme: 'light', setTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme);
      }
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark'); // Remove all classes
    root.classList.add(theme); // Add the current theme class
    localStorage.setItem('theme', theme); // Save the current theme in localStorage
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
