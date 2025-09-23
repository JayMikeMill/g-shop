import { PrismaClient } from "@prisma/client";
import { PrismaCRUDS } from "./prisma/mappers/prismaCRUDS";
import { DBAdapter } from "./DBAdapter";
import {
  Product,
  ProductOption,
  ProductOptionsPreset,
  ProductTag,
} from "@shared/types/Product";
import { Category, Collection } from "@shared/types/Catalog";
import { User } from "@shared/types/User";
import { Order } from "@shared/types/Order";
import { QueryObject } from "@shared/types/QueryObject";

export class PrismaAdapter implements DBAdapter {
  public prisma: PrismaClient;
  private cruds: PrismaCRUDS;

  constructor(prismaClient: PrismaClient = new PrismaClient()) {
    this.prisma = prismaClient;
    this.cruds = new PrismaCRUDS(prismaClient);
  }

  // USERS
  createUser(user: User) {
    return this.cruds.users.create(user);
  }
  getUser(id: string) {
    return this.cruds.users.get(id);
  }
  getUsers(query?: QueryObject) {
    return this.cruds.users.getAll(query);
  }
  updateUser(id: string, update: Partial<User>) {
    return this.cruds.users.update(id, update);
  }
  deleteUser(id: string) {
    return this.cruds.users.delete(id);
  }

  // PRODUCTS
  createProduct(product: Product) {
    return this.cruds.products.create(product);
  }
  getProduct(id: string) {
    return this.cruds.products.get(id);
  }
  getProducts(query?: QueryObject) {
    return this.cruds.products.getAll(query);
  }
  updateProduct(id: string, update: Partial<Product>) {
    return this.cruds.products.update(id, update);
  }
  async deleteProduct(id: string) {
    return this.cruds.products.delete(id);
  }

  // PRODUCT OPTIONS PRESETS
  createProductOptionsPreset(
    preset: ProductOptionsPreset
  ): Promise<ProductOptionsPreset> {
    return this.cruds.productOptionsPresets.create(preset);
  }
  getProductOptionsPresets(): Promise<{
    data: ProductOptionsPreset[];
    total: number;
  }> {
    return this.cruds.productOptionsPresets.getAll();
  }

  deleteProductOptionsPreset(id: string): Promise<ProductOptionsPreset> {
    return this.cruds.productOptionsPresets.delete(id);
  }

  // TAGS
  createProductTag(tag: ProductTag): Promise<ProductTag> {
    return this.cruds.productTags.create(tag);
  }
  getProductTag(id: string): Promise<ProductTag | null> {
    return this.cruds.productTags.get(id);
  }
  getProductTags(
    query?: QueryObject
  ): Promise<{ data: ProductTag[]; total: number }> {
    return this.cruds.productTags.getAll(query);
  }
  async deleteProductTag(id: string) {
    return this.cruds.productTags.delete(id);
  }

  // CATEGORIES
  createCategory(category: Category): Promise<Category> {
    return this.cruds.categories.create(category);
  }
  getCategory(id: string): Promise<Category | null> {
    return this.cruds.categories.get(id);
  }
  getCategories(
    query?: QueryObject
  ): Promise<{ data: Category[]; total: number }> {
    return this.cruds.categories.getAll(query);
  }
  updateCategory(
    id: string,
    update: Partial<Category>
  ): Promise<Category | null> {
    return this.cruds.categories.update(id, update);
  }
  deleteCategory(id: string) {
    return this.cruds.categories.delete(id);
  }

  // COLLECTIONS
  createCollection(collection: Collection): Promise<Collection> {
    return this.cruds.collections.create(collection);
  }
  getCollection(id: string): Promise<Collection | null> {
    return this.cruds.collections.get(id);
  }
  getCollections(
    query?: QueryObject
  ): Promise<{ data: Collection[]; total: number }> {
    return this.cruds.collections.getAll(query);
  }
  updateCollection(
    id: string,
    update: Partial<Collection>
  ): Promise<Collection | null> {
    return this.cruds.collections.update(id, update);
  }
  deleteCollection(id: string) {
    return this.cruds.collections.delete(id);
  }

  // ORDERS
  createOrder(order: Order) {
    return this.cruds.orders.create(order);
  }
  getOrder(id: string) {
    return this.cruds.orders.get(id);
  }
  getOrders(query?: QueryObject) {
    return this.cruds.orders.getAll(query);
  }
  updateOrder(id: string, update: Partial<Order>) {
    return this.cruds.orders.update(id, update);
  }
  deleteOrder(id: string) {
    return this.cruds.orders.delete(id);
  }
}
