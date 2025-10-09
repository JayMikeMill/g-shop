import { controllerHandler } from "@utils/controllerHandler";
import { OrderProcessingService as S } from "@services/OrdersProcessingService";

export const placeOrder = controllerHandler({
  handler: ({ paymentMethod, order }) => S.placeOrder(paymentMethod, order),
});

export const refundOrder = controllerHandler({
  handler: ({ id }) => S.refundOrder(id),
});
