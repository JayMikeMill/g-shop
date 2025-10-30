import { ApiResponse } from "shared/interfaces";
import { controllerHandler } from "./controllerHandler";
import { AIService } from "@services";
import { Product } from "shared/types/PrismaTypes";

export const generateProductDescription = controllerHandler({
  handler: (product: Product): Promise<ApiResponse<string>> =>
    AIService.generateProductDescription(product),
});
