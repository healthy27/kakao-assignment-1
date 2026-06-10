export function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function getToday() {
  return formatDate(new Date())
}

export function parseDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number)

  return new Date(year, month - 1, day)
}

export function addDays(dateString, amount) {
  const date = parseDate(dateString)
  date.setDate(date.getDate() + amount)

  return formatDate(date)
}

export function formatKoreanDate(dateString) {
  const date = parseDate(dateString)

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(date)
}

export function isToday(dateString) {
  return dateString === getToday()
}
