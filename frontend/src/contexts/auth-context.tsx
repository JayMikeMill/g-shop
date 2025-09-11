// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { type User } from "firebase/auth";
import { auth } from "@data/firebase-api"; // Import the initialized auth instance
import { loginUser, logoutUser } from "@data/firebase-auth"; // Import the wrapper functions

interface AuthContextType {
	user: User | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	// Listen to auth state changes
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(u => {
			setUser(u);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	// Login calls the Firebase wrapper
	const login = async (email: string, password: string) => {
		const loggedInUser = await loginUser(email, password);
		setUser(loggedInUser); // Update context state
	};

	// Logout calls the Firebase wrapper
	const logout = async () => {
		await logoutUser();
		setUser(null); // Clear user from context
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
}

// Custom hook for components to use
export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used within AuthProvider");
	return context;
}
