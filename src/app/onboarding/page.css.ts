import { style } from '@vanilla-extract/css';

import { dotGridStatic } from '@/styles/dotGrid.css';
import { theme } from '@/styles/theme.css';
import { rem } from '@/utils/pxto';

const screenInset = `clamp(${rem(24)}, 3vw, ${rem(64)})`;

export const root = style({
  ...theme.layouts.columnCenter,
  position: 'relative',
  width: '100%',
  height: 'calc(var(--vh, 1vh) * 100)',
  overflow: 'hidden',
});

export const background = style([
  dotGridStatic,
  {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
  },
]);

export const vignette = style({
  position: 'absolute',
  inset: 0,
  background: 'radial-gradient(ellipse at center, transparent 45%, rgba(0, 0, 0, 0.7) 100%)',
  pointerEvents: 'none',
});

export const ripples = style({
  display: 'block',
  width: '100%',
  height: '100%',
});

export const logo = style({
  position: 'absolute',
  top: screenInset,
  left: screenInset,
  height: 'auto',
  zIndex: 1,
  userSelect: 'none',
});

export const content = style({
  ...theme.layouts.columnCenter,
  gap: rem(8),
  zIndex: 1,
});

export const title = style({
  color: '#F8F6F6',
  fontFamily: 'var(--font-courier-prime), monospace',
  fontSize: `min(7vw, 9vh, ${rem(120)})`,
  fontWeight: 700,
  lineHeight: 1,
  userSelect: 'none',
});

export const titleTag = style({
  display: 'block',
});

export const titleName = style({
  display: 'block',
  paddingLeft: '2ch',
});

export const ci = style({
  flexShrink: 0,
});
