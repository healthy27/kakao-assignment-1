import { formatKoreanDate, isToday } from '../utils/date'
import Badge from './ui/Badge'
import Button from './ui/Button'

function DateNavigator({ selectedDate, onMoveDate, onToday }) {
  return (
    <section className="flex flex-col gap-3 rounded-card border border-border bg-surface-alt p-4 sm:flex-row sm:items-center">
      <Button className="sm:w-auto" onClick={() => onMoveDate(-1)}>
        이전 날짜
      </Button>

      <div className="flex-1 text-center">
        <p className="text-sm font-semibold text-text-secondary">
          선택된 날짜
          {isToday(selectedDate) && <Badge className="ml-2">오늘</Badge>}
        </p>
        <p className="mt-1 text-2xl font-black tracking-tight text-text-primary">
          {formatKoreanDate(selectedDate)}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:flex">
        <Button variant="subtle" onClick={onToday}>
          오늘
        </Button>
        <Button onClick={() => onMoveDate(1)}>
          다음 날짜
        </Button>
      </div>
    </section>
  )
}

export default DateNavigator
