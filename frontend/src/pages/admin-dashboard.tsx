// src/pages/AdminDashboard.tsx
import { useState, useEffect } from "react";
import { useAuth } from "@contexts/auth-context";
import { useProducts } from "@contexts/products-context";
import type { Product } from "@shared/product";

import LoginDialog from "@components/login-dialog";
import ProductDialog from "@components/product-dialog";
import "@css/admin-dashboard.css";

export default function AdminDashboard() {
	const { user, logout, loading: authLoading } = useAuth();
	const productManager = useProducts();

	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(false);

	const [showProductDialog, setShowProductDialog] = useState(false);
	const [editingProduct, setEditingProduct] = useState<Product | null>(null);

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

	const handleLogout = async () => {
		await logout();
		setProducts([]);
	};

	const openAddDialog = () => {
		setEditingProduct(null);
		setShowProductDialog(true);
	};

	const openEditDialog = (product: Product) => {
		setEditingProduct(product);
		setShowProductDialog(true);
	};

	const handleDelete = async (product: Product) => {
		await productManager.deleteProduct(product);
		setProducts(products.filter(p => p.id !== product.id));
	};

	if (authLoading) return <p>Loading...</p>;

	// Show login dialog if not logged in
	if (!user) return <LoginDialog />;

	return (
		<div className="admin-container">
			<h1>Admin - Manage Products</h1>
			<button onClick={handleLogout}>Logout</button>
			<button onClick={openAddDialog}>Add Product</button>

			{loading ? (
				<p>Loading products...</p>
			) : (
				<div className="admin-productsGrid">
					{products.map(p => (
						<div key={p.id} className="admin-productCard">
							<img src={p.image} alt={p.name} className="admin-productImage" />
							<h3>{p.name}</h3>
							<p>${p.price.toFixed(2)}</p>
							<p>{p.description}</p>
							<button onClick={() => openEditDialog(p)}>Edit</button>
							<button onClick={() => handleDelete(p)}>Delete</button>
						</div>
					))}
				</div>
			)}

			{showProductDialog && (
				<ProductDialog
					product={editingProduct}
					onClose={() => setShowProductDialog(false)}
					onUpdate={setProducts}
				/>
			)}
		</div>
	);
}
