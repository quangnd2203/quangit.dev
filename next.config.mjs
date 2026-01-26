/**
 * @type {import('next').NextConfig}
 * experimental.inlineCss: inlines CSS in <head> instead of <link> to reduce
 * render-blocking. Supported from Next.js 15+; on Next 14 you may see an
 * "Unrecognized key" warning until upgraded.
 */
const nextConfig = {
  experimental: {
    inlineCss: true,
  },
};

export default nextConfig;
