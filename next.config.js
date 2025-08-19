/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["puppeteer-core"],
    },
    // Ensure optional peer deps from debug are not required at runtime
    webpack: (config) => {
        config.module.rules.push({
            test: /\.map$/,
            use: "ignore-loader",
        });
        // Mark supports-color as external optional dependency to silence warnings
        config.resolve = config.resolve || {};
        config.resolve.fallback = {
            ...(config.resolve.fallback || {}),
            "supports-color": false,
        };
        return config;
    },
};

// Bundle analyzer
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
