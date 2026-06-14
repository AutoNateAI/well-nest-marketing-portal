import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: process.env.NEXT_OUTPUT === 'export' ? 'export' : undefined,
  basePath: process.env.GITHUB_PAGES === 'true' ? '/well-nest-marketing-portal' : undefined,
  assetPrefix: process.env.GITHUB_PAGES === 'true' ? '/well-nest-marketing-portal/' : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
