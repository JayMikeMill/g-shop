// React hooks we need: 
// - createContext: to create a context object for sharing state across components
// - useContext: to consume that context in a component
// - useEffect: to run side effects like listening to auth state changes
// - useState: to store component or context state
// - ReactNode: type for children (any valid React elements)
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// Firebase type for the logged-in user
import { type User } from "firebase/auth";

// Import the initialized Firebase auth instance
// This is where we connect to Firebase authentication
import { auth } from "@data/firebase-api";

// Import wrapper functions for login and logout
// These wrap the Firebase auth calls for easier use
import { loginUser, logoutUser } from "@data/firebase-auth";

// ----------------------
// Define what our AuthContext will provide
// ----------------------
interface AuthContextType {
	// Currently logged-in user, or null if no one is logged in
	user: User | null;

	// Function to log in a user with email and password
	login: (email: string, password: string) => Promise<void>;

	// Function to log out the current user
	logout: () => Promise<void>;

	// True if we are waiting to know if the user is logged in
	loading: boolean;
}

// ----------------------
// Create the AuthContext object
// Initially undefined, we will provide it later in the Provider
// ----------------------
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ----------------------
// AuthProvider component wraps your app and provides auth state to all children
// ----------------------
export function AuthProvider({ children }: { children: ReactNode }) {
	// Store the current user in state
	const [user, setUser] = useState<User | null>(null);

	// Store a loading state while we check Firebase if the user is logged in
	const [loading, setLoading] = useState(true);

	// ----------------------
	// useEffect to run once when the component mounts
	// ----------------------
	useEffect(() => {
		// Firebase function to listen for auth changes
		// Whenever the user logs in or logs out, this callback runs
		const unsubscribe = auth.onAuthStateChanged(u => {
			setUser(u);        // Update our context state with the user (or null)
			setLoading(false); // We are done checking auth state
		});

		// Return the unsubscribe function to stop listening when component unmounts
		return unsubscribe;
	}, []); // Empty dependency array → only runs once on mount

	// ----------------------
	// Function to log in the user
	// ----------------------
	const login = async (email: string, password: string) => {
		// Call our wrapper function for Firebase login
		const loggedInUser = await loginUser(email, password);

		// Update our context state so the rest of the app knows the user is logged in
		setUser(loggedInUser);
	};

	// ----------------------
	// Function to log out the user
	// ----------------------
	const logout = async () => {
		// Call our wrapper function for Firebase logout
		await logoutUser();

		// Clear the user from context
		setUser(null);
	};

	// ----------------------
	// Provide the state and functions to all children components
	// ----------------------
	return (
		<AuthContext.Provider value={{ user, login, logout, loading }}>
			{children} {/* All child components can now access AuthContext */}
		</AuthContext.Provider>
	);
}

// ----------------------
// Custom hook for consuming AuthContext easily
// ----------------------
export function useAuth() {
	// Get the context value
	const context = useContext(AuthContext);

	// Safety check: if no provider wraps the component, throw an error
	if (!context) throw new Error("useAuth must be used within AuthProvider");

	// Return the context so components can use it
	return context;
}
