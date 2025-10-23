import { controllerHandler } from "./controllerHandler";
import { OrdersProcessingService as S } from "@services";

export const placeOrder = controllerHandler({
  handler: ({ paymentMethod, order }) => S.placeOrder(paymentMethod, order),
});

export const buyOrderShipping = controllerHandler({
  handler: ({ orderId }) => S.buyOrderShipping(orderId),
});

export const refundOrder = controllerHandler({
  handler: ({ id }) => S.refundOrder(id),
});
