import React, { useState } from 'react';
import { Image, Transformation } from 'cloudinary-react';

const CloudinaryImageUpload = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [publicId, setPublicId] = useState('');

  // Function to handle image upload
  const handleUpload = async (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default'); // Replace with your upload preset

    // Upload image to Cloudinary
    // const response = await fetch('https://api.cloudinary.com/v1_1/dution6q9/image/upload', {
    //   method: 'POST',
    //   body: formData,
    // });

    const response = await fetch('https://api.cloudinary.com/v1_1/dgz1wn9lj/image/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    console.log("data", data);
    // Set the uploaded image URL and public ID
    if (data) {
      setImageUrl(data.secure_url);
      setPublicId(data.public_id);
    }
  };

// Update your handleDelete function in CloudinaryImageUpload.js
const handleDelete = async () => {
  try {
    if (!imageUrl) {
      console.error('Missing publicId for deletion');
      return;
    }

    const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;
    const matchedRegex = imageUrl.match(regex);
    const publicId = matchedRegex ? matchedRegex[1] : null;

    console.log("publicId", publicId);

    const response = await fetch('/api/deleteImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ publicId }),
    });

    console.log('Fetch response:', response); // Log the response object

    const data = await response.json();

    console.log('Response data:', data); // Log the parsed JSON data

    if (data.success) {
      // Update the state or perform any other necessary actions
      setImageUrl('');
      setPublicId('');
    } else {
      console.error('Failed to delete image');
    }
  } catch (error) {
    console.error('Error deleting image:', error);
  }
};



  return (
    <div>
      <h2>Cloudinary Image Upload</h2>
      <input type="file" onChange={handleUpload} />
      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={imageUrl} alt="Cloudinary Image" />
          <button onClick={handleDelete}>Delete Image</button>
        </div>
      )}
    </div>
  );
};

export default CloudinaryImageUpload;

