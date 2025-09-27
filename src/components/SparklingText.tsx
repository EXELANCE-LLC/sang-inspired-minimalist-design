import React, { useEffect, useRef, type ReactNode } from 'react';

type SparklingTextProps = {
  children: ReactNode;
  color?: string; // star fill color
  maxStars?: number;
  minDelayMs?: number;
  maxDelayMs?: number;
};

const STAR_SVG_PATH = 'M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z';

export default function SparklingText({
  children,
  color = '#FFC700',
  maxStars = 6,
  minDelayMs = 100,
  maxDelayMs = 800,
}: SparklingTextProps) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isUnmounted = false;

    const schedule = () => {
      const delay = Math.round(Math.random() * (maxDelayMs - minDelayMs)) + minDelayMs;
      timeoutRef.current = window.setTimeout(() => {
        if (!isUnmounted) {
          addStar(container);
          schedule();
        }
      }, delay);
    };

    const addStar = (el: HTMLElement) => {
      // enforce max stars
      const stars = el.querySelectorAll(':scope > .star');
      if (stars.length > maxStars) {
        // remove the oldest
        const first = stars[0] as HTMLElement | undefined;
        if (first) first.remove();
      }

      const size = Math.floor(Math.random() * 20) + 10; // 10..30
      const top = Math.floor(Math.random() * 100) - 50; // -50%..50%
      const left = Math.floor(Math.random() * 100); // 0..100%

      const span = document.createElement('span');
      span.className = 'star';
      span.style.top = `${top}%`;
      span.style.left = `${left}%`;
      span.style.background = 'transparent';

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', String(size));
      svg.setAttribute('height', String(size));
      svg.setAttribute('viewBox', '0 0 68 68');
      svg.setAttribute('fill', 'none');
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      (svg.style as CSSStyleDeclaration).background = 'transparent';

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', STAR_SVG_PATH);
      path.setAttribute('fill', color);

      svg.appendChild(path);
      span.appendChild(svg);
      el.appendChild(span);

      // Clean up after animation ends (~700ms), give buffer
      window.setTimeout(() => {
        span.remove();
      }, 800);
    };

    schedule();
    return () => {
      isUnmounted = true;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [color, maxStars, minDelayMs, maxDelayMs]);

  return React.createElement('span', { ref: containerRef, className: 'sparkling' }, children);
}

