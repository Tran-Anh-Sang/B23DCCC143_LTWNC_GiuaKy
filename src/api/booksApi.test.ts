import { fetchBooksApi } from './booksApi';
import { isFailure, isSuccess } from '../types/api';

describe('fetchBooksApi', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('trả về { ok: true, data } sau 500ms', async () => {
    const promise = fetchBooksApi();
    let settled = false;
    void promise.then(() => {
      settled = true;
    });

    await jest.advanceTimersByTimeAsync(499);
    expect(settled).toBe(false);
    await jest.advanceTimersByTimeAsync(1);

    const result = await promise;
    expect(isSuccess(result)).toBe(true);
    if (isSuccess(result)) {
      expect(result.data.length).toBeGreaterThan(0);
    }
  });

  it('trả về { ok: false, error } khi shouldFail = true', async () => {
    const promise = fetchBooksApi({ shouldFail: true });
    await jest.advanceTimersByTimeAsync(500);
    const result = await promise;
    expect(isFailure(result)).toBe(true);
  });
});
