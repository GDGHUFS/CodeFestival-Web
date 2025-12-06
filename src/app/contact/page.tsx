import Layout from '@/components/common/Layout';
import { METADATA } from '@/constants/metadata';

import * as styles from './page.css';

export default function Page() {
  return (
    <Layout className={styles.root}>
      <div className={styles.contactInfo}>
        <p className={styles.contactText}>문의 사항은 아래 이메일로 연락 부탁드립니다.</p>
        <a href={`mailto:${METADATA.email}`}>{METADATA.email}</a>
      </div>
      <br />

      <div className={styles.contactInfo}>
        <h2 className={styles.contactTitle}>오시는 길</h2>
        <p className={styles.contactAddress}>{METADATA.contact.address}</p>
        <div className={styles.mapContainer}>
          <iframe
            title="오시는 길 지도"
            src={METADATA.contact.mapUrl}
            className={styles.map}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </Layout>
  );
}
