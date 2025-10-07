import type {
  User,
  Order,
  Product,
  Collection,
  Category,
  OrderShippingInfo,
} from "./prisma-types";

export const emptyUser: User = {
  email: "",
  passwordHash: "",
  role: "USER", // or whichever default makes sense
  firstName: "new",
  lastName: "user",
  isVerified: false,
  lastLogin: new Date(0),
  failedLoginAttempts: 0,
};

export const emptyProduct: Product = {
  name: "",
  price: 0,
  description: "",
  status: "ACTIVE", // or whichever default makes sense
};

export const emptyOrder: Order = {
  status: "PENDING",
  total: 0,
};

export const emptyCollection: Collection = {
  name: "",
  slug: "",
};

export const emptyCategory: Category = {
  name: "",
  slug: "",
};

export const emptyOrderShippingInfo: OrderShippingInfo = {
  name: "",
  email: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  carrier: null,
  method: null,
  cost: null,
  tracking: null,
  createdAt: undefined,
  updatedAt: undefined,
};
