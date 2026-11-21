'use client';

import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { useCurrentEvent } from '@/contexts/CurrentEventContext';
import { useRevealOnLoad } from '@/hooks/useRevealOnLoad';
import { revealAfterLoad } from '@/styles/skeleton.css';
import { parseEventDate } from '@/utils/application';

import * as styles from './styles.css';

const formatEventDateEnglish = (eventDate: string) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Seoul',
  }).format(parseEventDate(eventDate));

const Intro = () => {
  const { event, loading } = useCurrentEvent();
  const revealOnLoad = useRevealOnLoad(loading);

  return (
    <section>
      <h2 className={styles.title}>INTRO</h2>
      <p className={styles.description}>
        HUFS CodeFestival, the largest coding competition at HUFS, will be held
        {event ? ` on ${formatEventDateEnglish(event.eventDate)}` : ' soon'}.
        <br />
        Participants can join either the Algorithm Track, which tests algorithm design and
        implementation skills, or the AI Track, where you solve problems using generative AI.
        <br />
        Every winner receives an award from the President of HUFS along with prize money, and all
        participants receive a souvenir.
        <br />
      </p>
      {loading ? (
        <span className={styles.directLinkSkeleton} aria-hidden />
      ) : event ? (
        <Link
          className={clsx(styles.directLink, revealOnLoad && revealAfterLoad)}
          href={`/festival/${encodeURIComponent(event.edition)}`}
        >
          {event.title}
          <Image
            src="/static/icons/ic_arrow_right_alt_24dp.svg"
            alt="navigate"
            width={24}
            height={24}
          />
        </Link>
      ) : (
        <span className={styles.directLinkPlaceholder} aria-hidden />
      )}
    </section>
  );
};

export default Intro;
