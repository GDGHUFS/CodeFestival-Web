import Image, { ImageProps } from 'next/image';

import getBase64 from '@/utils/getBase64';

type ImagePlaceholderProps = Omit<ImageProps, 'src'> & {
  src: string;
};

const ImagePlaceholder = async ({ src, alt, ...props }: ImagePlaceholderProps) => {
  const { base64, img } = await getBase64(src);

  if (props.fill) {
    return <Image src={src} alt={alt} placeholder="blur" blurDataURL={base64} {...props} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={img.width}
      height={img.height}
      sizes="65vw"
      style={{ height: 'auto' }}
      placeholder="blur"
      blurDataURL={base64}
      {...props}
    />
  );
};

export default ImagePlaceholder;
