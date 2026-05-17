import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // better-auth proxy
    async rewrites() {
        return [
            {
                // Explicitly map auth requests
                source: "/api/auth/:path*",
                destination:
                    process.env.NEXT_PUBLIC_BACKEND_API + "/api/auth/:path*",
            },
            {
                // Explicitly map v1 API requests
                source: "/api/v1/:path*",
                destination:
                    process.env.NEXT_PUBLIC_BACKEND_API + "/api/v1/:path*",
            },
        ];
    },
};

export default nextConfig;
