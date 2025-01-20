'use client';

import { useState, useEffect } from 'react';

export function useColorTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check system preference
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(darkModeMediaQuery.matches);

    // Listen for changes
    const listener = (e: MediaQueryListEvent) => setIsDark(e.matches);
    darkModeMediaQuery.addEventListener('change', listener);
    return () => darkModeMediaQuery.removeEventListener('change', listener);
  }, []);

  const theme = {
    layout: isDark ? 'bg-gray-900' : 'bg-gray-50',
    card: isDark ? 'bg-gray-800' : 'bg-white',
    text: isDark ? 'text-white' : 'text-gray-800',
    border: isDark ? 'border-gray-700' : 'border-gray-200',
    buttonBg: isDark ? 'bg-gray-700' : 'bg-white',
    buttonHover: isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-50',
    secondaryText: isDark ? 'text-gray-300' : 'text-gray-700',
    menuBg: isDark ? 'bg-gray-800' : 'bg-white',
    accent: 'bg-indigo-600 hover:bg-indigo-500',
    accentText: 'text-indigo-600',
    shadow: isDark ? '' : 'shadow-lg',
    transition: 'transition-all duration-200 ease-in-out'
  };

  return { theme, isDark };
}
