/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "static.gamma.nl" },
      { hostname: "static.karwei.nl" },
      { hostname: "upload.wikimedia.org" },
    ],
  },
};

module.exports = nextConfig;
