import OpenAI from "openai";
import { AIServiceApi, ApiResponse } from "shared/interfaces";
import { Product } from "shared/types/PrismaTypes";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure you have this in your env
});

class AiService implements AIServiceApi {
  async generateProductDescription(
    product: Product
  ): Promise<ApiResponse<string>> {
    const dimensionsStr = product.dimensions
      ? "Weight: " +
        (product.dimensions.weight || "N/A") +
        "g" +
        ", Length: " +
        (product.dimensions.length || "N/A") +
        "mm" +
        ", Width: " +
        (product.dimensions.width || "N/A") +
        "mm" +
        ", Height: " +
        (product.dimensions.height || "N/A") +
        "mm"
      : "N/A";

    const prompt = `
      Write a professional and engaging product description for an e-commerce website.
      Ignore N/A values. Convert any dimensions to imperial units, weight and size.
      Product Name: ${product.name}
      Materials: ${product.materials?.join(", ") || "N/A"}
      Features: ${product.features?.join(", ") || "N/A"}
      Details: ${product.details || "N/A"}
      Dimensions: ${dimensionsStr}`;

    console.log("AI Prompt:", prompt);

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful e-commerce copywriter.",
          },
          { role: "user", content: prompt },
        ],
        max_tokens: 300,
        temperature: 0.7,
      });

      const description = response.choices[0].message?.content?.trim() || "";

      return {
        success: true,
        data: description,
      };
    } catch (error) {
      return {
        success: false,
        message:
          "Failed to generate product description" +
          (error instanceof Error ? `: ${error.message}` : ""),
      };
    }
  }
}

export default new AiService();
