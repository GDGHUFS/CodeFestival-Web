import { style, styleVariants } from '@vanilla-extract/css';

import { breakpoint } from '@/styles/responsive.css';
import { theme } from '@/styles/theme.css';
import { rem } from '@/utils/pxto';

export const list = style({
  display: 'none',
  position: 'sticky',
  top: `calc(${theme.sizes.appHeaderHeight} + ${rem(24)})`,
  width: '100%',
  maxWidth: '25%',
  maxHeight: `calc(100vh - ${theme.sizes.appHeaderHeight} - ${rem(48)})`,
  height: 'fit-content',
  marginTop: rem(66),
  paddingInline: theme.sizes.appInlinePadding,
  overflowY: 'auto',
  borderLeft: `${rem(1)} solid rgba(255, 255, 255, 0.1)`,
  listStyle: 'none',
  gap: rem(4),

  ...breakpoint({ tablet: { ...theme.layouts.column } }),
});

export const item = style({
  color: theme.colors.white,
  fontFamily: 'var(--font-pretendard)',
  fontSize: rem(14),
  fontWeight: 400,
  textAlign: 'left',
  cursor: 'pointer',
  transition: 'color 0.2s',

  selectors: {
    '&&:hover': { color: theme.colors.primary },
  },
});

export const depth = styleVariants({
  2: { marginTop: rem(8), fontWeight: 600 },
  3: { marginLeft: rem(12), color: theme.colors.white80 },
  4: { marginLeft: rem(24), fontSize: rem(13), color: theme.colors.white60 },
});

export const active = style({
  color: theme.colors.primary,
  fontWeight: 500,
});
