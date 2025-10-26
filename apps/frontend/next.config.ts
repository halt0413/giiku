import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",           //静的サイト出力を有効化
  images: {
    unoptimized: true,        
  },
};

export default nextConfig;
