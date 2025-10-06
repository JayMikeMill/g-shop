import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AuthAdapter } from "./AuthAdapter";
import { db } from "@config/adapters";

import { User } from "@my-store/shared";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const JWT_EXPIRES_IN = "1d";

export class JwtAuthAdapter implements AuthAdapter {
	// Register a new user
	async register(user: User, password: string): Promise<User> {
    db.users.getOne(user.email).then(existingUser => {
      if (existingUser) throw new Error("User already exists");
    }
		const passwordHash = await bcrypt.hash(password, 10);
		const { passwordHash: _, ...userWithoutPassword } = usersDb[user.email];
		return userWithoutPassword;
	}

	// Login and return JWT
	async login(email: string, password: string): Promise<{ token: string; user: User }> {
		const userRecord = usersDb[email];
		if (!userRecord) throw new Error("Invalid credentials");

		const valid = await bcrypt.compare(password, userRecord.passwordHash);
		if (!valid) throw new Error("Invalid credentials");

		const token = jwt.sign({ userId: userRecord.id, email: userRecord.email }, JWT_SECRET, {
			expiresIn: JWT_EXPIRES_IN,
		});

		const { passwordHash: _, ...userWithoutPassword } = userRecord;
		return { token, user: userWithoutPassword };
	}

	// Verify JWT and return user
	async verifyToken(token: string): Promise<User | null> {
		try {
			const payload = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
			const userRecord = usersDb[payload.email];
			if (!userRecord) return null;

			const { passwordHash: _, ...userWithoutPassword } = userRecord;
			return userWithoutPassword;
		} catch {
			return null;
		}
	}

	// Logout (for stateless JWT, this is optional)
	async logout(userId: string, token?: string): Promise<void> {
		// Stateless JWT cannot be invalidated without extra storage (blacklist)
		// Optionally, implement a blacklist if immediate logout is required
		return;
	}
}
