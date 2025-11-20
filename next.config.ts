import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Allow build to succeed even with ESLint errors (for now)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allow build to succeed even with TypeScript errors (for now)
    ignoreBuildErrors: true,
  },
  // Include Prisma binaries for Vercel serverless functions
  outputFileTracingIncludes: {
    '/api/**/*': ['./node_modules/.prisma/client/**/*'],
    '/*': ['./node_modules/.prisma/client/**/*'],
  },
};

export default nextConfig;
