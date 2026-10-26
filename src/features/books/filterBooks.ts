import type { Book, BookFilters } from '../../types/book';

/** Lọc sách theo từ khoá (tên hoặc tác giả, không phân biệt hoa thường) và thể loại. */
export function filterBooks(books: readonly Book[], { keyword = '', category = 'Tất cả' }: BookFilters): Book[] {
  const query = keyword.trim().toLowerCase();
  return books.filter((book) => {
    const matchCategory = category === 'Tất cả' || book.category === category;
    const matchKeyword =
      query === '' || book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query);
    return matchCategory && matchKeyword;
  });
}
