// import ImageUpload from './components/ImageUpload';
'use client'
import ImageUpload from './components/ImageUpload3';
import React, { useState } from 'react';



const Home: React.FC = () => {
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [altText, setAltText] = useState('');

  const handleImageStatusChange = (isImageUploaded: boolean,uploadedImageUrl: string | null) => {
    setIsImageUploaded(isImageUploaded);
    setUploadedImageUrl(uploadedImageUrl);
  };

  const generateAltTags = async () => {
    if (!uploadedImageUrl) {
      console.log('No image uploaded');
      return; // Check if the image URL is available
    }
    try {
      // Assuming uploadedImageUrl is a path to the image or base64 data
      const response = await fetch('/api/generateAltTags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageBase64: uploadedImageUrl }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);
      setAltText(data.result.description_tags); // Adjust this based on the actual response structure
    } catch (error) {
      console.error('Error generating alt text:', error);
      setAltText('Failed to generate alt text.');
    }
  };
  
  return (
    <div className="flex flex-col items-center h-screen space-y-4 mb-36 poppins">
     <div>
        <h1 className='py-5 text-4xl bg-sky-200 font-semibold gradient-text'>
          AI generator from images to text tags
        </h1>
      </div>
      

      <div className='card w-96 bg-base-100 shadow-xl'>
      <ImageUpload onImageStatusChange={handleImageStatusChange} />
      </div>

      <div className="divider"></div>

      <div >
        <button 
          className={`btn btn-outline btn-accent ${!isImageUploaded ? 'btn-disabled' : ''}`}
          disabled={!isImageUploaded}
          onClick={generateAltTags}>
          Generate Alt Text
        </button>
      </div>

      <div >
        {altText && (
          <div className="mt-4 p-4 bg-blue-100 rounded-lg">
            <p>Generated Alt Text: {altText}</p>
          </div>
        )}
      </div>


     </div>

  );
};

export default Home;

