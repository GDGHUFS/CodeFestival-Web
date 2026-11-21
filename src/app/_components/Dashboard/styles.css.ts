import { createVar, globalStyle, keyframes, style } from '@vanilla-extract/css';

import { dotGrid } from '@/styles/dotGrid.css';
import { breakpoint } from '@/styles/responsive.css';
import { revealAfterLoad, skeleton } from '@/styles/skeleton.css';
import { theme } from '@/styles/theme.css';
import { rem } from '@/utils/pxto';

const inlineStart = createVar();
const titleSize = createVar();
const TITLE_WIDTH_EM = 9.8;
const TITLE_MAX_SIZE = rem(108);
const titleTop = rem(28);
const posterWhite = '#F8F6F6';
const dateFontSize = `clamp(${rem(20)}, calc(${titleSize} * 0.34), ${rem(38)})`;
const dateLineHeight = 1.1;

export const root = style({
  vars: {
    [inlineStart]: theme.sizes.appInlinePadding,
    [titleSize]: `min(${TITLE_MAX_SIZE}, calc((100vw - ${rem(40)}) / ${TITLE_WIDTH_EM}))`,
  },
  position: 'relative',
  isolation: 'isolate',
  display: 'flex',
  flexDirection: 'column',
  minHeight: [
    `calc(100vh - ${theme.sizes.appHeaderHeight})`,
    `calc(100svh - ${theme.sizes.appHeaderHeight})`,
  ],
  paddingInlineStart: inlineStart,
  paddingInlineEnd: theme.sizes.appInlinePadding,
  paddingBottom: rem(40),

  ...breakpoint({
    mobile: {
      vars: {
        [inlineStart]: rem(64),
        [titleSize]: `min(${TITLE_MAX_SIZE}, calc((min(100vw, ${theme.sizes.appWidth}) - ${rem(84)}) / ${TITLE_WIDTH_EM}))`,
      },
    },
    tablet: { paddingBottom: rem(72) },
  }),
});

export const backdrop = style([
  dotGrid,
  {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '50%',
    width: '100vw',
    transform: 'translateX(-50%)',
    WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 72%, transparent 100%)',
    maskImage: 'linear-gradient(to bottom, #000 0%, #000 72%, transparent 100%)',
    pointerEvents: 'none',
    zIndex: -1,
  },
]);

export const gutter = style({
  display: 'none',
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  width: rem(44),
  overflow: 'hidden',
  color: theme.colors.lineNumber,
  fontFamily: 'var(--font-jetbrains)',
  fontSize: rem(14),
  fontVariantNumeric: 'tabular-nums',
  textAlign: 'right',
  listStyle: 'none',
  userSelect: 'none',
  pointerEvents: 'none',
  maskImage: 'linear-gradient(to bottom, #000 0%, #000 72%, transparent 100%)',

  ...breakpoint({ mobile: { display: 'block' } }),
});

globalStyle(`${gutter} > li`, {
  height: rem(48),
  lineHeight: rem(24),
});

export const guides = style({
  position: 'absolute',
  inset: 0,
  fontFamily: 'var(--font-courier-prime), monospace',
  fontSize: titleSize,
  pointerEvents: 'none',
});

const guide = style({
  position: 'absolute',
  bottom: rem(24),
  width: rem(1),
  backgroundColor: theme.colors.white40,
});

export const guideOuter = style([
  guide,
  {
    left: `calc(${inlineStart} + 0.3ch)`,
    top: `calc(${titleTop} + 1.04em)`,
  },
]);

const GUIDE_INNER_CH = 1.85;
const TITLE_CH_EM = 0.6;
const guideInnerOffset = `calc(${titleSize} * ${TITLE_CH_EM * GUIDE_INNER_CH})`;
const DETAILS_GUIDE_GAP = rem(16);

export const guideInner = style([
  guide,
  {
    left: `calc(${inlineStart} + ${GUIDE_INNER_CH}ch)`,
    top: `calc(${titleTop} + 2.2em)`,
  },
]);

export const heading = style({
  position: 'relative',
  width: 'fit-content',
  maxWidth: '100%',
  marginTop: titleTop,
});

export const title = style({
  color: posterWhite,
  fontFamily: 'var(--font-courier-prime), monospace',
  fontSize: titleSize,
  fontWeight: 700,
  lineHeight: 1,
  overflowWrap: 'anywhere',
});

export const titleTag = style({
  display: 'block',
});

