
'use client'
import ImageUpload from './components/ImageUpload';
import TagsGenerate from './components/TagsGenerate';
import React, { useState } from 'react';



const Home: React.FC = () => {
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const handleImageStatusChange = (isImageUploaded: boolean,uploadedImageUrl: string | null) => {
    setIsImageUploaded(isImageUploaded);
    setUploadedImageUrl(uploadedImageUrl);
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

      <div>
      <TagsGenerate isImageUploaded={isImageUploaded} imageUrl={uploadedImageUrl}/>
      </div>

    </div>
  
  );
};

export default Home;

