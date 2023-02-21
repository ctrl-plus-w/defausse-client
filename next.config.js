/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/scripts',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
