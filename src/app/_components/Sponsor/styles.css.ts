import { globalStyle, style } from '@vanilla-extract/css';

import { breakpoint } from '@/styles/responsive.css';
import { theme } from '@/styles/theme.css';
import { rem } from '@/utils/pxto';

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  paddingBlock: rem(64),
  rowGap: rem(32),

  ...breakpoint({ tablet: { gridTemplateColumns: 'repeat(3, 1fr)' } }),
});

export const organization = style({
  ...theme.layouts.columnCenterX,
  gap: rem(16),
});

globalStyle(`${organization} > a`, {
  textDecoration: 'none',
  opacity: 1,
  transition: 'opacity 0.2s',
});

globalStyle(`${organization} > a:hover`, {
  opacity: 0.8,
});

export const logo = style({
  width: 'auto',
  height: rem(25.2),
  userSelect: 'none',
});

export const title = style({
  color: 'rgba(255, 255, 255, 0.9)',
  fontFamily: 'var(--font-jetbrains)',
  fontSize: rem(16),
  fontWeight: 500,
  lineHeight: '100%',
  textAlign: 'center',
  userSelect: 'none',
});

export const sponsorRow = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: rem(4),
});
