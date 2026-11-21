import { keyframes, style } from '@vanilla-extract/css';

import { theme } from '@/styles/theme.css';
import { rem } from '@/utils/pxto';

const SKELETON_OPACITY = 0.35;
const SKELETON_APPEAR_DELAY = 250;
const SKELETON_APPEAR_DURATION = 300;

const appear = keyframes({
  from: { opacity: 0 },
  to: { opacity: SKELETON_OPACITY },
});

const pulse = keyframes({
  '0%, 100%': {
    opacity: SKELETON_OPACITY,
  },
  '50%': {
    opacity: 0.65,
  },
});

export const skeleton = style({
  backgroundColor: theme.colors.white20,
  borderRadius: rem(999),
  animation: [
    `${appear} ${SKELETON_APPEAR_DURATION}ms ease-out ${SKELETON_APPEAR_DELAY}ms both`,
    `${pulse} 1.5s ease-in-out ${SKELETON_APPEAR_DELAY + SKELETON_APPEAR_DURATION}ms infinite`,
  ].join(', '),

  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none',
    },
  },
});

const reveal = keyframes({
  from: { opacity: 0, filter: 'blur(10px)' },
  to: { opacity: 1, filter: 'none' },
});

export const revealAfterLoad = style({
  animation: `${reveal} 420ms cubic-bezier(0.16, 1, 0.3, 1) both`,

  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none',
    },
  },
});
