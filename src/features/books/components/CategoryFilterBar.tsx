import { CATEGORY_FILTERS } from '../../../types/book';
import { useFilterStore } from '../../filters/filterStore';

export function CategoryFilterBar() {
  const category = useFilterStore((s) => s.category);
  const setCategory = useFilterStore((s) => s.setCategory);

  return (
    <div className="chips" role="group" aria-label="Lọc theo thể loại">
      {CATEGORY_FILTERS.map((item) => (
        <button
          key={item}
          type="button"
          className={`chip${item === category ? ' chip--active' : ''}`}
          aria-pressed={item === category}
          onClick={() => setCategory(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
