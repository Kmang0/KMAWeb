import { PROJECT_CATEGORIES, type ProjectCategory } from "@/data/projects";

export type ProjectFilter = "All" | ProjectCategory;

type FilterBarProps = {
  activeFilter: ProjectFilter;
  search: string;
  onFilterChange: (filter: ProjectFilter) => void;
  onSearchChange: (search: string) => void;
};

export function FilterBar({
  activeFilter,
  search,
  onFilterChange,
  onSearchChange,
}: FilterBarProps) {
  const filters: ProjectFilter[] = ["All", ...PROJECT_CATEGORIES];

  return (
    <div className="catalogue-controls reveal-delay-3" data-reveal>
      <label className="search-control">
        <span>Search / index</span>
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Project, tool, or method"
          aria-label="Search projects"
        />
      </label>
      <div className="filter-bar" aria-label="Filter projects">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            aria-pressed={activeFilter === filter}
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
