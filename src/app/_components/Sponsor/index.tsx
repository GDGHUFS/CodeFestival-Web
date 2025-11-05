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
            src="/static/images/ci_ai_education_institute.webp"
            alt="AI Education Institute @ HUFS"
            width={230.4}
            height={25.2}
            draggable={false}
          />
        </a>
      </div>
      <div className={styles.organization}>
        <p className={styles.title}>Organized by</p>
        <a href="https://gdg.hufs.ac.kr/" target="_blank">
          <Image
            className={styles.logo}
            src="/static/images/ci_gdghufs.webp"
            alt="GDG on Campus HUFS"
            width={230.4}
            height={25.2}
            draggable={false}
          />
        </a>
      </div>
      <div className={styles.organization}>
        <p className={styles.title}>Our Sponsors</p>
        <div className={styles.sponsorRow}>
          <a href="http://jpub.kr/" target="_blank">
            <Image
              className={styles.logo}
              src="/static/images/ci_jpub.webp"
              alt="Jpub Co., Ltd."
              width={83.78}
              height={25.2}
              draggable={false}
            />
          </a>
          <a href="https://www.easyspub.co.kr/" target="_blank">
            <Image
              className={styles.logo}
              src="/static/images/ci_easypub.webp"
              alt="EasysPublishing Co., Ltd."
              width={165.41}
              height={25.2}
              draggable={false}
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Sponsor;
