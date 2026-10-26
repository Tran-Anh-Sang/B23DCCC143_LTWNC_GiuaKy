import { useAppSelector } from '../../app/hooks';
import { selectBooksError, selectBooksStatus, selectBorrowedBooks, selectCategoryCounts } from '../books/booksSelectors';
import { CATEGORIES, MAX_BORROW } from '../../types/book';

export default function StatsPage() {
  const status = useAppSelector(selectBooksStatus);
  const error = useAppSelector(selectBooksError);
  const counts = useAppSelector(selectCategoryCounts);
  const borrowed = useAppSelector(selectBorrowedBooks);

  if (status === 'idle' || status === 'loading') {
    return <p className="status">Đang tải...</p>;
  }
  if (status === 'failed') {
    return <div className="alert alert--error" role="alert">Lỗi: {error}</div>;
  }

  const totalTitles = CATEGORIES.reduce((sum, category) => sum + counts[category], 0);

  return (
    <section className="panel" aria-label="Thống kê">
      <div className="panel__head">
        <h2>Thống kê</h2>
      </div>
      <div className="stats-grid">
        {CATEGORIES.map((category) => (
          <div key={category} className="stat">
            <span className="stat__label">Đầu sách {category}</span>
            <span className="stat__value">{counts[category]}</span>
          </div>
        ))}
        <div className="stat">
          <span className="stat__label">Tổng số đầu sách</span>
          <span className="stat__value">{totalTitles}</span>
        </div>
        <div className="stat stat--accent">
          <span className="stat__label">Sách đang mượn</span>
          <span className="stat__value">
            {borrowed.length}/{MAX_BORROW}
          </span>
        </div>
      </div>
    </section>
  );
}
