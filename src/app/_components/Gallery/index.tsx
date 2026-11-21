import Link from 'next/link';

import ImagePlaceholder from '@/components/system/ImagePlaceholder';
import { GALLERY } from '@/constants/gallery';

import GalleryYearTabs from './GalleryYearTabs';
import * as styles from './styles.css';

const Gallery = () => {
  const years = Object.keys(GALLERY)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <section>
      <h2 className={styles.title}>GALLERY</h2>

      <GalleryYearTabs years={years}>
        {years.map(year => (
          <div key={year} className={styles.grid}>
            {Object.entries(GALLERY[year]).map(([id, image]) => (
              <Link key={id} href={image.href} className={styles.imageContainer} scroll={false}>
                <ImagePlaceholder src={image.src} alt={image.alt} fill sizes="100%" />
              </Link>
            ))}
          </div>
        ))}
      </GalleryYearTabs>
    </section>
  );
};

export default Gallery;
