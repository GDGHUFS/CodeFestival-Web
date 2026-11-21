'use client';

import { MouseEvent, useEffect, useRef } from 'react';

import { scrollToHeading } from '../../scrollToHeading';
import { formatRelativeTimestamp } from '../../timestamp';

type ArticleContentProps = {
  html: string;
};

const HEADING_SELECTOR = 'h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]';

const RELATIVE_TIMESTAMP_SELECTOR = 'time[data-format="R"]';
const RELATIVE_TIMESTAMP_INTERVAL = 60 * 1000;

const ArticleContent = ({ html }: ArticleContentProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateRelativeTimestamps = () => {
      contentRef.current
        ?.querySelectorAll<HTMLTimeElement>(RELATIVE_TIMESTAMP_SELECTOR)
        .forEach(element => {
          element.textContent = formatRelativeTimestamp(new Date(element.dateTime));
        });
    };

    updateRelativeTimestamps();
    const interval = setInterval(updateRelativeTimestamps, RELATIVE_TIMESTAMP_INTERVAL);
    return () => clearInterval(interval);
  }, [html]);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    const heading = event.target.closest(HEADING_SELECTOR);
    if (heading && event.currentTarget.contains(heading)) {
      scrollToHeading(heading.id);
    }
  };

  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  return <div ref={contentRef} onClick={handleClick} dangerouslySetInnerHTML={{ __html: html }} />;
};

export default ArticleContent;
