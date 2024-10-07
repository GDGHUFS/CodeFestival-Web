'use client';
import { clsx } from 'clsx';
import { JetBrains_Mono } from 'next/font/google';

import CIShape from '@/components/CIShape';
import Layout from '@/components/Layout';

import * as styles from './page.css';

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500', '600'],
});

export default function Home() {
  return (
    <Layout>
      <div className={styles.background}></div>
      <h1 className={clsx(styles.branding, mono.className)}>HUFS CodeFestival</h1>
      <p className={clsx(styles.time, mono.className)}>31 September 2024</p>
      <div className={styles.ci}>
        <CIShape />
      </div>
    </Layout>
  );
}