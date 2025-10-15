import { Order } from "shared/types";

export const getTotalOrderItems = (order: Order) => {
  console.log("Calculating total items for order:", order);
  return order.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
};
