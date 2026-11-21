'use client';

import { clsx } from 'clsx';
import { useEffect, useState, useRef } from 'react';

import * as styles from './styles.css';
import { scrollToHeading } from '../../scrollToHeading';

export type TOCType = {
  id: string;
  text: string;
  depth: number;
};

type TableOfContentsProps = {
  toc: TOCType[];
};

const TableOfContents = ({ toc }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string | null>(toc[0]?.id || null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      let lastVisibleId = activeId;
      entries.forEach(entry => {
        if (entry.isIntersecting) lastVisibleId = entry.target.id;
      });
      if (lastVisibleId) setActiveId(lastVisibleId);
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: '0px 0px -85% 0px',
      threshold: 0,
    });

    toc.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, [toc, activeId]);

  useEffect(() => {
    const list = listRef.current;
    const activeItem = list?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!list || !activeItem) return;

    const itemTop =
      activeItem.getBoundingClientRect().top - list.getBoundingClientRect().top + list.scrollTop;
    const itemBottom = itemTop + activeItem.offsetHeight;
    if (itemTop < list.scrollTop) {
      list.scrollTop = itemTop;
    } else if (itemBottom > list.scrollTop + list.clientHeight) {
      list.scrollTop = itemBottom - list.clientHeight;
    }
  }, [activeId]);

  return (
    <ul className={styles.list} ref={listRef}>
      {toc.map(({ id, text, depth }) => (
        <li key={id}>
          <button
            className={clsx(
              styles.item,
              styles.depth[depth as keyof typeof styles.depth],
              id === activeId && styles.active,
            )}
            aria-current={id === activeId ? 'true' : undefined}
            onClick={() => scrollToHeading(id)}
          >
            {text}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TableOfContents;
