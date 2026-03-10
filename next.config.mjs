/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  output: 'export',
  basePath: '/my-blog',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
