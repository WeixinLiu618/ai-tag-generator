import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import TagsGenerate from './TagsGenerate';

const ParentComponent: React.FC = () => {
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageStatusChange = (uploaded: boolean, url: string | null) => {
    setIsUploaded(uploaded);
    setImageUrl(url);
  };

  return (
    <div>
      <ImageUpload onImageStatusChange={handleImageStatusChange} />
      <TagsGenerate isImageUploaded ={isUploaded} imageUrl={imageUrl} />
    </div>
  );
};

export default ParentComponent;
