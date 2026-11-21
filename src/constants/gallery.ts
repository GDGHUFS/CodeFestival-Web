export type GalleryItem = {
  src: string;
  alt: string;
  href: string;
};

export type GalleryYear = {
  [id: string]: GalleryItem;
};

export type Gallery = {
  [year: number]: GalleryYear;
};

export const GALLERY: Gallery = {
  2023: {
    '7d9ca8d9-2008-4a3f-acd8-e89cd190f929.jpg': {
      src: '/static/galleries/2023/7d9ca8d9-2008-4a3f-acd8-e89cd190f929.jpg',
      alt: '2023 Code Festival',
      href: '/gallery/2023/7d9ca8d9-2008-4a3f-acd8-e89cd190f929.jpg',
    },
    '7b6fbf42-9071-49fa-8bd5-368b2f5525a2.jpg': {
      src: '/static/galleries/2023/7b6fbf42-9071-49fa-8bd5-368b2f5525a2.jpg',
      alt: '2023 Code Festival MD',
      href: '/gallery/2023/7b6fbf42-9071-49fa-8bd5-368b2f5525a2.jpg',
    },
    'bdee2cbd-3dfe-49bf-8b22-74a4e14d50a9.jpg': {
      src: '/static/galleries/2023/bdee2cbd-3dfe-49bf-8b22-74a4e14d50a9.jpg',
      alt: '2023 Code Festival GyeongRok',
      href: '/gallery/2023/bdee2cbd-3dfe-49bf-8b22-74a4e14d50a9.jpg',
    },
    '3f2c5a8d-6ec3-49db-9943-4bf29969da6f.jpg': {
      src: '/static/galleries/2023/3f2c5a8d-6ec3-49db-9943-4bf29969da6f.jpg',
      alt: '2023 Code Festival Staff',
      href: '/gallery/2023/3f2c5a8d-6ec3-49db-9943-4bf29969da6f.jpg',
    },
  },
  2025: {
    'ef37cef5-c971-4e60-ba16-4563ce88cf64.jpg': {
      src: '/static/galleries/2025/ef37cef5-c971-4e60-ba16-4563ce88cf64.jpg',
      alt: '2025 Code Festival Contest @ Seoul',
      href: '/gallery/2025/ef37cef5-c971-4e60-ba16-4563ce88cf64.jpg',
    },
    '09c9ef4a-0b2d-4250-ba4e-bafaa7ebac4b.jpg': {
      src: '/static/galleries/2025/09c9ef4a-0b2d-4250-ba4e-bafaa7ebac4b.jpg',
      alt: '2025 Code Festival Contest PC',
      href: '/gallery/2025/09c9ef4a-0b2d-4250-ba4e-bafaa7ebac4b.jpg',
    },
    'd05af74e-df28-4453-9630-aa726980a294.jpg': {
      src: '/static/galleries/2025/d05af74e-df28-4453-9630-aa726980a294.jpg',
      alt: '2025 Code Festival Opening Ceremony',
      href: '/gallery/2025/d05af74e-df28-4453-9630-aa726980a294.jpg',
    },
    'b6f32375-4591-42f2-b90d-a929e0e02d58.jpg': {
      src: '/static/galleries/2025/b6f32375-4591-42f2-b90d-a929e0e02d58.jpg',
      alt: '2025 Code Festival Scoreboard @ Global',
      href: '/gallery/2025/b6f32375-4591-42f2-b90d-a929e0e02d58.jpg',
    },
  },
};

export const findGalleryItem = (year: string, id: string) => {
  const images = GALLERY[Number(year)];
  return images && Object.hasOwn(images, id) ? images[id] : undefined;
};
