import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  output: 'export',
  basePath: '/diaryOfTheLiftedGifted',
  trailingSlash: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: '/diaryOfTheLiftedGifted',
  },
};

export default withMDX(nextConfig);
