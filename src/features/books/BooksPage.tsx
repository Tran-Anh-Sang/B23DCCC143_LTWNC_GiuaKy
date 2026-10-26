import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { BorrowedPanel } from '../borrow/components/BorrowedPanel';
import { selectBooksError, selectBooksStatus } from './booksSelectors';
import { fetchBooks } from './booksSlice';
import { BookList } from './components/BookList';
import { CategoryFilterBar } from './components/CategoryFilterBar';
import { SearchBar } from './components/SearchBar';

export function BooksPage() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectBooksStatus);
  const error = useAppSelector(selectBooksError);

  if (status === 'idle' || status === 'loading') {
    return <p className="status">Đang tải...</p>;
  }

  if (status === 'failed') {
    return (
      <div className="alert alert--error" role="alert">
        <span>Lỗi: {error}</span>
        <button type="button" className="btn btn-secondary" onClick={() => void dispatch(fetchBooks())}>
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <>
      <BorrowedPanel />
      <section className="panel" aria-label="Danh sách sách">
        <div className="panel__head">
          <h2>Danh sách sách</h2>
        </div>
        <div className="toolbar">
          <SearchBar />
          <CategoryFilterBar />
        </div>
        <BookList />
      </section>
    </>
  );
}
