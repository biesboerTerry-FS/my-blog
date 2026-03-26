import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

const isProd = process.env.NODE_ENV === 'production';
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || '';
const isUserSite = repoName.endsWith('.github.io');
const computedBasePath = isProd && repoName && !isUserSite ? `/${repoName}` : '';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? computedBasePath;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  output: 'export',
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default withMDX(nextConfig);
