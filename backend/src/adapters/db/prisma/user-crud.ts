import { PrismaClient } from "@prisma/client";
import type { User } from "@shared/types/user";
import {
  QueryOptions,
  queryOptionsToPrisma,
} from "@shared/types/query-options";

export class UserCRUD {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async create(user: User): Promise<User> {
    const created = await this.prisma.user.create({ data: toPrismaUser(user) });
    return toUser(created);
  }

  async get(id: string): Promise<User | null> {
    const found = await this.prisma.user.findUnique({ where: { id } });
    return found ? toUser(found) : null;
  }

  async query(query?: QueryOptions): Promise<User[]> {
    const prismaQuery = queryOptionsToPrisma(query);
    const found = await this.prisma.user.findMany({ ...prismaQuery });
    return found.map(toUser);
  }

  async update(id: string, update: Partial<User>): Promise<User | null> {
    const updated = await this.prisma.user.update({
      where: { id },
      data: toPrismaUser(update as User),
    });
    return toUser(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}

// Map User object to Prisma input (handle enums, etc.)
function toPrismaUser(user: any): any {
  const { role, ...rest } = user;
  return {
    ...rest,
    role: role?.toUpperCase?.(),
    // Add more mapping if needed
  };
}

// Map Prisma user to User type (handle nulls, etc.)
function toUser(prismaUser: any): User {
  return {
    ...prismaUser,
    // Add more mapping if needed
  };
}
