/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['127.0.0.1'],
  async redirects() {
    return [
      { source: '/compliance', destination: '/terms', permanent: true },
      // www is a second custom domain on the worker; send it to the apex so the
      // site keeps one canonical hostname and old bookmarks still resolve.
      // The bare-root rule must come first and stay: with only the catch-all,
      // ':path*' matches zero segments at '/' and ships the placeholder
      // un-substituted as the Location header.
      {
        source: '/',
        has: [{ type: 'host', value: 'www.sanafin.tech' }],
        destination: 'https://sanafin.tech/',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.sanafin.tech' }],
        destination: 'https://sanafin.tech/:path*',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default nextConfig
