import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  throw new Error("Google API key is not configured.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { title, description } = await req.json();

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-pro",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
      ],
    });

    const prompt = `
    あなたはプロのフードフォトグラファーです。
    以下の料理を、非常にリアルで、美味しそうに見える写真として生成してください。

    # 料理名
    ${title}

    # 説明
    ${description}

    # 写真の要件
    - スタイル: プロの料理写真、シネマティック、高解像度
    - ライティング: 明るく、自然光が差し込んでいるような雰囲気
    - 背景: シンプルでモダンなキッチンや食卓
    - 構図: クローズアップで、食材の質感や新鮮さが伝わるように
    - その他: 湯気やソースの艶など、食欲をそそる要素を加える
    `;

    const result = await model.generateContent([prompt]);
    const response = await result.response;

    // Base64エンコードされた画像データを取得
    const image_parts = response.candidates?.[0].content.parts.filter((part) => part.inlineData);
    if (!image_parts || image_parts.length === 0) {
      throw new Error("Image generation failed, no image parts returned.");
    }
    
    const base64ImageData = image_parts[0].inlineData?.data;
    const mimeType = image_parts[0].inlineData?.mimeType;

    if (!base64ImageData || !mimeType) {
        throw new Error("Image generation failed, no image data returned.");
    }

    // データURL形式で返す
    const imageUrl = `data:${mimeType};base64,${base64ImageData}`;

    return NextResponse.json({ imageUrl });

  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: "Failed to generate image.", details: errorMessage }, { status: 500 });
  }
}