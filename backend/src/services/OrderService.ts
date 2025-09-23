import { Order } from "@shared/types/Order";
import { db } from "@config/adapters";
import { QueryObject } from "@shared/types/QueryObject";

export class OrderService {
  static async createOrder(order: Order) {
    order.status = "pending";
    order.createdAt = new Date();
    return db.createOrder(order);
  }

  static async getOrder(id: string) {
    return db.getOrder(id);
  }

  static async getOrders(query?: QueryObject) {
    return db.getOrders(query);
  }

  static async updateOrder(id: string, update: Partial<Order>) {
    return db.updateOrder(id, update);
  }

  static async deleteOrder(id: string) {
    const existing = await db.getOrder(id);
    if (!existing) return null;
    return db.deleteOrder(id);
  }
}
