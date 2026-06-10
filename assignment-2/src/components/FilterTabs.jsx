import { TODO_FILTER_LABELS, TODO_FILTERS } from '../constants/todo'

const FILTER_OPTIONS = [
  TODO_FILTERS.ALL,
  TODO_FILTERS.ACTIVE,
  TODO_FILTERS.COMPLETED,
]

function FilterTabs({ filter, counts, onChangeFilter }) {
  return (
    <div className="grid grid-cols-3 gap-2 rounded-card bg-surface-alt p-2">
      {FILTER_OPTIONS.map((filterOption) => {
        const isSelected = filter === filterOption

        return (
          <button
            key={filterOption}
            type="button"
            className={`rounded-control px-3 py-3 text-sm font-extrabold transition focus:outline-none focus:ring-4 focus:ring-brand/20 ${
              isSelected
                ? 'bg-brand text-white shadow-card'
                : 'bg-transparent text-text-secondary hover:bg-surface'
            }`}
            onClick={() => onChangeFilter(filterOption)}
          >
            {TODO_FILTER_LABELS[filterOption]}
            <span className="ml-2 text-xs opacity-75">{counts[filterOption]}</span>
          </button>
        )
      })}
    </div>
  )
}

export default FilterTabs
