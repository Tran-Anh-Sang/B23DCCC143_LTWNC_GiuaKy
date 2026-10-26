import { useTheme } from './useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button type="button" className="btn btn-ghost" onClick={toggleTheme}>
      {theme === 'light' ? '🌙 Giao diện tối' : '☀️ Giao diện sáng'}
    </button>
  );
}
