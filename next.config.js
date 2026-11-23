/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  // Disable static generation for API routes
  experimental: {
    isrMemoryCacheSize: 0,
  },
  // Prevent Next.js from trying to prerender API routes
  staticPageGenerationTimeout: 0,
};

module.exports = nextConfig;
