import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: { remotePatterns: [{ hostname: "cdn.discordapp.com" }] },
  experimental: { serverActions: { bodySizeLimit: "6mb" } },
  allowedDevOrigins: process.env.ALLOWED_DEV_ORIGINS?.split(",") || [
    "localhost",
  ],
};

export default nextConfig;
