/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['127.0.0.1'],
  async redirects() {
    return [
      { source: '/compliance', destination: '/terms', permanent: true },
      // The booking page moved from /demo to /call when /demo became the product
      // walkthrough. Outreach links carry ?role=…; the query is passed through.
      // The value regex is required: OpenNext's router treats a query condition
      // without a value as always matching, which would redirect bare /demo too.
      { source: '/demo', has: [{ type: 'query', key: 'role', value: '.+' }], destination: '/call', permanent: false },
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
      {
        // Private preview behind a passcode: never indexed, never cached by an intermediary.
        source: '/app/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
          { key: 'Cache-Control', value: 'private, no-store' },
        ],
      },
    ]
  },
}

export default nextConfig
