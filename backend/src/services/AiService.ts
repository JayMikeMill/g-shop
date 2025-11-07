import OpenAI from "openai";
import { SystemSettingsService } from "@services";
import { AIServiceApi, ApiResponse } from "shared/interfaces";
import { Product } from "shared/types/PrismaTypes";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure you have this in your env
});

const model = "gpt-3.5-turbo";
class AiService implements AIServiceApi {
  async askAboutStore(
    question: string,
    history: string
  ): Promise<ApiResponse<string>> {
    const siteSettings = await SystemSettingsService.getSiteSettings();

    try {
      const response = await openai.chat.completions.create({
        model,
        messages: [
          {
            role: "system",
            content: `
            You are the official assistant of this store.
            Speak as the store itself using first-person plural ("we", "our") when appropriate.
            Use the context below to answer the question accurately.
            Do NOT prepend "AI:" or "User:" to your answer.
            Answer in a friendly, concise, and helpful manner.`,
          },
          {
            role: "user",
            content: `
            About the Store:\n${siteSettings?.aboutContent || "N/A"}\n\n
            FAQs:\n${siteSettings?.FAQContent || "N/A"}\n\n
            Previous Chat History:\n${history || "N/A"}\n\n
            Question: ${question}`,
          },
        ],
        max_tokens: 300, // Adjust output length
      });

      const answer = response.choices[0].message?.content?.trim() || "";
      return { success: true, data: answer };
    } catch (error) {
      return {
        success: false,
        message:
          "Failed to ask about store" +
          (error instanceof Error ? `: ${error.message}` : ""),
      };
    }
  }

  async askAboutProduct(
    product: Product,
    question: string,
    history: string
  ): Promise<ApiResponse<string>> {
    try {
      const response = await openai.chat.completions.create({
        model,
        messages: [
          {
            role: "system",
            content: `
						You are a friendly and knowledgeable product assistant.
						Answer as if you are helping a customer understand this specific product.
						Use first-person plural ("we", "our") when appropriate.
            Ignore any fields that are "N/A".
						Focus on product features, materials, dimensions, and FAQs.
						Do NOT prepend "AI:" or "User:" to your answer.
						Keep your answers concise, clear, and helpful.
					`,
          },
          {
            role: "user",
            content: `
						${getProductInfo(product)}
						Previous Chat History:
						${history || "N/A"}\n\n
						Question: ${question}
					`,
          },
        ],
        max_tokens: 300,
      });

      const answer = response.choices[0].message?.content?.trim() || "";
      return { success: true, data: answer };
    } catch (error) {
      return {
        success: false,
        message:
          "Failed to ask about product" +
          (error instanceof Error ? `: ${error.message}` : ""),
      };
    }
  }

  async generateProductDescription(
    product: Product
  ): Promise<ApiResponse<string>> {
    try {
      const response = await openai.chat.completions.create({
        model,
        messages: [
          {
            role: "system",
            content: `
						You are a professional and creative e-commerce copywriter.
						Write engaging, clear, and persuasive product descriptions for online stores.
						Ignore any fields that are "N/A".
						Convert dimensions to imperial units (inches, pounds) if provided.
						Focus on the product's key features, materials, and details.
					`,
          },
          {
            role: "user",
            content: getProductInfo(product),
          },
        ],
        max_tokens: 300,
        temperature: 0.7,
      });

      const description = response.choices[0].message?.content?.trim() || "";
      return { success: true, data: description };
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

function getProductInfo(product: Product): string {
  const dims = product.dimensions
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

  return `\n\n
    Product Information:
    Name: ${product.name}
    Materials: ${product.materials?.join(", ") || "N/A"}
    Features: ${product.features?.join(", ") || "N/A"}
    Details: ${product.details || "N/A"}
    Dimensions: ${dims}
    Description: ${product.description || "N/A"}
    \n\n`;
}

export default new AiService();
