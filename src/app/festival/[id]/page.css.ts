import { globalStyle, style } from '@vanilla-extract/css';

import { breakpoint } from '@/styles/responsive.css';
import { theme } from '@/styles/theme.css';
import { rem } from '@/utils/pxto';

export const backButton = style({
  marginTop: theme.sizes.appInlinePadding,
  marginInline: theme.sizes.appInlinePadding,
});

export const container = style({
  display: 'flex',
});

export const alert = style({
  background: '#fff3cd',
  color: '#856404',
  padding: `${rem(12)} ${rem(16)}`,
  borderRadius: rem(8),
  fontSize: rem(14),
});

export const article = style({
  width: '100%',
  maxWidth: '100%',
  marginTop: rem(24),
  paddingInline: theme.sizes.appInlinePadding,
  color: theme.colors.white,
  fontFamily: 'var(--font-pretendard)',

  ...breakpoint({ tablet: { maxWidth: '75%' } }),
});

globalStyle(`${article} h1, ${article} h2, ${article} h3, ${article} h4`, {
  width: 'fit-content',
  scrollMarginTop: theme.sizes.appHeaderHeight,
  cursor: 'pointer',
});

globalStyle(`${article} h1`, {
  fontSize: rem(40),
  fontWeight: 600,
  marginTop: rem(42),
});

globalStyle(`${article} h2`, {
  fontSize: rem(32),
  fontWeight: 600,
  marginTop: rem(32),
});

globalStyle(`${article} h3`, {
  fontSize: rem(24),
  fontWeight: 600,
  marginTop: rem(24),
});

globalStyle(`${article} h4`, {
  fontSize: rem(20),
  fontWeight: 600,
  marginTop: rem(20),
});

globalStyle(`${article} p`, {
  marginTop: rem(16),
  fontSize: rem(16),
  fontWeight: 400,
  lineHeight: 1.8,
});

globalStyle(`${article} a`, {
  color: theme.colors.white,
  textDecoration: 'underline',
  transition: 'color 0.2s',
});

globalStyle(`${article} a:hover`, {
  color: theme.colors.white80,
});

globalStyle(`${article} strong`, {
  fontWeight: 600,
});

globalStyle(`${article} ul, ${article} ol`, {
  paddingLeft: rem(24),
  marginTop: rem(16),
});

globalStyle(`${article} li`, {
  fontSize: rem(16),
  marginTop: rem(8),
  lineHeight: 1.6,
});

globalStyle(`${article} table`, {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: rem(16),
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
});

globalStyle(`${article} th`, {
  border: `1px solid rgba(255, 255, 255, 0.4)`,
  padding: rem(8),
  fontWeight: 600,
});

globalStyle(`${article} td`, {
  border: `1px solid rgba(255, 255, 255, 0.4)`,
  padding: rem(8),
});

globalStyle(`${article} code`, {
  border: `1px solid rgba(255, 255, 255, 0.2)`,
  padding: `${rem(2)} ${rem(4)}`,
  borderRadius: rem(4),
  backgroundColor: 'rgba(220, 220, 220, 0.1)',
});
