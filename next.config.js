/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  compress: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: '/auto-insurance/car-insurance-calculator/devis/:path*',
        destination: '/assurance-transport/calculateur/devis/:path*',
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

