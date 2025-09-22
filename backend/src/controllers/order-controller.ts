// controllers/order-controller.ts
import { parseQueryOptions } from "@shared/types/query-options";
import { OrderService } from "@services/order-service";
import {
  createCrudHandler,
  createCrudDeleteHandler,
} from "@utils/crud-handler";

// -------------------- ORDERS --------------------
export const createOrder = createCrudHandler((req) =>
  OrderService.createOrder(req.body)
);

export const getOrder = createCrudHandler(
  (req) => OrderService.getOrder(req.params.id),
  "Order not found"
);

export const getOrders = createCrudHandler((req) =>
  OrderService.getOrders(parseQueryOptions(req.query))
);

export const updateOrder = createCrudHandler(
  (req) => OrderService.updateOrder(req.params.id, req.body),
  "Order not found"
);

export const deleteOrder = createCrudDeleteHandler(
  (req) => OrderService.deleteOrder(req.params.id),
  "Order deleted"
);
