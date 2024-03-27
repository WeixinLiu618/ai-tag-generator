'use server'
import Anthropic from '@anthropic-ai/sdk';
import fetch from 'node-fetch';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "fallback_api_key"
});

async function convertImageToBase64(imageUrl: string): Promise<string> {
  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer.toString('base64');
}


async function generateImageTags(imageUrl: string | null): Promise<string> {
  if(!imageUrl) return "No image uploaded";

  const base64Image = await convertImageToBase64(imageUrl);
  
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
              data: base64Image
            },
          },
        ],
      },
    ],
  });

  return msg?.content?.[0]?.text || 'No tags generated';
}

export default generateImageTags;