import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [96, 160, 240, 320, 480, 640],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "@react-three/drei"],
  },
  async redirects() {
    return [
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/services/property-buying-selling",
        destination: "/services/real-estate",
        permanent: true,
      },
      {
        source: "/services/construction",
        destination: "/services/building-construction",
        permanent: true,
      },
      {
        source: "/services/consulting",
        destination: "/services/construction-consulting",
        permanent: true,
      },
      {
        source: "/services/3d-elevation",
        destination: "/services/3d-elevation-design",
        permanent: true,
      },
      {
        source: "/services/dtcp-lpa",
        destination: "/services/dtcp-lpa-approval",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
