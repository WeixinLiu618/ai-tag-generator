import React, { useState }  from 'react';
import generateImageTags from "@/app/services/generateTags"


interface TagsGenerateProps {
  isImageUploaded : boolean;
  imageUrl: string | null;
}

const TagsGenerate: React.FC<TagsGenerateProps> = ({ isImageUploaded , imageUrl }) => {

  const [altText, setAltText] = useState('');
  
  const handleButtonClick = () => {
    console.log("image url: ", imageUrl);
    generateImageTags("https://res.cloudinary.com/dhwam0rpl/image/upload/v1711513380/kixtpkv3mrfvhrouvina.jpg")
      .then(tags => {
        setAltText(tags);
      })
      .catch(error => {
        console.error('Error generating tags:', error);
        setAltText('something error, no tags were generated');
      });
    // generateTags1("https://res.cloudinary.com/dhwam0rpl/image/upload/v1711513380/kixtpkv3mrfvhrouvina.jpg")
  };

  return (
     <div className='flex flex-col items-center'>
    
        <button 
          className={`btn btn-outline btn-accent ${!isImageUploaded ? 'btn-disabled' : ''}`}
          disabled={!isImageUploaded}
          onClick={handleButtonClick}>
          Generate Alt Text
        </button>
        {altText && (
          <div className="mt-4 p-4 bg-blue-100 rounded-lg">
            <p>Generated Alt Text: {altText}</p>
          </div>
        )}


  
    </div>
  );
};

export default TagsGenerate;
