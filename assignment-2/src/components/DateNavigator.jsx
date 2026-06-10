import { formatKoreanDate, isToday } from '../utils/date'

function DateNavigator({ selectedDate, onMoveDate, onToday }) {
  return (
    <section className="grid gap-3 rounded-3xl border border-[#e3d6bd] bg-[#f7efd9] p-4 sm:grid-cols-[auto_1fr_auto] sm:items-center">
      <button
        type="button"
        className="rounded-2xl border border-[#c7b489] bg-white px-4 py-3 text-sm font-bold text-[#4b412e] transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#94733a]"
        onClick={() => onMoveDate(-1)}
      >
        이전 날짜
      </button>

      <div className="text-center">
        <p className="text-sm font-semibold text-[#8a6c35]">
          선택된 날짜
          {isToday(selectedDate) && (
            <span className="ml-2 rounded-full bg-[#d95f43] px-2 py-1 text-xs text-white">
              오늘
            </span>
          )}
        </p>
        <p className="mt-1 text-2xl font-black tracking-[-0.03em] text-[#202217]">
          {formatKoreanDate(selectedDate)}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:flex">
        <button
          type="button"
          className="rounded-2xl border border-[#c7b489] bg-white px-4 py-3 text-sm font-bold text-[#4b412e] transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#94733a]"
          onClick={onToday}
        >
          오늘
        </button>
        <button
          type="button"
          className="rounded-2xl border border-[#c7b489] bg-white px-4 py-3 text-sm font-bold text-[#4b412e] transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#94733a]"
          onClick={() => onMoveDate(1)}
        >
          다음 날짜
        </button>
      </div>
    </section>
  )
}

export default DateNavigator
