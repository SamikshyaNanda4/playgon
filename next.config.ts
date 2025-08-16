import type { NextConfig } from "next";
// 
// const nextConfig: NextConfig = {
//   /* config options here */
//   
// };
// 
// export default nextConfig;



const nextConfig: NextConfig = {
  serverExternalPackages: ["@node-rs/argon2"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
