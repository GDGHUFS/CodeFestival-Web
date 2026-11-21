const codeFestivalDateFormat = new Intl.DateTimeFormat('ko-KR', {
  dateStyle: 'long',
  timeStyle: 'short',
  timeZone: 'Asia/Seoul',
});

export const formatCodeFestivalDate = (value: string) =>
  codeFestivalDateFormat.format(new Date(`${value}+09:00`));

export const formatSubmittedAt = (value: string) =>
  codeFestivalDateFormat.format(new Date(`${value}Z`));

export const parseEventDate = (eventDate: string) => new Date(`${eventDate}T00:00:00+09:00`);

const eventWeekdayFormat = new Intl.DateTimeFormat('ko-KR', {
  weekday: 'short',
  timeZone: 'Asia/Seoul',
});

export const formatEventDate = (eventDate: string) => {
  const [year, month, day] = eventDate.split('-').map(Number);
  const weekday = eventWeekdayFormat.format(parseEventDate(eventDate));

  return `${year}년 ${month}월 ${day}일(${weekday})`;
};

export const getEnrollmentStatusNotice = (eventDate: string) => {
  const [year, month] = eventDate.split('-');
  const numericYear = Number(year);
  const numericMonth = Number(month);
  const academicYear = numericMonth <= 2 ? numericYear - 1 : numericYear;
  const semester = numericMonth >= 3 && numericMonth <= 8 ? 1 : 2;
  return `${academicYear}학년도 ${semester}학기 기준 재학 상태를 선택해 주시기 바랍니다.`;
};

export const getCodeFestivalOptionLabel = (
  options: { value: string; label: string }[],
  value: string,
) => options.find(option => option.value === value)?.label ?? value;
