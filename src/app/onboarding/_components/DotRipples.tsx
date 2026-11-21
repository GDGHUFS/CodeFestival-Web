'use client';

import { useEffect, useRef } from 'react';

import { DOT_GRID_GAP_PX } from '@/styles/dotGrid.css';

type Ripple = {
  x: number;
  y: number;
  startedAt: number;
  duration: number;
  maxRadius: number;
};

type Twinkle = {
  x: number;
  y: number;
  startedAt: number;
  duration: number;
  peak: number;
};

const RIPPLE_BAND_DOTS = 3;
const RIPPLE_PEAK_ALPHA = 0.6;
const MAX_RIPPLES = 3;
const MAX_TWINKLES = 28;

const random = (min: number, max: number) => min + Math.random() * (max - min);
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

type DotRipplesProps = {
  className?: string;
};

const DotRipples = ({ className }: DotRipplesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) {
      return;
    }

    let width = 0;
    let height = 0;
    let gap = DOT_GRID_GAP_PX;
    let dotRadius = 1.4;

    const resize = () => {
      const scale = parseFloat(getComputedStyle(document.documentElement).fontSize) / 16 || 1;
      const ratio = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      gap = DOT_GRID_GAP_PX * scale;
      dotRadius = 1.4 * scale;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const columnOf = (x: number) => Math.round((x - width / 2) / gap);
    const rowOf = (y: number) => Math.round((y - gap / 2) / gap);
    const xOf = (column: number) => width / 2 + column * gap;
    const yOf = (row: number) => gap / 2 + row * gap;

    const randomDot = () => ({
      x: xOf(columnOf(random(0, width))),
      y: yOf(rowOf(random(0, height))),
    });

    const drawDot = (x: number, y: number, alpha: number) => {
      context.globalAlpha = Math.min(alpha, 1);
      context.beginPath();
      context.arc(x, y, dotRadius, 0, Math.PI * 2);
      context.fill();
    };

    let ripples: Ripple[] = [];
    let twinkles: Twinkle[] = [];
    let nextRippleAt = performance.now() + random(600, 1600);
    let frame = 0;

    const tick = (now: number) => {
      if (now >= nextRippleAt && ripples.length < MAX_RIPPLES) {
        const longestSide = Math.max(width, height);
        ripples.push({
          ...randomDot(),
          startedAt: now,
          duration: random(3200, 5600),
          maxRadius: random(longestSide * 0.18, longestSide * 0.42),
        });
        nextRippleAt = now + random(1800, 4800);
      }

      while (twinkles.length < MAX_TWINKLES && Math.random() < 0.25) {
        twinkles.push({
          ...randomDot(),
          startedAt: now,
          duration: random(1400, 3200),
          peak: random(0.25, 0.55),
        });
      }

      ripples = ripples.filter(ripple => now - ripple.startedAt < ripple.duration);
      twinkles = twinkles.filter(twinkle => now - twinkle.startedAt < twinkle.duration);

      context.clearRect(0, 0, width, height);
      context.fillStyle = '#FFFFFF';

      for (const twinkle of twinkles) {
        const progress = (now - twinkle.startedAt) / twinkle.duration;
        drawDot(twinkle.x, twinkle.y, twinkle.peak * Math.sin(progress * Math.PI));
      }

      const band = gap * RIPPLE_BAND_DOTS;
      for (const ripple of ripples) {
        const progress = (now - ripple.startedAt) / ripple.duration;
        const radius = ripple.maxRadius * easeOutCubic(progress);
        const strength = RIPPLE_PEAK_ALPHA * (1 - progress) ** 1.5 * Math.min(progress * 8, 1);
        const reach = radius + band;

        for (
          let column = columnOf(ripple.x - reach);
          column <= columnOf(ripple.x + reach);
          column++
        ) {
          for (
            let row = Math.max(rowOf(ripple.y - reach), 0);
            row <= rowOf(ripple.y + reach);
            row++
          ) {
            const x = xOf(column);
            const y = yOf(row);
            const offset = Math.abs(Math.hypot(x - ripple.x, y - ripple.y) - radius);
            if (offset < band) {
              drawDot(x, y, strength * (1 - offset / band));
            }
          }
        }
      }

      frame = requestAnimationFrame(tick);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
};

export default DotRipples;
