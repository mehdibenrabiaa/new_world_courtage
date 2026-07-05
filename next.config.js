/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizeCss: true,
  },
  async redirects() {
    return [
      {
        source: '/auto-insurance/car-insurance-calculator/devis/:path*',
        destination: '/assurance-auto/calculateur/devis/:path*',
        permanent: true,
      },
      {
        source: '/auto-insurance/car-insurance-calculator/:path*',
        destination: '/assurance-auto/calculateur/:path*',
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

module.exports = nextConfig
