import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { makeStore } from './app/store';
import { useFilterStore } from './features/filters/filterStore';
import { ThemeProvider } from './features/theme/ThemeContext';

function renderApp(route = '/') {
  const store = makeStore();
  render(
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter initialEntries={[route]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>,
  );
  return store;
}

const advance = (ms: number) =>
  act(async () => {
    await jest.advanceTimersByTimeAsync(ms);
  });

describe('<App /> (tích hợp)', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    useFilterStore.getState().reset();
  });
  afterEach(() => jest.useRealTimers());

  const setupUser = () => userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  it('hiện "Đang tải..." rồi hiển thị danh sách sách', async () => {
    renderApp();
    expect(screen.getByText('Đang tải...')).toBeInTheDocument();

    await advance(500);
    expect(await screen.findByRole('heading', { name: 'Clean Code' })).toBeInTheDocument();
  });

  it('hiển thị lỗi khi API thất bại', async () => {
    renderApp('/?fail=1');
    await advance(500);
    expect(await screen.findByRole('alert')).toHaveTextContent('Lỗi:');
  });

  it('tìm kiếm có debounce 300ms, không phân biệt hoa thường', async () => {
    const user = setupUser();
    renderApp();
    await advance(500);
    await screen.findByRole('heading', { name: 'Clean Code' });

    await user.type(screen.getByLabelText('Tìm kiếm sách'), 'MANKIW');
    expect(screen.getByRole('heading', { name: 'Clean Code' })).toBeInTheDocument(); // chưa debounce xong

    await advance(300);
    expect(screen.queryByRole('heading', { name: 'Clean Code' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Kinh tế vi mô' })).toBeInTheDocument();
  });

  it('chặn mượn cuốn thứ 4 và hiện cảnh báo', async () => {
    const user = setupUser();
    renderApp();
    await advance(500);
    await screen.findByRole('heading', { name: 'Clean Code' });

    for (let i = 0; i < 3; i += 1) {
      const [button] = screen.getAllByRole('button', { name: 'Mượn' }).filter((b) => !b.hasAttribute('disabled'));
      await user.click(button);
    }
    expect(screen.getByRole('heading', { name: /Đang mượn \(3\/3\)/ })).toBeInTheDocument();

    const [fourth] = screen.getAllByRole('button', { name: 'Mượn' }).filter((b) => !b.hasAttribute('disabled'));
    await user.click(fourth);

    const alert = screen.getByRole('alert');
    expect(within(alert).getByText(/tối đa 3 cuốn/)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Đang mượn \(3\/3\)/ })).toBeInTheDocument();
  });

  it('trang /stats hiển thị thống kê (lazy load)', async () => {
    renderApp('/stats');
    await advance(500);
    expect(await screen.findByText('Đầu sách CNTT')).toBeInTheDocument();
    expect(screen.getByText('Sách đang mượn')).toBeInTheDocument();
  });
});
