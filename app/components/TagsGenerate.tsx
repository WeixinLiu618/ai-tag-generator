import React, { useState }  from 'react';
import generateImageTags from "@/app/services/generateTagsAnthropic"


interface TagsGenerateProps {
  isImageUploaded : boolean;
  imageUrl: string | null;
}

const TagsGenerate: React.FC<TagsGenerateProps> = ({ isImageUploaded , imageUrl }) => {

  const [altText, setAltText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  
  const handleButtonClick = () => {
    console.log("image url: ", imageUrl);
    setIsProcessing(true); // Start processing
    generateImageTags(imageUrl)
      .then(tags => {
        setAltText(tags);
        setIsProcessing(false); // Done processing
      })
      .catch(error => {
        console.error('Error generating tags:', error);
        setAltText('something error, no tags were generated');
        setIsProcessing(false); // Done processing with error
      });
  };

  return (
     <div className='flex flex-col items-center'>
    
        <button 
          className={`btn btn-outline btn-accent ${!isImageUploaded || isProcessing ? 'btn-disabled' : ''}`}
          disabled={!isImageUploaded || isProcessing}
          onClick={handleButtonClick}>
          {isProcessing ? 'Processing...' : 'Generate Alt Tags'}
        </button>
        {altText && (
          <div className="mt-4 p-4 bg-blue-100 rounded-lg">
            <p>Generated Alt Tags: {altText}</p>
          </div>
        )}
    </div>
  );
};

export default TagsGenerate;
