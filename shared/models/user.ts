export interface User {
	id: string;
	name: string;
	email: string;
	passwordHash?: string; // Only for internal storage
	role?: "user" | "admin";
}
