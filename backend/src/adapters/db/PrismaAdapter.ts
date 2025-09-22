import { PrismaClient } from "@prisma/client";
import { ProductCRUD } from "./prisma/ProductCRUD";
import { UserCRUD } from "./prisma/UserCRUD";
import { OrderCRUD } from "./prisma/OrderCRUD";
import { CatalogCRUD } from "./prisma/CatalogCRUD";
import { DBAdapter } from "./DBAdapter";
import {
  Product,
  ProductOptionPreset,
  ProductTagPreset,
} from "@shared/types/product";
import { Category, Collection } from "@shared/types/catalog";
import { User } from "@shared/types/user";
import { Order } from "@shared/types/order";
import { QueryOptions } from "@shared/types/query-options";

export class PrismaAdapter implements DBAdapter {
  public prisma: PrismaClient;
  public products: ProductCRUD;
  public catalog: CatalogCRUD;
  public users: UserCRUD;
  public orders: OrderCRUD;

  constructor(prismaClient: PrismaClient = new PrismaClient()) {
    this.prisma = prismaClient;
    this.products = new ProductCRUD(this.prisma);
    this.users = new UserCRUD(this.prisma);
    this.orders = new OrderCRUD(this.prisma);
    this.catalog = new CatalogCRUD(this.prisma);
  }

  // USERS
  createUser(user: User) {
    return this.users.create(user);
  }
  getUser(id: string) {
    return this.users.get(id);
  }
  getUsers(query?: QueryOptions) {
    return this.users.query(query);
  }
  updateUser(id: string, update: Partial<User>) {
    return this.users.update(id, update);
  }
  deleteUser(id: string) {
    return this.users.delete(id);
  }

  // PRODUCTS
  createProduct(product: Product) {
    return this.products.create(product);
  }
  getProduct(id: string) {
    return this.products.get(id);
  }
  getProducts(query?: QueryOptions) {
    return this.products.getAll(query);
  }
  updateProduct(id: string, update: Partial<Product>) {
    return this.products.update(id, update);
  }
  async deleteProduct(id: string): Promise<void> {
    await this.products.delete(id);
  }

  // PRODUCT OPTIONS PRESETS
  createProductOptionsPreset(
    preset: ProductOptionPreset
  ): Promise<ProductOptionPreset> {
    return this.products.createOptionPreset(preset);
  }
  getProductOptionsPresets(): Promise<ProductOptionPreset[]> {
    return this.products.getOptionPresets();
  }
  deleteProductOptionsPreset(id: string): Promise<void> {
    return this.products.deleteOptionPreset(id);
  }

  // TAGS
  createProductTagPreset(tag: ProductTagPreset): Promise<ProductTagPreset> {
    return this.products.createTag(tag);
  }
  getProductTagPreset(id: string): Promise<ProductTagPreset | null> {
    return this.products.getTag(id);
  }
  getProductTagPresets(query?: QueryOptions): Promise<ProductTagPreset[]> {
    return this.products.getTags(query);
  }
  async deleteProductTagPreset(id: string): Promise<void> {
    await this.products.deleteTag(id);
  }

  // CATEGORIES
  createCategory(category: Category): Promise<Category> {
    return this.catalog.createCategory(category);
  }
  getCategory(id: string): Promise<Category | null> {
    return this.catalog.getCategory(id);
  }
  getCategories(query?: QueryOptions): Promise<Category[]> {
    return this.catalog.getCategories(query);
  }
  updateCategory(
    id: string,
    update: Partial<Category>
  ): Promise<Category | null> {
    return this.catalog.updateCategory(id, update);
  }
  deleteCategory(id: string): Promise<void> {
    return this.catalog.deleteCategory(id);
  }

  // COLLECTIONS
  createCollection(collection: Collection): Promise<Collection> {
    return this.catalog.createCollection(collection);
  }
  getCollection(id: string): Promise<Collection | null> {
    return this.catalog.getCollection(id);
  }
  getCollections(query?: QueryOptions): Promise<Collection[]> {
    return this.catalog.getCollections(query);
  }
  updateCollection(
    id: string,
    update: Partial<Collection>
  ): Promise<Collection | null> {
    return this.catalog.updateCollection(id, update);
  }
  deleteCollection(id: string): Promise<void> {
    return this.catalog.deleteCollection(id);
  }

  // ORDERS
  createOrder(order: Order) {
    return this.orders.create(order);
  }
  getOrder(id: string) {
    return this.orders.get(id);
  }
  getOrders(query?: QueryOptions) {
    return this.orders.query(query);
  }
  updateOrder(id: string, update: Partial<Order>) {
    return this.orders.update(id, update);
  }
  deleteOrder(id: string): Promise<void> {
    return this.orders.delete(id);
  }
}
