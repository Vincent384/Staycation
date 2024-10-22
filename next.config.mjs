/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['images.unsplash.com',
        
        "res.cloudinary.com"
      ], // Lägg till Unsplash som en tillåten domän
    },
  }
  
export default nextConfig
  