const cloudinary = require('cloudinary').v2;

// Konfigurera Cloudinary med dina autentiseringsuppgifter
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, // Ersätt med ditt Cloud Name
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,        // Ersätt med din API Key
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,  // Ersätt med din API Secret
});

module.exports = cloudinary;
