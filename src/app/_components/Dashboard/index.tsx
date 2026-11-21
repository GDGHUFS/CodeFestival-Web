'use client';

import { clsx } from 'clsx';
import Link from 'next/link';
import { type MouseEvent, useCallback, useEffect, useRef, useState } from 'react';

import CIShape from '@/components/common/CIShape';
import ScrollDownIndicator from '@/components/common/ScrollDownIndicator';
import { useCurrentEvent } from '@/contexts/CurrentEventContext';
import { usePrefersKorean } from '@/hooks/usePrefersKorean';
import { useRevealOnLoad } from '@/hooks/useRevealOnLoad';
import { beginCodeFestivalLogin, getAccessToken } from '@/services/api';
import { dotGridAnimated } from '@/styles/dotGrid.css';
import { formatEventDate } from '@/utils/application';

import * as styles from './styles.css';

const LINE_NUMBERS = Array.from({ length: 48 }, (_, index) => index + 1);
const DATE_SKELETON_TEXT = formatEventDate('2026-12-03');
const SCENE_PREPARE_TIMEOUT_MS = 1200;
const SCENE_ENTRANCE_DELAY_MS = 200;

const KST_OFFSET_MS = 9 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
const DEADLINE_NOTICE_DAYS = 3;

const getKstDayNumber = (time: number) => Math.floor((time + KST_OFFSET_MS) / DAY_MS);

const getDeadlineNotice = (closesAt: string, now: number) => {
  const daysLeft = getKstDayNumber(new Date(`${closesAt}+09:00`).getTime()) - getKstDayNumber(now);
  if (daysLeft < 0 || daysLeft > DEADLINE_NOTICE_DAYS) {
    return null;
  }

  return `신청 마감 D-${daysLeft === 0 ? 'Day' : daysLeft}`;
};

const REGISTER_LABELS = {
  ko: {
    open: '참가 신청하기',
    view: '신청 내역 확인하기',
    notYetOpen: '참가 신청 오픈 예정',
    closed: '참가 신청 마감',
    unavailable: '신청 정보를 불러오지 못했습니다',
  },
  en: {
    open: 'Registration',
    view: 'View Application',
    notYetOpen: 'Registration Not Yet Open',
    closed: 'Registration Closed',
    unavailable: 'Registration Unavailable',
  },
} as const;

const handleRegisterClick = (event: MouseEvent<HTMLAnchorElement>) => {
  if (
    getAccessToken() ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  event.preventDefault();
  beginCodeFestivalLogin();
};

const Dashboard = () => {
  const { event, error, loading } = useCurrentEvent();
  const revealOnLoad = useRevealOnLoad(loading);
  const prefersKorean = usePrefersKorean();
  const registerLabels = prefersKorean ? REGISTER_LABELS.ko : REGISTER_LABELS.en;
  const registerClassName = clsx(
    styles.registerLink,
    prefersKorean && styles.registerKorean,
    revealOnLoad && styles.revealRegister,
  );
  const [currentTime, setCurrentTime] = useState(() => Date.now());
  const backdropRef = useRef<HTMLDivElement>(null);
  const [scenePrepared, setScenePrepared] = useState(false);
  const handleScenePrepared = useCallback(() => setScenePrepared(true), []);
  const [gridStarted, setGridStarted] = useState(false);
  const [sceneStarted, setSceneStarted] = useState(false);
  const registrationNotOpen =
    event && currentTime < new Date(`${event.registrationOpensAt}+09:00`).getTime();
  const registrationClosed =
    event && currentTime > new Date(`${event.registrationClosesAt}+09:00`).getTime();
  const eventEnded =
    event && currentTime > new Date(`${event.eventDate}T23:59:59.999+09:00`).getTime();
  const deadlineNotice =
    event && !registrationNotOpen && !registrationClosed
      ? getDeadlineNotice(event.registrationClosesAt, currentTime)
      : null;

  useEffect(() => {
    const interval = window.setInterval(() => setCurrentTime(Date.now()), 60_000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => setScenePrepared(true), SCENE_PREPARE_TIMEOUT_MS);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!scenePrepared) {
      return;
    }

    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => setGridStarted(true));
    });
    return () => cancelAnimationFrame(frame);
  }, [scenePrepared]);

  useEffect(() => {
    if (!gridStarted) {
      return;
    }

    const backdrop = backdropRef.current;
    const isGridAnimating =
      !!backdrop &&
      typeof backdrop.getAnimations === 'function' &&
      backdrop.getAnimations({ subtree: true }).length > 0;
    const timeout = window.setTimeout(
      () => setSceneStarted(true),
      isGridAnimating ? SCENE_ENTRANCE_DELAY_MS : 0,
    );
    return () => window.clearTimeout(timeout);
  }, [gridStarted]);

  return (
    <section className={styles.root}>
      <div
        ref={backdropRef}
        className={clsx(styles.backdrop, gridStarted && dotGridAnimated)}
        aria-hidden
      />
      <ol className={styles.gutter} aria-hidden>
        {LINE_NUMBERS.map(lineNumber => (
          <li key={lineNumber}>{lineNumber}</li>
        ))}
      </ol>
      <div className={styles.guides} aria-hidden>
        <span className={styles.guideOuter} />
        <span className={styles.guideInner} />
      </div>

      <div className={styles.heading}>
        <h1
          className={styles.title}
          aria-label={event ? `HUFS CodeFestival ${event.edition}` : 'HUFS CodeFestival'}
        >
          <span className={styles.titleTag}>&lt;/hufs&gt;</span>
          <span className={styles.titleName}>
            codefestival{' '}
            {event && (
              <span className={clsx(styles.titleEdition, revealOnLoad && styles.revealDate)}>
                {event.edition}
              </span>
            )}
          </span>
        </h1>
        {loading ? (
          <span className={styles.dateSkeleton} aria-hidden>
            {DATE_SKELETON_TEXT}
          </span>
        ) : (
          <p className={clsx(styles.date, revealOnLoad && styles.revealDate)}>
            {event ? formatEventDate(event.eventDate) : '일정 추후 공개'}
          </p>
        )}
      </div>

      <div className={styles.stage}>
        <div className={styles.details}>
          {loading ? (
            <span
              className={clsx(
                styles.registerSkeleton,
                prefersKorean && styles.registerSkeletonKorean,
              )}
              aria-hidden
            />
          ) : !event && error ? (
            <span className={clsx(registerClassName, styles.registerClosed)}>
              {registerLabels.unavailable}
            </span>
          ) : !event || registrationNotOpen ? (
            <span className={clsx(registerClassName, styles.registerClosed)}>
              {registerLabels.notYetOpen}
            </span>
          ) : eventEnded ? (
            <span className={clsx(registerClassName, styles.registerClosed)}>
              {registerLabels.closed}
            </span>
          ) : registrationClosed ? (
            <Link className={registerClassName} href="/apply" onClick={handleRegisterClick}>
              {registerLabels.view}
              <span className={styles.registerArrow} aria-hidden>
                →
              </span>
            </Link>
          ) : (
            <Link className={registerClassName} href="/apply" onClick={handleRegisterClick}>
              {registerLabels.open}
              <span className={styles.registerArrow} aria-hidden>
                →
              </span>
            </Link>
          )}
          <p className={styles.souvenir}>{deadlineNotice ?? '참여자 전원 기념품 증정'}</p>
        </div>
        <div className={styles.ci}>
          <CIShape start={sceneStarted} onPrepared={handleScenePrepared} />
        </div>
      </div>

      <ScrollDownIndicator className={styles.scrollIndicator} />
    </section>
  );
};

export default Dashboard;
