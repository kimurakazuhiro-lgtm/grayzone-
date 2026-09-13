import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // VS Code から同じWi-Fi内の確認用URLを開いた場合も、
  // 開発用のJavaScriptを読み込めるようにします。
  allowedDevOrigins: ["192.168.0.119"],
};

export default nextConfig;
