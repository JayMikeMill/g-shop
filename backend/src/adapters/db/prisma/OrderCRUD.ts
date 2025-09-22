import { PrismaClient } from "@prisma/client";
import type { Order } from "@shared/types/order";
import {
  QueryOptions,
  queryOptionsToPrisma,
} from "@shared/types/query-options";

export class OrderCRUD {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async create(order: Order): Promise<Order> {
    const created = await this.prisma.order.create({
      data: toPrismaOrder(order),
    });
    return toOrder(created);
  }

  async get(id: string): Promise<Order | null> {
    const found = await this.prisma.order.findUnique({ where: { id } });
    return found ? toOrder(found) : null;
  }

  async query(query?: QueryOptions): Promise<Order[]> {
    const prismaQuery = queryOptionsToPrisma(query);
    const found = await this.prisma.order.findMany({ ...prismaQuery });
    return found.map(toOrder);
  }

  async update(id: string, update: Partial<Order>): Promise<Order | null> {
    const { id: _omit, ...updateData } = update;
    const updated = await this.prisma.order.update({
      where: { id },
      data: toPrismaOrder(updateData as Order),
    });
    return toOrder(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.order.delete({ where: { id } });
  }
}

// Map Order object to Prisma input (handle enums, relations, etc.)
function toPrismaOrder(order: any): any {
  const { status, user, ...rest } = order;
  return {
    ...rest,
    status: status?.toUpperCase?.(),
    // Add more mapping if needed
  };
}

// Map Prisma order to Order type (handle nulls, etc.)
function toOrder(prismaOrder: any): Order {
  return {
    ...prismaOrder,
    // Add more mapping if needed
  };
}
