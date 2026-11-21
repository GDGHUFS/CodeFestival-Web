'use client';
import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useState } from 'react';

import { MENU } from '@/constants/menu';
import { useCurrentEvent } from '@/contexts/CurrentEventContext';
import { useRevealOnLoad } from '@/hooks/useRevealOnLoad';
import { revealAfterLoad } from '@/styles/skeleton.css';

import MobileMenu from './MobileMenu';
import * as styles from './styles.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { event, loading } = useCurrentEvent();
  const revealOnLoad = useRevealOnLoad(loading);
  const menu = event
    ? [{ title: event.title, href: `/festival/${encodeURIComponent(event.edition)}` }, ...MENU]
    : MENU;

  return (
    <Fragment>
      <header className={styles.root}>
        <div className={styles.inner}>
          <Link className={styles.ci} href="/">
            <Image src="/static/images/ci.svg" alt="logo" draggable={false} fill loading="eager" />
          </Link>
          <nav className={styles.navigation}>
            {loading && <span className={styles.menuSkeleton} aria-hidden />}
            {menu.map((menuItem, index) => (
              <Link
                className={clsx(
                  styles.menu,
                  revealOnLoad && event && index === 0 && revealAfterLoad,
                )}
                href={menuItem.href}
                key={menuItem.href}
              >
                {menuItem.title}
              </Link>
            ))}
          </nav>
          <button className={styles.menuTrigger} onClick={() => setMenuOpen(!menuOpen)}>
            <Image
              src="/static/icons/ic_menu_24dp.svg"
              alt="menu"
              width={24}
              height={24}
              draggable={false}
            />
          </button>
        </div>
      </header>

      <MobileMenu menu={menu} loading={loading} open={menuOpen} setOpen={setMenuOpen} />
    </Fragment>
  );
};

export default Header;
