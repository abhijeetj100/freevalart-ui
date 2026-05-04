import Link from 'next/link';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSelect {
  name: string;
  label: string;
  value: string;
  options: FilterOption[];
  placeholder: string;
}

interface ContentFiltersProps {
  action: string;
  clearHref: string;
  searchValue: string;
  searchPlaceholder: string;
  selects: FilterSelect[];
}

export default function ContentFilters({
  action,
  clearHref,
  searchValue,
  searchPlaceholder,
  selects
}: ContentFiltersProps) {
  const hasFilters = searchValue.trim().length > 0 || selects.some((select) => select.value.trim());

  return (
    <form className="filter-panel card" action={action} method="get">
      <div className="filter-grid">
        <label className="filter-field">
          <span className="filter-label">Search</span>
          <input
            className="filter-input"
            name="q"
            defaultValue={searchValue}
            placeholder={searchPlaceholder}
            type="search"
          />
        </label>

        {selects.map((select) => (
          <label className="filter-field" key={select.name}>
            <span className="filter-label">{select.label}</span>
            <select className="filter-select" defaultValue={select.value} name={select.name}>
              <option value="">{select.placeholder}</option>
              {select.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>

      <div className="filter-actions">
        <button className="button primary" type="submit">
          Apply filters
        </button>
        {hasFilters ? (
          <Link className="button" href={clearHref}>
            Clear
          </Link>
        ) : null}
      </div>
    </form>
  );
}