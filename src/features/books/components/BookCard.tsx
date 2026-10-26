import { memo } from 'react';
import type { Book } from '../../../types/book';

export interface BookCardProps {
  book: Readonly<Book>;
  /** Sinh viên đang mượn cuốn này? */
  isBorrowed: boolean;
  onBorrow: (id: string) => void;
  onReturn: (id: string) => void;
}

function BookCardBase({ book, isBorrowed, onBorrow, onReturn }: BookCardProps) {
  const outOfStock = book.available === 0;

  return (
    <article className="book-card">
      <div className="book-card__head">
        <h3 className="book-card__title">{book.title}</h3>
        <span className={`badge badge--${book.category === 'CNTT' ? 'it' : book.category === 'Kinh tế' ? 'eco' : 'lang'}`}>
          {book.category}
        </span>
      </div>
      <p className="book-card__meta">Tác giả: {book.author}</p>
      <p className="book-card__meta">Năm xuất bản: {book.year}</p>
      <p className={`book-card__stock${outOfStock ? ' book-card__stock--empty' : ''}`}>
        Còn lại: {book.available}/{book.total} bản
      </p>
      <div className="book-card__actions">
        {isBorrowed ? (
          <button type="button" className="btn btn-secondary" onClick={() => onReturn(book.id)}>
            Trả
          </button>
        ) : (
          <button type="button" className="btn btn-primary" disabled={outOfStock} onClick={() => onBorrow(book.id)}>
            Mượn
          </button>
        )}
      </div>
    </article>
  );
}

/** React.memo: chỉ render lại khi props thực sự đổi. */
export const BookCard = memo(BookCardBase);
