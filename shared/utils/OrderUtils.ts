import { Order } from "../types";

export const getTotalOrderItems = (order: Order) => {
  return order.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
};

export const getOrderDiminsions = (order: Order) => {
  let totalWeight = 0;
  let totalLength = 0;
  let totalWidth = 0;
  let totalHeight = 0;
  order.items?.forEach((item) => {
    totalWeight += (item.product?.dimensions?.weight || 0) * item.quantity;
    totalLength += (item.product?.dimensions?.length || 0) * item.quantity;
    totalWidth += (item.product?.dimensions?.width || 0) * item.quantity;
    totalHeight += (item.product?.dimensions?.height || 0) * item.quantity;
  });
  return {
    weight: totalWeight,
    length: totalLength,
    width: totalWidth,
    height: totalHeight,
  };
};
