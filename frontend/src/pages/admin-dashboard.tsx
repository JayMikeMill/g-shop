import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import type { Product } from "@shared/product";
import { useAuth } from "@contexts/auth-context";
import { useProductManager } from "@contexts/product-manager";
import "@css/admin-dashboard.css";

export default function AdminDashboard() {
	const { user, login, logout, loading: authLoading } = useAuth();
	const productManager = useProductManager();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginError, setLoginError] = useState("");
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(false);

	// Load products after login
	useEffect(() => {
		if (!user) return;
		async function loadProducts() {
			setLoading(true);
			const allProducts = await productManager.fetchProducts();
			setProducts(allProducts);
			setLoading(false);
		}
		loadProducts();
	}, [user, productManager]);

	// Handle login
	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoginError("");
		try {
			await login(email, password);
			setEmail("");
			setPassword("");
            console.log("Current user:", getAuth().currentUser);
		} catch (err: any) {
			setLoginError(err.message || "Failed to login");
		}
	};

	// Handle logout
	const handleLogout = async () => {
		await logout();
		setProducts([]);
	};

	if (authLoading) return <p>Loading...</p>;

	// Show login form if not logged in
	if (!user) {
		return (
			<div className="admin-container">
				<h1 className="admin-title">Admin Login</h1>
				<form className="admin-form" onSubmit={handleLogin}>
					<label>
						Email
						<input
							type="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
						/>
					</label>
					<label>
						Password
						<input
							type="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							required
						/>
					</label>
					<button type="submit">Login</button>
					{loginError && <p style={{ color: "red" }}>{loginError}</p>}
				</form>
			</div>
		);
	}

	// Show admin dashboard after login
	return (
		<div className="admin-container">
			<h1 className="admin-title">Admin - Manage Products</h1>
			<button className="admin-logoutButton" onClick={handleLogout}>
				Logout
			</button>

			<h2 className="admin-subtitle">Existing Products</h2>
			{loading ? (
				<p>Loading products...</p>
			) : (
				<div className="admin-productsGrid">
					{products.map(product => (
						<div key={product.id} className="admin-productCard">
							<img
								src={product.image}
								alt={product.name}
								className="admin-productImage"
							/>
							<h3>{product.name}</h3>
							<p>${product.price.toFixed(2)}</p>
							<p>{product.description}</p>
							<button
								className="admin-deleteButton"
								onClick={() => productManager.deleteProduct(product)}
							>
								Delete
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
