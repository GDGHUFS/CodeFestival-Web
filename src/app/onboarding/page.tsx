'use client';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import CIShape from '@/components/common/CIShape';
import { rem } from '@/utils/pxto';

import DotRipples from './_components/DotRipples';
import * as styles from './page.css';

const Content = () => {
  const searchParams = useSearchParams();
  const ci = rem((searchParams.get('ci') ?? '480') + 'px');
  const logo = searchParams.get('logo') ?? '156';

  return (
    <div className={styles.root}>
      <div className={styles.background} aria-hidden>
        <DotRipples className={styles.ripples} />
      </div>
      <div className={styles.vignette} aria-hidden />

      <Image
        className={styles.logo}
        src="/static/images/ci.svg"
        alt="logo"
        width={Number(logo)}
        height={(Number(logo) / 156) * 52}
        draggable={false}
      />

      <div className={styles.content}>
        <h1 className={styles.title} aria-label="HUFS CodeFestival 8">
          <span className={styles.titleTag}>&lt;/hufs&gt;</span>
          <span className={styles.titleName}>codefestival 8</span>
        </h1>
        <div
          className={styles.ci}
          style={{ width: `min(${ci}, 52vh)`, height: `min(${ci}, 52vh)` }}
        >
          <CIShape />
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense>
      <Content />
    </Suspense>
  );
}
