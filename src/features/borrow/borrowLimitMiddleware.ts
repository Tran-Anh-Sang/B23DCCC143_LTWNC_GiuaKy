import type { Middleware } from '@reduxjs/toolkit';
import type { RootState } from '../../app/rootReducer';
import { MAX_BORROW } from '../../types/book';
import { borrowBook, returnBook } from '../books/booksSlice';
import { setWarning } from './borrowSlice';

/**
 * Middleware tự viết: chặn thao tác mượn/trả không hợp lệ trước khi tới reducer.
 * - Mượn khi đã đủ MAX_BORROW cuốn: chặn + đặt cảnh báo.
 * - Mượn cuốn đã mượn / đã hết bản: chặn + đặt cảnh báo.
 * - Trả cuốn chưa mượn: bỏ qua.
 */
export const borrowLimitMiddleware: Middleware<object, RootState> = (storeApi) => (next) => (action) => {
  if (borrowBook.match(action)) {
    const { borrow, books } = storeApi.getState();

    if (borrow.borrowedIds.includes(action.payload)) {
      storeApi.dispatch(setWarning('Bạn đang mượn cuốn sách này rồi.'));
      return undefined;
    }
    if (borrow.borrowedIds.length >= MAX_BORROW) {
      storeApi.dispatch(setWarning(`Mỗi sinh viên chỉ được mượn tối đa ${MAX_BORROW} cuốn cùng lúc.`));
      return undefined; // không gọi next: action bị chặn
    }
    const book = books.items.find((item) => item.id === action.payload);
    if (!book || book.available <= 0) {
      storeApi.dispatch(setWarning('Sách này đã hết bản.'));
      return undefined;
    }
  }

  if (returnBook.match(action)) {
    if (!storeApi.getState().borrow.borrowedIds.includes(action.payload)) {
      return undefined;
    }
  }

  return next(action);
};
