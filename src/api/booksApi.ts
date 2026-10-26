import { booksData } from '../mocks/booksData';
import type { ApiResult } from '../types/api';
import type { Book } from '../types/book';

export interface FetchBooksOptions {
  /** true: giả lập API thất bại. */
  shouldFail?: boolean;
  /** Độ trễ giả lập (ms), mặc định 500ms. */
  delayMs?: number;
}

export const DEFAULT_DELAY_MS = 500;

/**
 * API giả lập: trả về danh sách sách sau ~500ms.
 * Không bao giờ reject: lỗi được biểu diễn bằng { ok: false, error }.
 */
export function fetchBooksApi({
  shouldFail = false,
  delayMs = DEFAULT_DELAY_MS,
}: FetchBooksOptions = {}): Promise<ApiResult<Book[]>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (shouldFail) {
        resolve({ ok: false, error: 'Không thể tải danh sách sách. Vui lòng thử lại.' });
        return;
      }
      // Sao chép để mỗi lần gọi nhận dữ liệu độc lập
      resolve({ ok: true, data: booksData.map((book) => ({ ...book })) });
    }, delayMs);
  });
}
