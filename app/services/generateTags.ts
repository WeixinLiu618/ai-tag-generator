import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "fallback_api_key"
});


async function generateImageTags(imageUrl: string | null): Promise<string> {
  if(!imageUrl) return "No image uploaded";

  
  const msg = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 1000,
    temperature: 0,
    system: 'Extract a series of descriptive tags for the image, listing each with commas in between without additional text or explanation.',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: 'image/jpeg',
              data: imageUrl,
            },
          },
        ],
      },
    ],
  });

  // Assuming the tags are returned in the 'text' field of the response
  // You might need to adjust this based on the actual structure of the response
  return msg?.content?.[0]?.text || 'No tags generated';
}

export default generateImageTags;