import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@meridian/ui", "@meridian/db", "@meridian/config", "@meridian/types"],
};

export default nextConfig;
