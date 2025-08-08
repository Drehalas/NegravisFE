import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed static export to eliminate HTML generation
  // output: "export", 
  
  // Enable image optimization for better performance
  images: {
    // unoptimized: true, // No longer needed without static export
    domains: [], // Add allowed image domains here if needed
  },
  
  typescript: {
    // Enforce strict TypeScript checking for better code quality
    ignoreBuildErrors: false,
  },
  
  // Enable experimental features for better TypeScript support
  experimental: {
    // Disable typedRoutes temporarily to resolve Link href issues
    // typedRoutes: true,
  },
  
  // Webpack optimizations
  webpack: (config, { isServer }) => {
    // Optimize bundle size and performance
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks?.cacheGroups,
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    };
    
    return config;
  },
};

export default nextConfig;
