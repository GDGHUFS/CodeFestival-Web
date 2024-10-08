'use server';
import { getPlaiceholder } from 'plaiceholder';

export const getBlurImageData = async (src: string) => {
  const buffer = await fetch(src).then(async res => {
    return Buffer.from(await res.arrayBuffer());
  });

  const { base64 } = await getPlaiceholder(buffer, { format: ['webp'], size: 64 });
  return base64;
};
