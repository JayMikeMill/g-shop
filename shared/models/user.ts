import { Address } from "./shipping-info";

export interface User {
	id: string;
	name: string;
	email: string;
	address?: Address
	role?: "user" | "staff" | "admin";
}
