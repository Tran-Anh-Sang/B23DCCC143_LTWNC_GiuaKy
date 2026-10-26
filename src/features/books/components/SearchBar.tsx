import { useFilterStore } from '../../filters/filterStore';

export function SearchBar() {
  const keyword = useFilterStore((s) => s.keyword);
  const setKeyword = useFilterStore((s) => s.setKeyword);

  return (
    <input
      type="search"
      className="input"
      placeholder="Tìm theo tên sách hoặc tác giả..."
      aria-label="Tìm kiếm sách"
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
    />
  );
}
