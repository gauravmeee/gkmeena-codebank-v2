/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'firebasestorage.googleapis.com'],
  },
  // Disable static page generation for problematic routes
  // This will make them render on-demand instead
  experimental: {
    // Increase the static page generation timeout
    staticPageGenerationTimeout: 120,
  },
  // Configure which pages should be statically generated
  // and which should be server-rendered
  async rewrites() {
    return [
      // Add any API rewrites here if needed
    ];
  },
  // Configure which pages should be statically generated
  // and which should be server-rendered
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig; 