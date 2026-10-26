import { useContext } from 'react';
import { ThemeContext, type ThemeContextValue } from './ThemeContext';

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme phải được dùng bên trong <ThemeProvider>');
  }
  return context;
}
