import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookCard } from './BookCard';
import type { Book } from '../../../types/book';

const book: Book = {
  id: 'b42',
  title: 'Design Patterns',
  author: 'Erich Gamma',
  category: 'CNTT',
  year: 1994,
  total: 5,
  available: 3,
};

describe('<BookCard />', () => {
  it('hiển thị đúng tên, tác giả, thể loại, năm xuất bản và số bản còn lại', () => {
    render(<BookCard book={book} isBorrowed={false} onBorrow={jest.fn()} onReturn={jest.fn()} />);

    expect(screen.getByRole('heading', { name: 'Design Patterns' })).toBeInTheDocument();
    expect(screen.getByText('Tác giả: Erich Gamma')).toBeInTheDocument();
    expect(screen.getByText('CNTT')).toBeInTheDocument();
    expect(screen.getByText('Năm xuất bản: 1994')).toBeInTheDocument();
    expect(screen.getByText('Còn lại: 3/5 bản')).toBeInTheDocument();
  });

  it('click "Mượn" gọi onBorrow đúng 1 lần với đúng id', async () => {
    const user = userEvent.setup();
    const onBorrow = jest.fn();
    render(<BookCard book={book} isBorrowed={false} onBorrow={onBorrow} onReturn={jest.fn()} />);

    await user.click(screen.getByRole('button', { name: 'Mượn' }));

    expect(onBorrow).toHaveBeenCalledTimes(1);
    expect(onBorrow).toHaveBeenCalledWith('b42');
  });

  it('nút "Mượn" bị vô hiệu hoá và không gọi onBorrow khi hết bản', async () => {
    const user = userEvent.setup();
    const onBorrow = jest.fn();
    render(<BookCard book={{ ...book, available: 0 }} isBorrowed={false} onBorrow={onBorrow} onReturn={jest.fn()} />);

    const button = screen.getByRole('button', { name: 'Mượn' });
    expect(button).toBeDisabled();

    await user.click(button);
    expect(onBorrow).not.toHaveBeenCalled();
  });

  it('khi đang mượn: hiển thị nút "Trả" và click gọi onReturn với đúng id', async () => {
    const user = userEvent.setup();
    const onReturn = jest.fn();
    render(<BookCard book={book} isBorrowed onBorrow={jest.fn()} onReturn={onReturn} />);

    expect(screen.queryByRole('button', { name: 'Mượn' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Trả' }));

    expect(onReturn).toHaveBeenCalledWith('b42');
  });
});
