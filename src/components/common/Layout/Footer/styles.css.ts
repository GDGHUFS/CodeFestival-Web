import { globalStyle, style } from '@vanilla-extract/css';

import { theme } from '@/styles/theme.css';
import { rem } from '@/utils/pxto';

export const root = style({
  ...theme.layouts.column,
  paddingBlock: rem(36),
  paddingInline: theme.sizes.appInlinePadding,
});

export const brandingContainer = style({
  ...theme.layouts.rowBetween,
});

export const branding = style({
  ...theme.layouts.centerY,
  color: theme.colors.white,
  fontFamily: 'var(--font-jetbrains)',
  fontSize: rem(16),
  fontWeight: 500,
  gap: theme.spaces.sm,
});

export const logo = style({
  userSelect: 'none',
});

export const license = style({
  marginTop: rem(16),
  color: theme.colors.white,
  fontFamily: 'var(--font-jetbrains)',
  fontSize: rem(12),
  lineHeight: '180%',
  letterSpacing: rem(0.2),
});

globalStyle(`${license} > a`, {
  color: theme.colors.white,
  textDecoration: 'none',
  opacity: 1,
  transition: 'opacity 0.2s',
});

globalStyle(`${license} > a:hover`, { opacity: 0.8 });
