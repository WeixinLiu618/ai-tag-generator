import Anthropic from "@anthropic-ai/sdk";
import type { NextApiRequest, NextApiResponse } from 'next';

interface AnthropicAPIResponse {
  status: string;
  id: string;
  result: {
    description_tags: string;
  };
}



export default async function generateAltTags(req: NextApiRequest, res: NextApiResponse<AnthropicAPIResponse | { error: string }>) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
    return;
  }

  const { imageBase64 } = req.body;

  try {
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || "fallback_api_key",
    });

    // Assuming the actual response is compatible with AnthropicAPIResponse but needs casting
    const msg = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1000,
      temperature: 0,
      system: "Extract a series of descriptive tags for the image, listing each with commas in between without additional text or explanation.",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: "image/jpeg",
                data: imageBase64,
              }
            }
          ]
        }
      ]
    })as unknown as AnthropicAPIResponse;

    res.status(200).json(msg);
    console.log(msg);
  } catch (error) {
    console.error('Error with Anthropic API:', error);
    res.status(500).json({ error: 'Error generating alt text' });
  }
}




