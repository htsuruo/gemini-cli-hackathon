import { type FileData, GoogleGenAI, type Part } from "@google/genai";
import { type NextRequest, NextResponse } from "next/server";

const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
	// This will cause the server to fail starting if the key is missing,
	// which is a good thing for a critical environment variable.
	throw new Error("GOOGLE_API_KEY environment variable is not set.");
}
const ai = new GoogleGenAI({ apiKey });

export async function POST(req: NextRequest) {
	try {
		const { title, description } = await req.json();

		if (!title || !description) {
			return NextResponse.json(
				{ error: "Title and description are required" },
				{ status: 400 },
			);
		}

		// A more direct prompt for Imagen models
		const prompt = `A photorealistic, cinematic, high-resolution image of a professional food photograph of "${title}: ${description}". Bright, natural lighting. Simple, modern kitchen or dining table background. Close-up composition emphasizing texture and freshness. Appetizing elements like steam or glossy sauce.`;

		const response = await ai.models.generateContent({
			contents: [{ role: "user", parts: [{ text: prompt }] }],
			model: "imagen-4.0-fast-generate-001",
		});

		if (!response.candidates || response.candidates.length === 0) {
			throw new Error("Image generation failed, no candidates returned.");
		}

		const candidate = response.candidates[0];
		if (!candidate?.content?.parts) {
			throw new Error("Invalid response structure.");
		}

		const imagePart = candidate.content.parts.find(
			(part: Part): part is Part & { fileData: FileData } =>
				"fileData" in part && part.fileData !== undefined,
		);

		if (!imagePart || !imagePart.fileData) {
			console.error(
				"No image data found in response:",
				JSON.stringify(response, null, 2),
			);
			throw new Error(
				"Image generation failed, no image data returned in the selected candidate.",
			);
		}

		// FileDataの構造に基づいてプロパティにアクセス
		const fileData = imagePart.fileData;

		// TypeScriptで認識されているプロパティと実際のプロパティの差異を処理
		type ExtendedFileData = FileData & {
			data?: string;
			fileUri?: string;
		};

		const extendedFileData = fileData as ExtendedFileData;
		const base64ImageData = extendedFileData.fileUri || extendedFileData.data;

		if (!base64ImageData) {
			throw new Error("No valid image data found in fileData.");
		}

		const mimeType = fileData.mimeType;

		const imageUrl = `data:${mimeType};base64,${base64ImageData}`;

		return NextResponse.json({ imageUrl });
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
				{ status: 429 },
			);
		}

		const errorMessage =
			error instanceof Error ? error.message : "An unknown error occurred";
		return NextResponse.json(
			{ error: "Failed to generate image.", details: errorMessage },
			{ status: 500 },
		);
	}
}
