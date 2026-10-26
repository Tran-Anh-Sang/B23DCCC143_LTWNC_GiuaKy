import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchBooksApi, type FetchBooksOptions } from '../../api/booksApi';
import { isSuccess } from '../../types/api';
import type { Book } from '../../types/book';

export type LoadStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface BooksState {
  items: Book[];
  status: LoadStatus;
  error: string | null;
}

export const initialState: BooksState = {
  items: [],
  status: 'idle',
  error: null,
};

/** Lấy danh sách sách từ API giả lập; dùng type guard để phân biệt thành công / thất bại. */
export const fetchBooks = createAsyncThunk<Book[], FetchBooksOptions | undefined, { rejectValue: string }>(
  'books/fetchBooks',
  async (options, { rejectWithValue }) => {
    const result = await fetchBooksApi(options);
    if (isSuccess(result)) {
      return result.data;
    }
    return rejectWithValue(result.error);
  },
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    /** Mượn sách: giảm số bản còn lại 1 (không xuống dưới 0). */
    borrowBook(state, action: PayloadAction<string>) {
      const book = state.items.find((item) => item.id === action.payload);
      if (book && book.available > 0) {
        book.available -= 1;
      }
    },
    /** Trả sách: tăng số bản còn lại 1 (không vượt quá tổng số bản). */
    returnBook(state, action: PayloadAction<string>) {
      const book = state.items.find((item) => item.id === action.payload);
      if (book && book.available < book.total) {
        book.available += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? action.error.message ?? 'Đã xảy ra lỗi không xác định';
      });
  },
});

export const { borrowBook, returnBook } = booksSlice.actions;
export default booksSlice.reducer;
