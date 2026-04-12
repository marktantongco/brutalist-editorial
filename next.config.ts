import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repoName = "brutalist-editorial";

const nextConfig: NextConfig = {
  // For Vercel: "standalone"; For GitHub Pages: "export"
  output: isGitHubPages ? "export" : "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Base path for GitHub Pages (e.g., /brutalist-editorial)
  ...(isGitHubPages ? { basePath: `/${repoName}` } : {}),
  // Disable image optimization for static export
  ...(isGitHubPages ? { images: { unoptimized: true } } : {}),
};

export default nextConfig;
