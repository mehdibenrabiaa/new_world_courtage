/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const { version } = require('./package.json')

// Evaluated once when `next build`/`next dev`/`next start` boots — not per
// request or per page load — so every user sees the same "last updated"
// timestamp for this deploy (see pages/_app.js's console.log).
const buildTime = new Date().toISOString()

const nextConfig = {
  compress: true,
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_APP_VERSION: version,
    NEXT_PUBLIC_BUILD_TIME: buildTime,
  },
  async redirects() {
    return [
      {
        source: '/auto-insurance/car-insurance-calculator/devis/:path*',
        destination: '/assurance-transport/devis/:path*',
        permanent: true,
      },
      {
        source: '/auto-insurance/car-insurance-calculator/:path*',
        destination: '/assurance-transport/calculateur/:path*',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}

module.exports = withBundleAnalyzer(nextConfig)

