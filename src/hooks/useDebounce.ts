import { useEffect, useState } from 'react';

/** Trả về `value` sau khi nó không thay đổi trong `delay` ms (mặc định 300ms). */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
