// 순수 날짜 로직 (2차 과제 utils/date.js 승계)

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getToday(): string {
  return formatDate(new Date());
}

export function parseDate(dateString: string): Date {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function addDays(dateString: string, amount: number): string {
  const date = parseDate(dateString);
  date.setDate(date.getDate() + amount);
  return formatDate(date);
}

export function formatKoreanDate(dateString: string): string {
  const date = parseDate(dateString);
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(date);
}

export function isToday(dateString: string): boolean {
  return dateString === getToday();
}
