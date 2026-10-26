import { create } from 'zustand';
import type { CategoryFilter } from '../../types/book';

interface FilterState {
  keyword: string;
  category: CategoryFilter;
  setKeyword: (keyword: string) => void;
  setCategory: (category: CategoryFilter) => void;
  reset: () => void;
}

const initial = { keyword: '', category: 'Tất cả' } satisfies Pick<FilterState, 'keyword' | 'category'>;

/** Zustand store cho bộ lọc (từ khoá, thể loại). */
export const useFilterStore = create<FilterState>()((set) => ({
  ...initial,
  setKeyword: (keyword) => set({ keyword }),
  setCategory: (category) => set({ category }),
  reset: () => set(initial),
}));
