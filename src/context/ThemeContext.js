import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

const useTheme = () => useContext(ThemeContext);

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      setTheme(theme);
    } else {
      setTheme('light');
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeProvider, useTheme };
