// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: ["mandellawallet.com"],
//   },
//   async rewrites() {
//     return [
//       {
//         source: "/api/:path*",
//         destination: "https://pool.mandellawallet.com/api/:path*",
//       },
//     ];
//   },
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/external/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;