import * as React from 'react';

const THEME_CLASSES = ['theme-light', 'theme-dark', 'theme-auto'];
const STORAGE_KEY = 'ods-showcase-theme';
const DEFAULT_THEME = 'theme-light';

export const useTheme = () => {
  const [theme, setTheme] = React.useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_THEME;
  });

  React.useEffect(() => {
    document.body.classList.remove(...THEME_CLASSES);
    document.body.classList.add(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return { theme, setTheme };
};

