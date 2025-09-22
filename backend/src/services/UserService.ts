import { User } from "@shared/types/user";
import { db, auth } from "@config/adapters";
import { QueryOptions } from "@shared/types/query-options";

export class UserService {
  static async createUser(user: User, password?: string): Promise<User> {
    const userToCreate = password ? await auth.register(user, password) : user;
    return db.createUser(userToCreate);
  }

  static async getUser(id: string): Promise<User | null> {
    return db.getUser(id) as Promise<User | null>;
  }

  static async getUsers(query?: QueryOptions): Promise<User[]> {
    return db.getUsers(query) as Promise<User[]>;
  }

  static async updateUser(
    id: string,
    update: Partial<User>
  ): Promise<User | null> {
    return db.updateUser(id, update) as Promise<User | null>;
  }

  static async deleteUser(id: string): Promise<void> {
    await db.deleteUser(id);
  }
}
