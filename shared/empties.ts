import type {
  User,
  Order,
  Product,
  Collection,
  Category,
  Cart,
  ShippingInfo,
  Address,
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

// Default empty address to satisfy required fields
export const emptyAddress: Address = {
  name: "",
  email: "",
  street1: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
};

export const emptyShippingInfo: ShippingInfo = {
  address: emptyAddress,
  carrier: "UPS",
  method: "STANDARD",
  tracking: "",
  cost: 0,
};

export const emptyCollection: Collection = {
  name: "",
  slug: "",
};

export const emptyCategory: Category = {
  name: "",
  slug: "",
};

export const emptyCart: Cart = {
  items: [],
  total: 0,
  subtotal: 0,
};
