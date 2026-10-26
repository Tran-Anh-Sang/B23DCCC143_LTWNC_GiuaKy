/** Kết quả thành công của API. */
export interface ApiSuccess<T> {
  ok: true;
  data: T;
}

/** Kết quả thất bại của API. */
export interface ApiFailure {
  ok: false;
  error: string;
}

/** Kiểu trả về generic của mọi API: thành công hoặc thất bại. */
export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

/** Type guard: thu hẹp ApiResult<T> về ApiSuccess<T>. */
export function isSuccess<T>(result: ApiResult<T>): result is ApiSuccess<T> {
  return result.ok === true;
}

/** Type guard: thu hẹp ApiResult<T> về ApiFailure. */
export function isFailure<T>(result: ApiResult<T>): result is ApiFailure {
  return result.ok === false;
}
