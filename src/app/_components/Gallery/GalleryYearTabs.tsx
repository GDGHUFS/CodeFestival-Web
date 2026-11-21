'use client';

import { Children, type KeyboardEvent, type ReactNode, useId, useRef, useState } from 'react';

import * as styles from './styles.css';

type GalleryYearTabsProps = {
  years: number[];
  children: ReactNode;
};

const GalleryYearTabs = ({ years, children }: GalleryYearTabsProps) => {
  const id = useId();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  if (years.length <= 1) {
    return children;
  }

  const panels = Children.toArray(children);
  const lastIndex = years.length - 1;

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const nextIndex: Record<string, number> = {
      ArrowRight: selectedIndex === lastIndex ? 0 : selectedIndex + 1,
      ArrowLeft: selectedIndex === 0 ? lastIndex : selectedIndex - 1,
      Home: 0,
      End: lastIndex,
    };
    if (!(event.key in nextIndex)) {
      return;
    }

    event.preventDefault();
    setSelectedIndex(nextIndex[event.key]);
    tabRefs.current[nextIndex[event.key]]?.focus();
  };

  return (
    <>
      <div className={styles.tabList} role="tablist" aria-label="Gallery year">
        {years.map((year, index) => {
          const selected = index === selectedIndex;
          return (
            <button
              key={year}
              ref={element => {
                tabRefs.current[index] = element;
              }}
              id={`${id}-tab-${year}`}
              className={styles.tab}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${id}-panel-${year}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setSelectedIndex(index)}
              onKeyDown={handleKeyDown}
            >
              {year}
            </button>
          );
        })}
      </div>

      {panels.map((panel, index) => (
        <div
          key={years[index]}
          id={`${id}-panel-${years[index]}`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${years[index]}`}
          hidden={index !== selectedIndex}
        >
          {panel}
        </div>
      ))}
    </>
  );
};

export default GalleryYearTabs;
