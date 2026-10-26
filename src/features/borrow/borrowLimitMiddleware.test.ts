import { makeStore } from '../../app/store';
import { borrowBook, initialState as booksInitial, returnBook } from '../books/booksSlice';
import type { Book } from '../../types/book';

const makeBooks = (count: number): Book[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `b${i + 1}`,
    title: `Sách ${i + 1}`,
    author: 'Tác giả',
    category: 'CNTT' as const,
    year: 2020,
    total: 2,
    available: 2,
  }));

const setup = () => makeStore({ books: { ...booksInitial, status: 'succeeded', items: makeBooks(5) } });

describe('borrowLimitMiddleware', () => {
  it('cho phép mượn đến 3 cuốn', () => {
    const store = setup();
    ['b1', 'b2', 'b3'].forEach((id) => store.dispatch(borrowBook(id)));

    expect(store.getState().borrow.borrowedIds).toEqual(['b1', 'b2', 'b3']);
    expect(store.getState().borrow.warning).toBeNull();
  });

  it('chặn cuốn thứ 4: không đổi số bản, không thêm vào danh sách, có cảnh báo', () => {
    const store = setup();
    ['b1', 'b2', 'b3'].forEach((id) => store.dispatch(borrowBook(id)));
    store.dispatch(borrowBook('b4'));

    const state = store.getState();
    expect(state.borrow.borrowedIds).toHaveLength(3);
    expect(state.borrow.borrowedIds).not.toContain('b4');
    expect(state.books.items.find((b) => b.id === 'b4')?.available).toBe(2);
    expect(state.borrow.warning).toMatch(/tối đa 3/);
  });

  it('trả một cuốn thì mượn được cuốn khác và cảnh báo được xoá', () => {
    const store = setup();
    ['b1', 'b2', 'b3'].forEach((id) => store.dispatch(borrowBook(id)));
    store.dispatch(borrowBook('b4')); // bị chặn
    store.dispatch(returnBook('b1'));
    store.dispatch(borrowBook('b4'));

    const state = store.getState();
    expect(state.borrow.borrowedIds).toEqual(['b2', 'b3', 'b4']);
    expect(state.borrow.warning).toBeNull();
    expect(state.books.items.find((b) => b.id === 'b1')?.available).toBe(2);
  });

  it('chặn mượn trùng cuốn đã mượn và bỏ qua trả cuốn chưa mượn', () => {
    const store = setup();
    store.dispatch(borrowBook('b1'));
    store.dispatch(borrowBook('b1'));
    store.dispatch(returnBook('b2'));

    const state = store.getState();
    expect(state.books.items.find((b) => b.id === 'b1')?.available).toBe(1);
    expect(state.books.items.find((b) => b.id === 'b2')?.available).toBe(2);
  });
});
