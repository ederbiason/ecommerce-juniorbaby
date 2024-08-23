/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "firebasestorage.googleapis.com"
            },
            {
                hostname: "www.melhorenvio.com.br"
            }
        ],
    }
}

module.exports = nextConfig
