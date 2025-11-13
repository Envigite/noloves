import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "static.wikia.nocookie.net",
      "res.cloudinary.com",
      "cdn.pixabay.com"
      // agrega los dominios reales que usas
    ],
  }
};

export default nextConfig;
