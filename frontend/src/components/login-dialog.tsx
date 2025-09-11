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
		<div className="dialog-overlay">
			<div className="dialog">
				<h2>Admin Login</h2>
				<form onSubmit={handleSubmit}>
					<label>Email
						<input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
					</label>
					<label>Password
						<input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
					</label>
					<button type="submit">Login</button>
					{error && <p className="error">{error}</p>}
				</form>
			</div>
		</div>
	);
}
