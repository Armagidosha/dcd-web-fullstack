import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  cacheComponents: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.discordapp.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  experimental: { serverActions: { bodySizeLimit: "6mb" } },
  allowedDevOrigins: process.env.ALLOWED_DEV_ORIGINS?.split(",") || [
    "localhost",
  ],
};

export default nextConfig;
