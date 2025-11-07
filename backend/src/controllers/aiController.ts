import { ApiResponse } from "shared/interfaces";
import { controllerHandler } from "./controllerHandler";
import { AIService } from "@services";
import { Product } from "shared/types/PrismaTypes";

export const askAboutStore = controllerHandler({
  handler: ({ question, history }): Promise<ApiResponse<string>> =>
    AIService.askAboutStore(question, history),
});

export const askAboutProduct = controllerHandler({
  handler: ({ product, question, history }): Promise<ApiResponse<string>> =>
    AIService.askAboutProduct(product, question, history),
});

export const generateProductDescription = controllerHandler({
  handler: (product: Product): Promise<ApiResponse<string>> =>
    AIService.generateProductDescription(product),
});
