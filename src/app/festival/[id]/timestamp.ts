import type { TokenizerAndRendererExtension, Tokens } from 'marked';

const TIMESTAMP_REGEX = /^<t:(\d+|\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2})?)(?::([tTdDfFR]))?>/;
const TIME_ZONE = 'Asia/Seoul';
const TIME_ZONE_OFFSET = '+09:00';

type TimestampFormat = 't' | 'T' | 'd' | 'D' | 'f' | 'F' | 'R';

type TimestampToken = Tokens.Generic & {
  date: Date;
  format: TimestampFormat;
};

const dateTimeFormat = new Intl.DateTimeFormat('ko-KR', {
  timeZone: TIME_ZONE,
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  weekday: 'short',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
});

const relativeTimeFormat = new Intl.RelativeTimeFormat('ko', { numeric: 'auto' });

const RELATIVE_UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 365 * 24 * 60 * 60],
  ['month', 30 * 24 * 60 * 60],
  ['day', 24 * 60 * 60],
  ['hour', 60 * 60],
  ['minute', 60],
  ['second', 1],
];

const parseTimestamp = (value: string) => {
  if (/^\d+$/.test(value)) {
    return { date: new Date(Number(value) * 1000), hasTime: true };
  }

  const hasTime = value.includes('T');
  const date = new Date(`${value}${hasTime ? ':00' : 'T00:00:00'}${TIME_ZONE_OFFSET}`);
  return { date, hasTime };
};

export const formatRelativeTimestamp = (date: Date, now = Date.now()) => {
  const seconds = Math.round((date.getTime() - now) / 1000);
  const [unit, unitSeconds] =
    RELATIVE_UNITS.find(([, size]) => Math.abs(seconds) >= size) ?? RELATIVE_UNITS.at(-1)!;
  return relativeTimeFormat.format(Math.round(seconds / unitSeconds), unit);
};

export const formatTimestamp = (date: Date, format: TimestampFormat) => {
  const parts = Object.fromEntries(
    dateTimeFormat.formatToParts(date).map(({ type, value }) => [type, value]),
  );
  const { year, month, day, weekday, hour, minute, second } = parts;
  const time = `${hour}:${minute}`;
  const fullDate = `${year}년 ${month}월 ${day}일`;

  switch (format) {
    case 't':
      return time;
    case 'T':
      return `${time}:${second}`;
    case 'd':
      return `${year}.${month.padStart(2, '0')}.${day.padStart(2, '0')}`;
    case 'D':
      return `${fullDate} (${weekday})`;
    case 'f':
      return `${fullDate} ${time}`;
    case 'F':
      return `${fullDate} (${weekday}) ${time}`;
    case 'R':
      return formatRelativeTimestamp(date);
  }
};

export const timestampExtension: TokenizerAndRendererExtension = {
  name: 'timestamp',
  level: 'inline',
  start: src => src.indexOf('<t:'),
  tokenizer: src => {
    const match = TIMESTAMP_REGEX.exec(src);
    if (!match) {
      return undefined;
    }

    const { date, hasTime } = parseTimestamp(match[1]);
    if (Number.isNaN(date.getTime())) {
      return undefined;
    }

    const format = (match[2] ?? (hasTime ? 'F' : 'D')) as TimestampFormat;
    return { type: 'timestamp', raw: match[0], date, format };
  },
  renderer: token => {
    const { date, format } = token as TimestampToken;
    const text = formatTimestamp(date, format === 'R' ? 'F' : format);
    return `<time datetime="${date.toISOString()}" data-format="${format}">${text}</time>`;
  },
};
