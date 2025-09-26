import { GoogleGenAI } from "@google/genai";
import { type NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  throw new Error("Google API key is not configured.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { ingredient, likes, dislikes } = await req.json();

    if (!ingredient) {
      return NextResponse.json(
        { error: "Ingredient is required" },
        { status: 400 }
      );
    }

    const prompt = `
あなたは子供の食の専門家であり、クリエイティブな料理研究家です。
以下の情報に基づいて、苦手な食材を子供が喜んで食べるような「変身プラン」を3つ提案してください。

# 子供の情報
- 好きな食べ物・食感: ${likes.join(", ")}
- 苦手な食べ物・食感: ${dislikes.join(", ")}

# 苦手な食材
${ingredient}

# 出力形式
以下のJSON形式で、必ず3つのプランを生成してください。
説明文は子供に語りかけるような、やさしい言葉で記述してください。

{
  "plans": [
    {
      "title": "【〇〇変身】料理名",
      "catchphrase": "子供がワクワクするようなキャッチコピー",
      "description": "具体的な調理法や、なぜ食べられるようになるのかの説明"
    },
    {
      "title": "【〇〇変身】料理名",
      "catchphrase": "子供がワクワクするようなキャッチコピー",
      "description": "具体的な調理法や、なぜ食べられるようになるのかの説明"
    },
    {
      "title": "【〇〇変身】料理名",
      "catchphrase": "子供がワクワクするようなキャッチコピー",
      "description": "具体的な調理法や、なぜ食べられるようになるのかの説明"
    }
  ]
}
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: { responseMimeType: "application/json" },
      contents: prompt,
    });

    const content = result.candidates?.at(0)?.content;
    console.dir(content);
    if (!content) {
      throw new Error("No content generated");
    }
    const text = content.parts?.at(0)?.text!;
    const data = JSON.parse(text);

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    // エラーがErrorインスタンスであるか確認
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { error: "Failed to generate plan.", details: errorMessage },
      { status: 500 }
    );
  }
}
