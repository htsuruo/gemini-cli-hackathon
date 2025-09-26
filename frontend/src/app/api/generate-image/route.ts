import { GoogleGenAI } from "@google/genai";
import { type NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({
  vertexai: true,
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: process.env.GOOGLE_CLOUD_LOCATION || "global",
});

export async function POST(req: NextRequest) {
  try {
    const { title, description } = await req.json();

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    // A more direct prompt for Imagen models
    const prompt = `A photorealistic, cinematic, high-resolution image of a professional food photograph of "${title}: ${description}". Bright, natural lighting. Simple, modern kitchen or dining table background. Close-up composition emphasizing texture and freshness. Appetizing elements like steam or glossy sauce.`;

    const response = await ai.models.generateImages({
      model: "imagen-4.0-fast-generate-001",
      prompt,
    });

    const images = response.generatedImages;
    console.dir(images);

    if (!images) {
      throw new Error("Image generation failed, no candidates returned.");
    }

    const image = images.at(0)?.image?.imageBytes;

    return NextResponse.json({ image });
  } catch (error) {
    console.error(error);

    // Handle specific quota errors by checking for the code property
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      typeof (error as { code?: number }).code === "number" &&
      (error as { code: number }).code === 8
    ) {
      // 8 corresponds to RESOURCE_EXHAUSTED
      return NextResponse.json(
        {
          error:
            "リクエストが集中しています。しばらく時間をおいてから再度お試しください。",
        },
        { status: 429 }
      );
    }

    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { error: "Failed to generate image.", details: errorMessage },
      { status: 500 }
    );
  }
}
