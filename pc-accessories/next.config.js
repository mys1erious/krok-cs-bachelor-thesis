/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
        "lh3.googleusercontent.com",
        "games-sales.s3.eu-west-2.amazonaws.com",
    ]
  }
}

module.exports = nextConfig
