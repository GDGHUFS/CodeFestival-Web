import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import withPlaiceholder from '@plaiceholder/next';

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_VERCEL: process.env.VERCEL,
  }
};

export default withVanillaExtract(withPlaiceholder(nextConfig));
