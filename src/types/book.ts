export const CATEGORIES = ['CNTT', 'Kinh tế', 'Ngoại ngữ'] as const;

/** Thể loại sách. */
export type Category = (typeof CATEGORIES)[number];

/** Giá trị bộ lọc thể loại, gồm cả "Tất cả". */
export type CategoryFilter = 'Tất cả' | Category;

export const CATEGORY_FILTERS: readonly CategoryFilter[] = ['Tất cả', ...CATEGORIES];

export interface Book {
  id: string;
  title: string;
  author: string;
  category: Category;
  year: number;
  /** Tổng số bản của thư viện. */
  total: number;
  /** Số bản còn lại có thể mượn. */
  available: number;
}

/** Dữ liệu gốc của một đầu sách (chưa có số bản còn lại, mặc định còn đủ `total`). */
export type BookSeed = Omit<Book, 'available'>;

/** Tuỳ chọn cho bộ lọc: các trường đều không bắt buộc. */
export type BookFilters = Partial<{ keyword: string; category: CategoryFilter }>;

/** Thống kê số đầu sách theo thể loại. */
export type CategoryCounts = Record<Category, number>;

export const MAX_BORROW = 3;
