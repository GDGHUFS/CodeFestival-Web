import { globalStyle, style } from '@vanilla-extract/css';

import { breakpoint } from '@/styles/responsive.css';
import { theme } from '@/styles/theme.css';
import { rem } from '@/utils/pxto';

export const title = style({
  marginTop: rem(60),
  color: theme.colors.white,
  fontFamily: 'var(--font-jetbrains)',
  fontSize: rem(28),
  fontWeight: 600,
  lineHeight: '100%',
  textAlign: 'center',

  ...breakpoint({ tablet: { fontSize: rem(32) } }),
});

export const tabList = style({
  ...theme.layouts.centerX,
  marginTop: rem(24),
  gap: rem(8),
});

export const tab = style({
  paddingBlock: rem(6),
  paddingInline: rem(12),
  color: theme.colors.white40,
  fontFamily: 'var(--font-jetbrains)',
  fontSize: rem(15),
  fontWeight: 600,
  borderBottom: `${rem(2)} solid transparent`,
  cursor: 'pointer',
  transition: 'color 0.2s, border-color 0.2s',

  selectors: {
    '&:hover': { color: theme.colors.white70 },
    '&[aria-selected="true"]': {
      color: theme.colors.white,
      borderBottomColor: theme.colors.white,
    },
    '&:focus-visible': {
      outline: `${rem(2)} solid ${theme.colors.white60}`,
      outlineOffset: rem(2),
    },
  },
});

export const grid = style({
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  width: '100%',
  paddingTop: rem(24),
  paddingBottom: rem(38),
  paddingInline: theme.sizes.appInlinePadding,
  gap: rem(24),

  ...breakpoint({ tablet: { gridTemplateColumns: 'repeat(4, 1fr)' } }),
});

export const imageContainer = style({
  position: 'relative',
  width: '100%',
  height: rem(250),
  borderRadius: rem(16),
  overflow: 'hidden',
  transition: 'filter 0.3s ease',

  ':hover': { filter: 'brightness(1.2)' },
});

globalStyle(`${imageContainer} > img`, {
  objectFit: 'cover',
  transition: 'transform 0.2s',
});
