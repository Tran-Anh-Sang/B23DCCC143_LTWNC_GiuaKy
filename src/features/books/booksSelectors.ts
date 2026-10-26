import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/rootReducer';
import { CATEGORIES, type Book, type CategoryCounts } from '../../types/book';

export const selectBooks = (state: RootState) => state.books.items;
export const selectBooksStatus = (state: RootState) => state.books.status;
export const selectBooksError = (state: RootState) => state.books.error;
export const selectBorrowedIds = (state: RootState) => state.borrow.borrowedIds;
export const selectBorrowWarning = (state: RootState) => state.borrow.warning;

/** Các cuốn sách đang mượn (theo thứ tự mượn). */
export const selectBorrowedBooks = createSelector([selectBooks, selectBorrowedIds], (books, ids): Book[] =>
  ids.map((id) => books.find((book) => book.id === id)).filter((book): book is Book => book !== undefined),
);

/** Số đầu sách theo từng thể loại. */
export const selectCategoryCounts = createSelector([selectBooks], (books): CategoryCounts => {
  const counts = Object.fromEntries(CATEGORIES.map((category) => [category, 0])) as CategoryCounts;
  for (const book of books) {
    counts[book.category] += 1;
  }
  return counts;
});
