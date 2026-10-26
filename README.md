# Mini Library

Ứng dụng tra cứu và mượn/trả sách (React 18 + TypeScript + Vite).

## Chạy

```bash
npm install
npm run dev        # chạy ứng dụng
npm test           # chạy test (Jest + React Testing Library)
npm run test:coverage
npm run build      # typecheck + build
```

Thêm `?fail=1` vào URL (vd. `http://localhost:5173/?fail=1`) để giả lập API lỗi.

## Cấu trúc (feature-based)

```
src/
  api/booksApi.ts              API giả lập (Promise + setTimeout 500ms, tham số shouldFail)
  types/                       ApiResult<T> + type guard, Book, Category, Utility Types
  app/                         rootReducer, store (makeStore), typed hooks
  features/
    books/                     booksSlice (createSlice + createAsyncThunk), selectors, filterBooks, components
    borrow/                    borrowSlice, borrowLimitMiddleware (giới hạn 3 cuốn), BorrowedPanel
    filters/filterStore.ts     Zustand: từ khoá + thể loại
    theme/                     ThemeContext (useMemo), useTheme, ThemeToggle
    stats/StatsPage.tsx        /stats, lazy load bằng React.lazy + Suspense
  hooks/useDebounce.ts         useDebounce<T>
```

## Đối chiếu yêu cầu kỹ thuật

| Yêu cầu | Vị trí |
|---|---|
| ApiResult generic + type guard | `types/api.ts` (`isSuccess`, `isFailure`) |
| Utility Types | `Omit` (BookSeed), `Partial` (BookFilters), `Record` (CategoryCounts), `Readonly` (BookCard) |
| RTK: createSlice, createAsyncThunk (pending/fulfilled/rejected) | `features/books/booksSlice.ts` |
| Middleware tự viết giới hạn 3 cuốn | `features/borrow/borrowLimitMiddleware.ts` |
| Zustand cho bộ lọc | `features/filters/filterStore.ts` |
| Context theme + useMemo + useTheme | `features/theme/` |
| useDebounce<T> | `hooks/useDebounce.ts` |
| useMemo / React.memo / useCallback / key | `BookList.tsx`, `BookCard.tsx` |
| React.lazy + Suspense | `App.tsx` |
| Test | `*.test.ts(x)` cạnh file được test |
