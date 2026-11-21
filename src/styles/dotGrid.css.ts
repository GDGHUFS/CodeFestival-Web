import { createVar, globalStyle, keyframes, style } from '@vanilla-extract/css';

import { theme } from '@/styles/theme.css';
import { rem } from '@/utils/pxto';

const dotPattern = (color: string) =>
  `radial-gradient(circle at center, ${color} 0, ${color} ${rem(1.2)}, transparent ${rem(1.6)})`;

export const DOT_GRID_GAP_PX = 24;
const GRID_GAP = rem(DOT_GRID_GAP_PX);
const GRID_SPREAD_DURATION = '1.6s';
const GRID_SPREAD_EASE = 'cubic-bezier(0.33, 1, 0.68, 1)';

const spread = createVar({ syntax: '<length-percentage>', inherits: false, initialValue: '0%' });
const SPREAD_SOFT_EDGE = 30;
const SPREAD_END = `${100 + SPREAD_SOFT_EDGE}%`;

const revealMask = `radial-gradient(circle farthest-corner at center, #000 calc(${spread} - ${SPREAD_SOFT_EDGE}%), transparent ${spread})`;
const waveMask = `radial-gradient(circle farthest-corner at center, transparent calc(${spread} - ${SPREAD_SOFT_EDGE}%), #000 calc(${spread} - 8%), transparent ${spread})`;

const gridSpread = keyframes({
  from: { vars: { [spread]: '0%' } },
  to: { vars: { [spread]: SPREAD_END } },
});

const waveFade = keyframes({
  '0%': { opacity: 0 },
  '8%': { opacity: 1 },
  '100%': { opacity: 0 },
});

const gridLayer = {
  content: '""',
  position: 'absolute',
  inset: 0,
  backgroundPosition: 'center top',
  backgroundSize: `${GRID_GAP} ${GRID_GAP}`,
  vars: { [spread]: '0%' },
} as const;

export const dotGrid = style({});

export const dotGridAnimated = style({});

globalStyle(`${dotGrid}::before`, {
  ...gridLayer,
  backgroundImage: dotPattern(theme.colors.gridDot),
  WebkitMaskImage: revealMask,
  maskImage: revealMask,
  opacity: 0,
});

globalStyle(`${dotGrid}::after`, {
  ...gridLayer,
  backgroundImage: dotPattern(theme.colors.white60),
  WebkitMaskImage: waveMask,
  maskImage: waveMask,
  opacity: 0,
});

globalStyle(`${dotGridAnimated}::before`, {
  opacity: 1,
  animation: `${gridSpread} ${GRID_SPREAD_DURATION} ${GRID_SPREAD_EASE} both`,
});

globalStyle(`${dotGridAnimated}::after`, {
  animation: [
    `${gridSpread} ${GRID_SPREAD_DURATION} ${GRID_SPREAD_EASE} both`,
    `${waveFade} ${GRID_SPREAD_DURATION} linear both`,
  ].join(', '),
});

globalStyle(`${dotGrid}::before, ${dotGrid}::after`, {
  '@media': {
    '(prefers-reduced-motion: reduce)': { animation: 'none', vars: { [spread]: SPREAD_END } },
  },
});

globalStyle(`${dotGrid}::before`, {
  '@media': {
    '(prefers-reduced-motion: reduce)': { opacity: 1 },
  },
});

export const dotGridStatic = style({
  backgroundImage: dotPattern(theme.colors.gridDot),
  backgroundPosition: 'center top',
  backgroundSize: `${GRID_GAP} ${GRID_GAP}`,
});
