/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
      },
      {
        protocol: 'https',
        hostname: 'route-egypt-systems.s3.amazonaws.com', // احتياطي لو فيه صور تانية
      },
    ],
  },
};

export default nextConfig;