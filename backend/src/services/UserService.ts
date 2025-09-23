import { User } from "@shared/types/User";
import { db, auth } from "@config/adapters";
import { QueryObject } from "@shared/types/QueryObject";

export class UserService {
  static async createUser(user: User, password?: string) {
    const userToCreate = password ? await auth.register(user, password) : user;
    return db.createUser(userToCreate);
  }

  static async getUser(id: string) {
    return db.getUser(id);
  }

  static async getUsers(query?: QueryObject) {
    return db.getUsers(query);
  }

  static async updateUser(
    id: string,
    update: Partial<User>
  ): Promise<User | null> {
    return db.updateUser(id, update);
  }

  static async deleteUser(id: string) {
    return db.deleteUser(id);
  }
}
