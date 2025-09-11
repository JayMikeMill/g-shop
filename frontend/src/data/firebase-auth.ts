// src/data/firebase-auth.ts
import { auth } from "@data/firebase-api";
import { signInWithEmailAndPassword, signOut, type User } from "firebase/auth";

// Login function
export const loginUser = async (email: string, password: string): Promise<User> => {
	const userCredential = await signInWithEmailAndPassword(auth, email, password);
	return userCredential.user;
};

// Logout function
export const logoutUser = async (): Promise<void> => {
	await signOut(auth);
};
