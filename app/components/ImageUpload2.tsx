'use client'
import React from 'react'
import { CldUploadWidget } from 'next-cloudinary'

const ImageUpload2 = () => {
  return (
    <CldUploadWidget uploadPreset='nkmb4olk'>
      {({ open }) => 
        <button 
          className="btn"
          onClick={() => open()}
          >
          Upload Image
          <img src="/cloud-upload-signal-svgrepo-com.svg" className="h-6 w-6" alt="upload" />
        </button>}
    </CldUploadWidget>
  )
}

export default ImageUpload2