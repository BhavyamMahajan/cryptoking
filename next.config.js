/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.coinranking.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.bing.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "coinrevolution.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
