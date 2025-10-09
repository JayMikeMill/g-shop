import { controllerHandler } from "@utils/controllerHandler";
import S from "@services/OrdersProcessingService";

export const placeOrder = controllerHandler({
  handler: ({ paymentMethod, order }) => S.placeOrder(paymentMethod, order),
});

export const refundOrder = controllerHandler({
  handler: ({ id }) => S.refundOrder(id),
});
