import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@portfolio/ui', '@portfolio/types'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
    ],
  },
}

export default nextConfig
