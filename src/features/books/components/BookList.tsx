import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useDebounce } from '../../../hooks/useDebounce';
import { useFilterStore } from '../../filters/filterStore';
import { borrowBook, returnBook } from '../booksSlice';
import { selectBooks, selectBorrowedIds } from '../booksSelectors';
import { filterBooks } from '../filterBooks';
import { BookCard } from './BookCard';

export function BookList() {
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectBooks);
  const borrowedIds = useAppSelector(selectBorrowedIds);
  const keyword = useFilterStore((s) => s.keyword);
  const category = useFilterStore((s) => s.category);

  // Debounce 300ms cho ô tìm kiếm
  const debouncedKeyword = useDebounce(keyword, 300);

  // Danh sách sau khi lọc chỉ tính lại khi dữ liệu hoặc bộ lọc đổi
  const visibleBooks = useMemo(
    () => filterBooks(books, { keyword: debouncedKeyword, category }),
    [books, debouncedKeyword, category],
  );

  // Handler ổn định để React.memo của BookCard có tác dụng
  const handleBorrow = useCallback((id: string) => dispatch(borrowBook(id)), [dispatch]);
  const handleReturn = useCallback((id: string) => dispatch(returnBook(id)), [dispatch]);

  if (visibleBooks.length === 0) {
    return <p className="empty">Không tìm thấy sách phù hợp.</p>;
  }

  return (
    <div className="book-grid">
      {visibleBooks.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          isBorrowed={borrowedIds.includes(book.id)}
          onBorrow={handleBorrow}
          onReturn={handleReturn}
        />
      ))}
    </div>
  );
}
