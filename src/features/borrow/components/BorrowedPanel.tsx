import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { MAX_BORROW } from '../../../types/book';
import { BookCard } from '../../books/components/BookCard';
import { selectBorrowedBooks, selectBorrowWarning } from '../../books/booksSelectors';
import { returnBook, borrowBook } from '../../books/booksSlice';
import { clearWarning } from '../borrowSlice';

/** Hiển thị cảnh báo giới hạn mượn và danh sách các cuốn đang mượn. */
export function BorrowedPanel() {
  const dispatch = useAppDispatch();
  const borrowedBooks = useAppSelector(selectBorrowedBooks);
  const warning = useAppSelector(selectBorrowWarning);

  const handleBorrow = useCallback((id: string) => dispatch(borrowBook(id)), [dispatch]);
  const handleReturn = useCallback((id: string) => dispatch(returnBook(id)), [dispatch]);

  return (
    <section className="panel" aria-label="Sách đang mượn">
      <div className="panel__head">
        <h2>
          Đang mượn ({borrowedBooks.length}/{MAX_BORROW})
        </h2>
      </div>

      {warning !== null && (
        <div className="alert alert--warning" role="alert">
          <span>{warning}</span>
          <button type="button" className="btn btn-ghost" onClick={() => dispatch(clearWarning())}>
            Đóng
          </button>
        </div>
      )}

      {borrowedBooks.length === 0 ? (
        <p className="empty">Bạn chưa mượn cuốn nào.</p>
      ) : (
        <div className="book-grid">
          {borrowedBooks.map((book) => (
            <BookCard key={book.id} book={book} isBorrowed onBorrow={handleBorrow} onReturn={handleReturn} />
          ))}
        </div>
      )}
    </section>
  );
}
