import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "docs",
  basePath: isProd ? "/adventures-in-aviation-website" : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
