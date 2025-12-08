/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qingmu.cloud',
      },
    ],
    unoptimized: true,
  },
  env: {
  },
}

module.exports = nextConfig