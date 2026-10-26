import reducer, { borrowBook, fetchBooks, initialState, returnBook, type BooksState } from './booksSlice';
import type { Book } from '../../types/book';

const makeBook = (overrides: Partial<Book> = {}): Book => ({
  id: 'b1',
  title: 'Clean Code',
  author: 'Robert C. Martin',
  category: 'CNTT',
  year: 2008,
  total: 3,
  available: 2,
  ...overrides,
});

const stateWith = (items: Book[]): BooksState => ({ ...initialState, status: 'succeeded', items });

describe('booksSlice reducer', () => {
  it('trả về state ban đầu', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({ items: [], status: 'idle', error: null });
  });

  it('fetchBooks.pending: chuyển sang loading và xoá lỗi cũ', () => {
    const prev: BooksState = { ...initialState, status: 'failed', error: 'lỗi cũ' };
    const next = reducer(prev, fetchBooks.pending('req-1', undefined));
    expect(next.status).toBe('loading');
    expect(next.error).toBeNull();
  });

  it('fetchBooks.fulfilled: lưu danh sách sách và chuyển sang succeeded', () => {
    const books = [makeBook(), makeBook({ id: 'b2' })];
    const next = reducer({ ...initialState, status: 'loading' }, fetchBooks.fulfilled(books, 'req-1', undefined));
    expect(next.status).toBe('succeeded');
    expect(next.items).toEqual(books);
  });

  it('fetchBooks.rejected: lưu thông báo lỗi và chuyển sang failed', () => {
    const next = reducer(
      { ...initialState, status: 'loading' },
      fetchBooks.rejected(null, 'req-1', undefined, 'Không thể tải'),
    );
    expect(next.status).toBe('failed');
    expect(next.error).toBe('Không thể tải');
  });

  it('borrowBook: giảm số bản còn lại đúng 1', () => {
    const next = reducer(stateWith([makeBook({ available: 2 })]), borrowBook('b1'));
    expect(next.items[0].available).toBe(1);
  });

  it('borrowBook: không giảm xuống dưới 0 khi đã hết bản', () => {
    const next = reducer(stateWith([makeBook({ available: 0 })]), borrowBook('b1'));
    expect(next.items[0].available).toBe(0);
  });

  it('returnBook: tăng số bản còn lại đúng 1', () => {
    const next = reducer(stateWith([makeBook({ available: 1 })]), returnBook('b1'));
    expect(next.items[0].available).toBe(2);
  });

  it('returnBook: không vượt quá tổng số bản', () => {
    const next = reducer(stateWith([makeBook({ available: 3, total: 3 })]), returnBook('b1'));
    expect(next.items[0].available).toBe(3);
  });

  it('chỉ thay đổi đúng cuốn sách có id tương ứng', () => {
    const next = reducer(stateWith([makeBook({ id: 'b1' }), makeBook({ id: 'b2' })]), borrowBook('b2'));
    expect(next.items.map((b) => b.available)).toEqual([2, 1]);
  });
});