export const titleName = style({
  display: 'block',
  paddingLeft: '2ch',
});

export const titleEdition = style({
  display: 'inline-block',
});

export const revealDate = style([revealAfterLoad]);
export const revealRegister = style([revealAfterLoad, { animationDelay: '80ms' }]);

const dateTypography = {
  marginTop: rem(12),
  fontFamily: 'var(--font-pretendard)',
  fontSize: dateFontSize,
  fontWeight: 900,
  lineHeight: dateLineHeight,
  textAlign: 'right',
} as const;

export const date = style({
  ...dateTypography,
  color: theme.colors.accent,
});

export const dateSkeleton = style([
  skeleton,
  {
    ...dateTypography,
    display: 'block',
    width: 'fit-content',
    maxWidth: '100%',
    marginLeft: 'auto',
    color: 'transparent',
    userSelect: 'none',
  },
]);

export const stage = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minHeight: 0,

  ...breakpoint({
    tablet: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.15fr)',
      alignItems: 'stretch',
    },
  }),
});

export const details = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: rem(14),
  paddingLeft: `calc(${guideInnerOffset} + ${DETAILS_GUIDE_GAP})`,

  ...breakpoint({
    tablet: {
      position: 'relative',
      zIndex: 1,
      gridColumn: '1',
      gridRow: '1',
      alignSelf: 'end',
      paddingBottom: rem(8),
    },
  }),
});

export const registerLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: rem(10),
  paddingBlock: rem(14),
  paddingInline: rem(22),
  color: theme.colors.black,
  fontFamily: 'var(--font-jetbrains)',
  fontSize: rem(15),
  fontWeight: 600,
  lineHeight: 1,
  textDecoration: 'none',
  backgroundColor: theme.colors.accent,
  border: `${rem(2)} solid ${theme.colors.accent}`,
  transition: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease',
  cursor: 'pointer',

  ':hover': {
    backgroundColor: posterWhite,
    borderColor: posterWhite,
  },

  ':focus-visible': {
    outline: `${rem(2)} solid ${posterWhite}`,
    outlineOffset: rem(3),
  },
});

const arrowNudge = keyframes({
  '0%, 40%, 100%': { transform: 'translateX(0)' },
  '10%, 30%': { transform: `translateX(${rem(6)})` },
  '20%': { transform: 'translateX(0)' },
});

export const registerArrow = style({
  display: 'inline-block',
  animation: `${arrowNudge} 2.4s ease-in-out infinite`,
  transition: 'transform 0.2s ease',

  selectors: {
    [`${registerLink}:hover &`]: { animation: 'none', transform: `translateX(${rem(4)})` },
  },

  '@media': {
    '(prefers-reduced-motion: reduce)': { animation: 'none' },
  },
});

export const registerKorean = style({
  fontFamily: 'var(--font-pretendard)',
  fontSize: rem(16),
  fontWeight: 700,
});

export const registerClosed = style({
  color: theme.colors.white60,
  backgroundColor: 'transparent',
  borderColor: theme.colors.white20,
  cursor: 'default',

  ':hover': {
    backgroundColor: 'transparent',
    borderColor: theme.colors.white20,
  },
});

export const registerSkeleton = style([
  skeleton,
  {
    display: 'block',
    width: rem(184),
    height: rem(47),
    borderRadius: 0,
  },
]);

export const registerSkeletonKorean = style({
  width: rem(160),
  height: rem(48),
});

export const souvenir = style({
  paddingBlock: rem(6),
  paddingInline: rem(10),
  color: theme.colors.black,
  fontFamily: 'var(--font-pretendard)',
  fontSize: rem(15),
  fontWeight: 700,
  lineHeight: 1.2,
  backgroundColor: posterWhite,
});

export const ci = style({
  order: -1,
  height: `min(${rem(280)}, 36vh)`,
  minHeight: rem(220),
  marginTop: rem(8),
  marginBottom: rem(32),
  marginLeft: guideInnerOffset,

  ...breakpoint({
    tablet: {
      order: 0,
      gridColumn: '1 / -1',
      gridRow: '1',
      height: 'auto',
      minHeight: rem(440),
      marginTop: 0,
      marginBottom: 0,
    },
  }),
});

globalStyle(`${ci} > div`, {
  touchAction: 'auto !important',
});

export const scrollIndicator = style({
  display: 'none',

  ...breakpoint({ tablet: { display: 'block' } }),
});
