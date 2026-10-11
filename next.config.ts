import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Service pages retired when the lineup was narrowed to softener, filtration, and tankless RO.
  async redirects() {
    return [
      { source: "/services/reverse-osmosis-drinking-water", destination: "/services/tankless-reverse-osmosis", permanent: true },
      { source: "/services/carbon-filtration-systems", destination: "/services/whole-home-water-filtration", permanent: true },
      { source: "/services/city-water-treatment", destination: "/services/whole-home-water-filtration", permanent: true },
      { source: "/services/well-water-treatment", destination: "/services", permanent: true },
    ];
  },
};

export default nextConfig;
