/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.strapi-emir.my.id" },
      { protocol: "https", hostname: "cms.strapi-emir.my.id" },
    ],
  },
}

module.exports = nextConfig
