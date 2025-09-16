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
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
				<h2 className="text-xl font-bold mb-6 text-center">Admin Login</h2>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<label className="flex flex-col text-sm font-semibold text-gray-700">
						Email
						<input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 px-3 py-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary" />
					</label>
					<label className="flex flex-col text-sm font-semibold text-gray-700">
						Password
						<input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 px-3 py-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary" />
					</label>
					<button type="submit" className="bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition">Login</button>
					{error && <p className="text-red-600 text-sm text-center">{error}</p>}
				</form>
			</div>
		</div>
	);
}
