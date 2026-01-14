/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Required for static site hosting
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true, // Required for 'export' to work with next/image
  },
  // This ensures trailing slashes are handled correctly in static exports
  trailingSlash: true, 
};

module.exports = nextConfig;
