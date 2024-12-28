/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'uploads-ssl.webflow.com',
        pathname: '/**',
      }
    ],
  },
}

module.exports = nextConfig