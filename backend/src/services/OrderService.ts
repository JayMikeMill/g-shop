import { Order } from "@shared/types/order";
import { db } from "@config/adapters";
import { QueryOptions } from "@shared/types/query-options";

export class OrderService {
  static async createOrder(order: Order): Promise<Order> {
    order.status = "pending";
    order.createdAt = new Date();
    return db.createOrder(order);
  }

  static async getOrder(id: string): Promise<Order | null> {
    return db.getOrder(id);
  }

  static async getOrders(query?: QueryOptions): Promise<Order[]> {
    return db.getOrders(query);
  }

  static async updateOrder(
    id: string,
    update: Partial<Order>
  ): Promise<Order | null> {
    return db.updateOrder(id, update);
  }

  static async deleteOrder(id: string): Promise<boolean> {
    await db.deleteOrder(id);
    return true;
  }
}
