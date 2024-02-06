/** @type {import('next').NextConfig} */
import BundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = BundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },
};

export default withBundleAnalyzer(nextConfig);
