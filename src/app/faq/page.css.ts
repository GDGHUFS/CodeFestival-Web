import { globalStyle, keyframes, style } from '@vanilla-extract/css';

import { theme } from '@/styles/theme.css';
import { rem } from '@/utils/pxto';

const slideDown = keyframes({
  from: { height: '0' },
  to: { height: 'var(--radix-accordion-content-height)' },
});

const slideUp = keyframes({
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: '0' },
});

export const list = style({
  ...theme.layouts.column,
  padding: theme.sizes.appInlinePadding,
  gap: rem(16),
});

export const item = style({
  width: '100%',
  padding: rem(16),
  borderRadius: rem(8),
  backgroundColor: theme.colors.white10,
});

export const trigger = style({
  ...theme.layouts.centerY,
  color: theme.colors.white,
  fontFamily: 'var(--font-pretendard)',
  fontSize: rem(14),
  fontWeight: 500,
  textAlign: 'left',
  lineHeight: '160%',
});

globalStyle(`${trigger} > img`, {
  transition: 'transform 300ms',
});

globalStyle(`${trigger}[data-state="open"] > img`, {
  transform: 'rotate(90deg)',
});

export const content = style({
  overflow: 'hidden',
});

globalStyle(`${content}[data-state="open"]`, {
  animation: `${slideDown} 300ms forwards`,
});

globalStyle(`${content}[data-state="closed"]`, {
  animation: `${slideUp} 300ms forwards`,
});

export const answer = style({
  paddingTop: rem(12),
  marginTop: rem(12),
  color: theme.colors.white,
  fontFamily: 'var(--font-pretendard)',
  fontSize: rem(16),
  fontWeight: 400,
  textAlign: 'left',
  lineHeight: '160%',
  borderTop: `${rem(1)} solid ${theme.colors.white10}`,
});

globalStyle(`${answer} > * + *`, {
  marginTop: rem(10),
});

globalStyle(`${answer} :is(ul, ol)`, {
  paddingLeft: rem(20),
});

globalStyle(`${answer} ul`, {
  listStyle: 'disc',
});

globalStyle(`${answer} ol`, {
  listStyle: 'decimal',
});

globalStyle(`${answer} li + li`, {
  marginTop: rem(4),
});

globalStyle(`${answer} li::marker`, {
  color: theme.colors.white60,
});

globalStyle(`${answer} table`, {
  borderCollapse: 'collapse',
  fontSize: rem(15),
});

globalStyle(`${answer} :is(th, td)`, {
  paddingBlock: rem(6),
  paddingInline: rem(12),
  textAlign: 'left',
  borderBottom: `${rem(1)} solid ${theme.colors.white10}`,
});

globalStyle(`${answer} :is(th, td):first-child`, {
  paddingLeft: 0,
  whiteSpace: 'nowrap',
});

globalStyle(`${answer} th`, {
  color: theme.colors.white60,
  fontWeight: 600,
  borderBottomColor: theme.colors.white20,
});

globalStyle(`${answer} strong`, {
  fontWeight: 700,
});

globalStyle(`${answer} a`, {
  color: theme.colors.white,
  textDecoration: 'underline',
  textUnderlineOffset: rem(2),
});

globalStyle(`${answer} code`, {
  paddingInline: rem(4),
  fontFamily: 'var(--font-jetbrains)',
  fontSize: '0.9em',
  backgroundColor: theme.colors.white10,
  borderRadius: rem(4),
});
