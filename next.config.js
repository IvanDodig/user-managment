/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_URL: "https://636f79e5bb9cf402c81879d3.mockapi.io/api/v1",
  },
};

module.exports = nextConfig;
