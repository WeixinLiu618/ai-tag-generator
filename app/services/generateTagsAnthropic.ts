'use server'
import Anthropic from '@anthropic-ai/sdk';
import fetch from 'node-fetch';
import sharp from 'sharp';
import fs from 'fs';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "fallback_api_key"
});

async function convertImageToJpegBase64(imageUrl: string): Promise<string> {
  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Convert the image to JPEG format and return it as a base64-encoded string
  try {
    const outputBuffer = await sharp(buffer)
      .jpeg({ quality: 90 })
      .toBuffer();
    return outputBuffer.toString('base64');
  } catch (error) {
    console.error('Error converting image to JPEG:', error);
    throw error;
  }
}


async function generateImageTags(imageUrl: string | null): Promise<string> {
  if(!imageUrl) return "No image uploaded";

  const base64Image = await convertImageToJpegBase64(imageUrl);
  
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