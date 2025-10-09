import { controllerHandler } from "@utils/controllerHandler";
import { OrderProcessingService as S } from "@services/OrdersProcessingService";

export const placeOrder = controllerHandler({
  handler: ({ payment, order }) => S.placeOrder(payment, order),
});

export const refundOrder = controllerHandler({
  handler: ({ id }) => S.refundOrder(id),
});
