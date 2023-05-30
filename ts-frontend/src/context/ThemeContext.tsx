import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type ThemeContextType = [Theme, () => void];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
interface ThemeProps {
    children: React.ReactNode
}
export const ThemeProvider: React.FC<ThemeProps> = ({ children  }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const setMode = (mode: Theme) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const themeToggler = () => {
    theme === 'light' ? setMode('dark') : setMode('light');
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme') as Theme | null;
    setTheme(localTheme || 'light');
  }, []);

  return (
    <ThemeContext.Provider value={[theme, themeToggler]}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
      throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
  };