import { v2 as cloudinary } from 'cloudinary';

// Initialize Cloudinary with your Cloud Name, API Key, and API Secret
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const MAX_RETRIES = 3; // Maximum number of retries
const RETRY_DELAY_MS = 1000; // Delay between retries in milliseconds

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { publicId } = req.body;

  try {
    console.log("publicId:", publicId);

    if (!publicId) {
      console.error('Failed to extract publicId from URL:', publicId);
      return res.status(400).json({ success: false, error: 'Invalid URL' });
    }

    let attempt = 0;
    let success = false;
    let lastError;

    while (attempt < MAX_RETRIES && !success) {
      try {
        const result = await cloudinary.uploader.destroy(publicId);

        if (result.result === 'ok') {
          success = true;
          return res.status(200).json({ success: true });
        } else {
          console.error('Failed to delete image:', result.result);
          lastError = result.result;
        }
      } catch (error) {
        console.error('Error deleting image:', error);
        lastError = error;
      }

      attempt++;
      if (!success && attempt < MAX_RETRIES) {
        console.log(`Retrying in ${RETRY_DELAY_MS}ms...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
      }
    }

    // If all retries failed, return error response
    return res.status(500).json({ success: false, error: lastError });
  } catch (error) {
    console.error('Error handling delete request:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
