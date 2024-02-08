/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/members',
        destination: '/members/accounts',
        permanent: true,
      },
      {
        source: '/',
        destination: '/events',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
