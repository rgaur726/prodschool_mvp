/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { dev }) => {
    // Disable filesystem cache in dev to avoid Windows rename ENOENT corruption
    if (dev) {
      config.cache = false
    }
    return config
  },
}

export default nextConfig
