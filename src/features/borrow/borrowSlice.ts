import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { borrowBook, returnBook } from '../books/booksSlice';

export interface BorrowState {
  /** Id các cuốn sinh viên đang mượn. */
  borrowedIds: string[];
  /** Cảnh báo hiển thị cho người dùng (do middleware giới hạn mượn đặt). */
  warning: string | null;
}

export const initialState: BorrowState = {
  borrowedIds: [],
  warning: null,
};

const borrowSlice = createSlice({
  name: 'borrow',
  initialState,
  reducers: {
    setWarning(state, action: PayloadAction<string>) {
      state.warning = action.payload;
    },
    clearWarning(state) {
      state.warning = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(borrowBook, (state, action) => {
        if (!state.borrowedIds.includes(action.payload)) {
          state.borrowedIds.push(action.payload);
        }
        state.warning = null;
      })
      .addCase(returnBook, (state, action) => {
        state.borrowedIds = state.borrowedIds.filter((id) => id !== action.payload);
        state.warning = null;
      });
  },
});

export const { setWarning, clearWarning } = borrowSlice.actions;
export default borrowSlice.reducer;
