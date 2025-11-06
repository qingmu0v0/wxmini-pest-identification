/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: ['qingmu.cloud'],
    unoptimized: true,
  },
  env: {
  },
}

module.exports = nextConfig