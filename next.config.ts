import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*", // Match any route starting with /api/v1
        destination:
          "https://live-bidding-backend-kbv1.onrender.com/api/v1/:path*", // Forward to your backend
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/diery17cm/**",
      },
    ],
  },
};

export default nextConfig;
