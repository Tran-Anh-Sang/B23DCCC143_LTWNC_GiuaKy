import { combineReducers } from '@reduxjs/toolkit';
import booksReducer from '../features/books/booksSlice';
import borrowReducer from '../features/borrow/borrowSlice';

export const rootReducer = combineReducers({
  books: booksReducer,
  borrow: borrowReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
