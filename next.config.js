/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.scdn.co",
                port: '',
                pathname: '/image/*'
            }
        ]
    },
    transpilePackages: ['lucide-react'] // Add this
}

module.exports = nextConfig
