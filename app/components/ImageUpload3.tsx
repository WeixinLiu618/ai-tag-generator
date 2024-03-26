'use client'
import React, { useCallback, useState } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';

interface ImageUpload3Props {
  onImageStatusChange: (isUploaded: boolean, imageUrl: string | null) => void;
}

const ImageUpload3: React.FC<ImageUpload3Props> = ({ onImageStatusChange }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    const file = acceptedFiles[0]; // Since we're expecting only one file
    const imageURL = URL.createObjectURL(file);
    setUploadedImage(imageURL);
    onImageStatusChange(true, imageURL);
  }, [onImageStatusChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/webp': ['.webp'],
    },
    maxSize: 10485760 // 10MB
  });

  return (
    <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-5 text-center relative overflow-hidden cursor-pointer">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <div>
          <p>Click to select or drag and drop</p>
          <p className='py-2'>JPG, WebP, GIF, PNG (max 10MB)</p>
        </div>
      )}
      <div className='py-6'>
        <button className="btn">
            Upload Image
            <img src="/cloud-upload-signal-svgrepo-com.svg" className="h-6 w-6" alt="upload" />
        </button>
      </div>
      {uploadedImage && <img src={uploadedImage} alt="Preview" className="pt-4 w-full max-h-60 object-cover"/>}
      
    </div>
  );
};

export default ImageUpload3;
