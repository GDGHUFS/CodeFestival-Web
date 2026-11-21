import { clsx } from 'clsx';
import Image from 'next/image';
import { ComponentProps } from 'react';

import * as styles from './styles.css';

type SponsorProps = ComponentProps<'section'>;

const Sponsor = ({ className, ...props }: SponsorProps) => {
  return (
    <section className={clsx(styles.grid, className)} {...props}>
      <div className={styles.organization}>
        <p className={styles.title}>Hosted By</p>
        <a href="https://soft.hufs.ac.kr/" target="_blank">
          <Image
            className={styles.logo}
            src="/static/images/ci_ai_education_division.webp"
            alt="AI Education Division @ HUFS"
            width={230.4}
            height={25.2}
            draggable={false}
          />
        </a>
      </div>
      <div className={styles.organization}>
        <p className={styles.title}>Organized by</p>
        <div className={styles.logoRow}>
          <a href="https://gdg.hufs.ac.kr/" target="_blank">
            <Image
              className={styles.logo}
              src="/static/images/ci_gdghufs.svg"
              alt="GDG on Campus HUFS"
              width={204.98}
              height={25.2}
              draggable={false}
            />
          </a>
          <a href="https://code.hufs.ac.kr/" target="_blank">
            <Image
              className={styles.logo}
              src="/static/images/ci_hufstory.svg"
              alt="HUFSTORY"
              width={109.11}
              height={25.2}
              draggable={false}
            />
          </a>
        </div>
      </div>
      <div className={styles.organization}>
        <p className={styles.title}>Our Sponsors</p>
        <a href="https://www.hanbit.co.kr/" target="_blank">
          <Image
            className={styles.logo}
            src="/static/images/ci_hanbit.svg"
            alt="Hanbit+"
            width={79.3}
            height={25.2}
            draggable={false}
          />
        </a>
      </div>
    </section>
  );
};

export default Sponsor;
