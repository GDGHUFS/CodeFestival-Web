import { METADATA } from '@/constants/metadata';

import * as styles from './styles.css';

const Footer = () => {
  return (
    <footer className={styles.root}>
      <p className={styles.license}>
        {METADATA.footer.address}&nbsp;|&nbsp;
        <a href={`mailto:${METADATA.email}`}>{METADATA.email}</a>
        <br />© GDG on Campus HUFS. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
