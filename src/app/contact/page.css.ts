import { style } from '@vanilla-extract/css';

import { theme } from '@/styles/theme.css';
import { rem } from '@/utils/pxto';

export const root = style({
  paddingInline: theme.sizes.appInlinePadding,
  marginTop: rem(24),
  fontFamily: 'var(--font-jetbrains)',
  fontSize: rem(14),
  lineHeight: '200%',
});

export const contactInfo = style({
  marginTop: rem(24),
});

export const contactTitle = style({
  fontSize: rem(18),
  fontWeight: '600',
  marginBottom: rem(8),
});

export const contactAddress = style({
  fontSize: rem(14),
  lineHeight: '1.6',
  color: theme.colors.white90,
  marginBottom: rem(16),
});

export const contactText = style({
  fontSize: rem(16),
  fontWeight: 500,
  marginBottom: rem(8),
  lineHeight: 1.5,
});

export const mapContainer = style({
  width: '100%',
  maxWidth: rem(800),
  height: rem(450),
  marginTop: rem(16),
  borderRadius: rem(24),
  overflow: 'hidden',
});

export const map = style({
  width: '100%',
  height: '100%',
  border: 0,
});
