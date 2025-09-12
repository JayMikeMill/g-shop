import { StoreItem } from "@shared/store-item";

export type Order = {
	userId: string;
	status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
	createdAt: number; // Unix TimeStamp
    updatedAt: number; // Unix TimeStamp
	totalAmount: number; // cents
	currency: string;
	paymentStatus: "pending" | "paid" | "refunded";
	paymentMethod: string;
	products: StoreItem[];
	shippingAddress: ShippingAddress;
	shippingMethod: string;
	trackingNumber?: string | null;
	notes?: string;
};