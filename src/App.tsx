import { lazy, Suspense, useEffect } from 'react';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectBooksStatus } from './features/books/booksSelectors';
import { fetchBooks } from './features/books/booksSlice';
import { BooksPage } from './features/books/BooksPage';
import { ThemeToggle } from './features/theme/ThemeToggle';

// Trang Thống kê chỉ được tải khi người dùng vào /stats
const StatsPage = lazy(() => import('./features/stats/StatsPage'));

export default function App() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectBooksStatus);
  const { search } = useLocation();

  useEffect(() => {
    if (status === 'idle') {
      // Thêm ?fail=1 vào URL để giả lập API lỗi
      const shouldFail = new URLSearchParams(search).get('fail') === '1';
      void dispatch(fetchBooks({ shouldFail }));
    }
  }, [dispatch, status, search]);

  return (
    <div className="app">
      <header className="header">
        <div className="header__brand">
          <span aria-hidden="true">📚</span>
          <h1>Mini Library</h1>
        </div>
        <nav className="nav" aria-label="Điều hướng chính">
          <NavLink to="/" end>
            Thư viện
          </NavLink>
          <NavLink to="/stats">Thống kê</NavLink>
        </nav>
        <ThemeToggle />
      </header>
      <main className="main">
        <Suspense fallback={<p className="status">Đang tải...</p>}>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="*" element={<p className="empty">Không tìm thấy trang.</p>} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}
