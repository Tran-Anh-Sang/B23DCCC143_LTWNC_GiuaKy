import { configureStore } from '@reduxjs/toolkit';
import { borrowLimitMiddleware } from '../features/borrow/borrowLimitMiddleware';
import { rootReducer, type RootState } from './rootReducer';

/** Tạo store mới (dùng cho app và cho test với preloadedState riêng). */
export function makeStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(borrowLimitMiddleware),
  });
}

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type { RootState };
