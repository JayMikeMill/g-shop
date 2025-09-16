// src/components/LoginDialog.tsx
import { useState } from "react";
import { useAuth } from "@contexts/auth-context";
import "@css/dialog.css"; // You can style the modal here

interface LoginDialogProps {
	onClose?: () => void; // Optional callback if you want to close dialog manually
}

export default function LoginDialog({ onClose }: LoginDialogProps) {
	const { login } = useAuth();
	const [email, setEmail] = useState("aptotekinfo@gmail.com");
	const [password, setPassword] = useState("aptotek2025");
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		try {
			await login(email, password);
			if (onClose) onClose();
		} catch (err: any) {
			setError(err.message || "Failed to login");
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
			<div className="bg-surface p-2xl rounded-lg shadow-xl w-full max-w-md border border-border flex flex-col gap-xl">
				<h2 className="text-2xl font-bold mb-lg text-center text-text">Admin Login</h2>
				<form onSubmit={handleSubmit} className="flex flex-col gap-lg">
					<label className="flex flex-col gap-xs text-base font-semibold text-textSecondary">
						<span className="mb-xs">Email</span>
						<input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="px-lg py-md border border-border rounded-lg bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary transition" autoComplete="username" />
					</label>
					<label className="flex flex-col gap-xs text-base font-semibold text-textSecondary">
						<span className="mb-xs">Password</span>
						<input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="px-lg py-md border border-border rounded-lg bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary transition" autoComplete="current-password" />
					</label>
					<button type="submit" className="mt-lg bg-primary text-white py-md rounded-lg font-semibold shadow-lg hover:bg-primaryDark transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">Login</button>
					{error && <p className="text-error text-base text-center mt-xs">{error}</p>}
				</form>
			</div>
		</div>
	);
}
