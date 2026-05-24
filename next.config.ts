import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "docs",
  basePath: "/adventures-in-aviation-website",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
