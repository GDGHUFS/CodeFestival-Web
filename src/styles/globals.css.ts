import { globalStyle } from '@vanilla-extract/css';

import { theme } from '@/styles/theme.css';

import './reset.css';

globalStyle(':root', {
  colorScheme: 'dark',

  '@media': {
    '(prefers-color-scheme: dark)': { colorScheme: 'dark' },
  },
});

globalStyle('html', {
  backgroundColor: theme.colors.black,
});

globalStyle('body', {
  paddingBottom: 'env(safe-area-inset-bottom)',
  fontFamily: 'var(--font-pretendard)',
  backgroundColor: theme.colors.black,
  overflowX: 'hidden',
  overflowY: 'scroll',
});
