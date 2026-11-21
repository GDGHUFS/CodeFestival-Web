import { clsx } from 'clsx';
import { ComponentProps } from 'react';

import * as styles from './styles.css';

const ScrollDownIndicator = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div className={clsx(styles.wrapper, className)} {...props}>
      <div className={styles.scroll}>
        <svg height="30" width="10">
          <circle className={styles.dot} cx="5" cy="15" r="2" />
          <circle className={styles.dot2} cx="5" cy="15" r="2" />
        </svg>
      </div>
    </div>
  );
};

export default ScrollDownIndicator;
