import { VertexAI } from '@google-cloud/vertexai';
import { NextRequest, NextResponse } from 'next/server';

// Vertex AI client initialization
const vertex_ai = new VertexAI({
  project: process.env.GCLOUD_PROJECT || '',
  location: process.env.GCLOUD_LOCATION || '',
});

// Using a stable image generation model from environment variables
const model = process.env.IMAGEN_MODEL_NAME || 'imagen-4.0-fast-generate-001';

const generativeModel = vertex_ai.getGenerativeModel({
  model: model,
});

export async function POST(req: NextRequest) {
  try {
    const { title, description } = await req.json();

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
    }

    // A more direct prompt for Imagen models
    const prompt = `A photorealistic, cinematic, high-resolution image of a professional food photograph of "${title}: ${description}". Bright, natural lighting. Simple, modern kitchen or dining table background. Close-up composition emphasizing texture and freshness. Appetizing elements like steam or glossy sauce.`;

    const resp = await generativeModel.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        // number of images to generate
        candidateCount: 1,
      },
    });

    if (!resp.response.candidates || resp.response.candidates.length === 0) {
      throw new Error('Image generation failed, no candidates returned.');
    }

    const imagePart = resp.response.candidates[0].content.parts.find((part) => part.fileData);

    if (!imagePart || !imagePart.fileData) {
        console.error("No image data found in response:", JSON.stringify(resp.response, null, 2));
        throw new Error('Image generation failed, no image data returned in the selected candidate.');
    }

    const base64ImageData = imagePart.fileData.data;
    const mimeType = imagePart.fileData.mimeType;

    const imageUrl = `data:${mimeType};base64,${base64ImageData}`;

    return NextResponse.json({ imageUrl });

  } catch (error) {
    console.error(error);

    // Handle specific quota errors by checking for the code property
    if (typeof error === 'object' && error !== null && 'code' in error && (error as any).code === 8) { // 8 corresponds to RESOURCE_EXHAUSTED
        return NextResponse.json(
            { error: 'リクエストが集中しています。しばらく時間をおいてから再度お試しください。' },
            { status: 429 }
        );
    }

    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Failed to generate image.', details: errorMessage }, { status: 500 });
  }
}