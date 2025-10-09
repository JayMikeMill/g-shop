// backend/src/adapters/firebase/FirebaseAuthAdapter.ts

import { User } from "@shared/types";
import { useFirebase } from "./config/firebaseAdmin";
import { AuthAdapter } from "@adapters/types";

export class FirebaseAuthAdapter implements AuthAdapter {
  private auth = useFirebase().auth;

  async register(user: User, password: string): Promise<User> {
    // Create user in Firebase Authentication
    const record = await this.auth.createUser({ email: user.email, password });
    // Set custom claims for role-based access
    await this.auth.setCustomUserClaims(record.uid, {
      role: user.role || "user",
    });

    // Store user info in your database here
    return { ...user, id: record.uid } as User;
  }

  // Stub login to satisfy interface
  async login(
    email: string,
    password: string
  ): Promise<{ token: string; user: User }> {
    // Firebase login is handled on the client, so we just return an empty user + token
    return {
      token: "", // no backend token
      user: { id: "", email } as User,
    };
  }

  async verifyToken(token: string): Promise<User | null> {
    const decoded = await this.auth.verifyIdToken(token);
    return {
      id: decoded.uid,
      email: decoded.email,
      role: decoded.role,
    } as User;
  }

  async logout(userId: string) {
    // Revoke all refresh tokens for this user
    await this.auth.revokeRefreshTokens(userId);
  }
}
