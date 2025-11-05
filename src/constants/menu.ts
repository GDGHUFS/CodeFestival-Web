export const FESTIVAL = {
  current: {
    title: '제7회 코드페스티벌',
    href: '/festival/7',
    date: '2025-11-28T17:00:00+09:00',
    registrationDeadline: '2025-11-23T23:59:59+09:00',
    registrationLink: null,
  },
  6: {
    title: '제6회 코드페스티벌',
    href: '/festival/6',
    date: '2024-10-31T18:00:00+09:00',
    registrationDeadline: '2024-10-23T23:59:59+09:00',
    registrationLink: 'https://forms.gle/dGGqMTxni4RL2Moq7',
  },
};

export const MENU = [
  { ...FESTIVAL.current },
  {
    title: 'FAQ',
    href: '/faq',
  },
  {
    title: 'Contact',
    href: '/contact',
  },
];
