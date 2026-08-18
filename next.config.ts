import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Gallery / portfolio
      { source: "/portfolio", destination: "/gallery", permanent: true },
      { source: "/portfolio-collections/my-portfolio", destination: "/gallery", permanent: true },
      { source: "/portfolio-collections/my-portfolio/custom-closets-showcase", destination: "/gallery", permanent: true },
      { source: "/portfolio-collections/my-portfolio/:slug*", destination: "/gallery", permanent: true },
      { source: "/projects-7", destination: "/gallery", permanent: true },

      // Services
      { source: "/service-page/closet-and-storage-consultation", destination: "/services", permanent: true },
      { source: "/services-4", destination: "/services", permanent: true },
      { source: "/category/closets", destination: "/services/walk-in-closets", permanent: true },
      { source: "/category/cabinets", destination: "/services/garage-storage", permanent: true },
      { source: "/category/storage", destination: "/services/pantry-systems", permanent: true },
      { source: "/category/all-products", destination: "/services", permanent: true },

      // Contact / booking / inquiries
      { source: "/book-online", destination: "/contact", permanent: true },
      { source: "/inquiry-services-page", destination: "/contact", permanent: true },

      // Old Wix product pages — no direct equivalent, send to services overview
      { source: "/product-page/:slug*", destination: "/services", permanent: true },
    ];
  },
};

export default nextConfig;
