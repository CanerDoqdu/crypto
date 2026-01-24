/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment', // or 'inline' based on your use case
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    qualities: [60, 75, 90],
  },
};

export default nextConfig;
