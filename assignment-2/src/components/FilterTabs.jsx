import { TODO_FILTER_LABELS, TODO_FILTERS } from '../constants/todo'

const FILTER_OPTIONS = [
  TODO_FILTERS.ALL,
  TODO_FILTERS.ACTIVE,
  TODO_FILTERS.COMPLETED,
]

function FilterTabs({ filter, counts, onChangeFilter }) {
  return (
    <div className="grid grid-cols-3 gap-2 rounded-3xl bg-[#e9ddc4] p-2">
      {FILTER_OPTIONS.map((filterOption) => {
        const isSelected = filter === filterOption

        return (
          <button
            key={filterOption}
            type="button"
            className={`rounded-2xl px-3 py-3 text-sm font-extrabold transition focus:outline-none focus:ring-2 focus:ring-[#94733a] ${
              isSelected
                ? 'bg-[#202217] text-[#fff7dd] shadow-md'
                : 'bg-transparent text-[#6f6248] hover:bg-[#fff7e6]'
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
