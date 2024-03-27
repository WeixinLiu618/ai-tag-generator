import React, { useCallback, useState, useRef } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';

interface ImageUploadProps {
  onImageStatusChange: (isUploaded: boolean, imageUrl: string | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageStatusChange }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadToCloudinary = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!); // Replace with your upload preset
    formData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!); // Replace with your cloud name

    fetch(`https://api.cloudinary.com/v1_1/${formData.get('cloud_name')}/image/upload`, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.secure_url)
      setUploadedImage(data.secure_url); // Use the secure URL for the uploaded image
      onImageStatusChange(true, data.secure_url);
    })
    .catch(err => console.error('Error uploading image:', err));
  };
  
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    const file = acceptedFiles[0]; // Since we're expecting only one file
    uploadToCloudinary(file);

  }, [onImageStatusChange]);

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };
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
        <button className="btn" onClick={onButtonClick}>
            Upload Image
            <img src="/cloud-upload-signal-svgrepo-com.svg" className="h-6 w-6" alt="upload" />
        </button>
      </div>
      {uploadedImage && <img src={uploadedImage} alt="Preview" className="pt-4 w-full max-h-60 object-cover"/>}
      
    </div>
  );
};

export default ImageUpload;
