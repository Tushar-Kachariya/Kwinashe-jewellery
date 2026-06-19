/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd2spbytg38ui5z.cloudfront.net',
      },
    ],
  },
};

export default nextConfig;
