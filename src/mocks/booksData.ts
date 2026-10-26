import type { Book, BookSeed } from '../types/book';

const seeds: BookSeed[] = [
  { id: 'b01', title: 'Clean Code', author: 'Robert C. Martin', category: 'CNTT', year: 2008, total: 3 },
  { id: 'b02', title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', category: 'CNTT', year: 2009, total: 2 },
  { id: 'b03', title: 'Design Patterns', author: 'Erich Gamma', category: 'CNTT', year: 1994, total: 2 },
  { id: 'b04', title: 'Học TypeScript từ cơ bản', author: 'Nguyễn Văn An', category: 'CNTT', year: 2022, total: 4 },
  { id: 'b05', title: 'Lập trình Web nâng cao với React', author: 'Ngô Văn Nhận', category: 'CNTT', year: 2024, total: 5 },
  { id: 'b06', title: 'Kinh tế vi mô', author: 'N. Gregory Mankiw', category: 'Kinh tế', year: 2020, total: 3 },
  { id: 'b07', title: 'Kinh tế vĩ mô', author: 'N. Gregory Mankiw', category: 'Kinh tế', year: 2019, total: 2 },
  { id: 'b08', title: 'Nguyên lý Marketing', author: 'Philip Kotler', category: 'Kinh tế', year: 2018, total: 3 },
  { id: 'b09', title: 'Quản trị học', author: 'Trần Thị Hoa', category: 'Kinh tế', year: 2021, total: 1 },
  { id: 'b10', title: 'English Grammar in Use', author: 'Raymond Murphy', category: 'Ngoại ngữ', year: 2019, total: 4 },
  { id: 'b11', title: 'Từ vựng IELTS cốt lõi', author: 'Lê Minh Châu', category: 'Ngoại ngữ', year: 2023, total: 2 },
  { id: 'b12', title: 'Giáo trình Tiếng Nhật N3', author: 'Phạm Thu Hà', category: 'Ngoại ngữ', year: 2017, total: 2 },
];

/** Số bản còn lại ban đầu: mặc định còn đủ, riêng vài cuốn đã hết để minh hoạ. */
const initialAvailable: Partial<Record<string, number>> = { b03: 0, b09: 0, b12: 1 };

export const booksData: Book[] = seeds.map((seed) => ({
  ...seed,
  available: initialAvailable[seed.id] ?? seed.total,
}));
