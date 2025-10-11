import { controllerHandler } from "@utils";
import { OrdersProcessingService as S } from "@services";

export const placeOrder = controllerHandler({
  handler: ({ paymentMethod, order }) => S.placeOrder(paymentMethod, order),
});

export const refundOrder = controllerHandler({
  handler: ({ id }) => S.refundOrder(id),
});
