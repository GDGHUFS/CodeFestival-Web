'use client';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ReactNode } from 'react';

import useScreenSize from '@/hooks/useScreenSize';

type ProvidersProps = {
  children: ReactNode;
};

const isVercel = process.env.NEXT_PUBLIC_VERCEL === '1';

const Providers = ({ children }: ProvidersProps) => {
  useScreenSize();

  return (
    <>
      {isVercel && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}
      {children}
    </>
  );
};

export default Providers;
