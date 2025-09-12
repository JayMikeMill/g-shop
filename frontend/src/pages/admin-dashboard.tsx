// src/pages/AdminDashboard.tsx
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@contexts/auth-context";
import { useProducts } from "@contexts/products-context";
import type { Product } from "@shared/product";

import LoginDialog from "@components/login-dialog";
import ProductDialog from "@components/product-dialog";
import AdminProductList from "@components/admin-product-list";
import "@css/admin-dashboard.css";

export default function AdminDashboard() {
	const { user, logout, loading: authLoading } = useAuth();
	const productManager = useProducts();

	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(false);

	const [showProductDialog, setShowProductDialog] = useState(false);
	const [editingProduct, setEditingProduct] = useState<Product | null>(null);

	const loadProducts = useCallback(async () => {
		if (!user) return;
		setLoading(true);
		const allProducts = await productManager.fetchProducts();
		setProducts(allProducts);
		setLoading(false);
	}, [user, productManager]);

	useEffect(() => {
		loadProducts();
	}, [loadProducts]);

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

	const handleDialogClose = () => {
		setShowProductDialog(false);
		setEditingProduct(null);
		loadProducts(); // Refresh products when dialog closes
	};

	const handleDelete = async (product: Product) => {
		if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
			await productManager.deleteProduct(product);
			loadProducts(); // Refresh products after deletion
		}
	};

	if (authLoading) return <p className="loading-text">Authenticating...</p>;

	// Show login dialog if not logged in
	if (!user) return <LoginDialog />;

	return (
		<div className="admin-container">
			<div className="admin-header">
				<h1>Admin Dashboard</h1>
				<div className="admin-actions">
					<button className="admin-add-button" onClick={openAddDialog}>Add Product</button>
					<button className="admin-logout-button" onClick={handleLogout}>Logout</button>
				</div>
			</div>

			{loading ? (
				<p className="loading-text">Loading products...</p>
			) : (
				<AdminProductList
					products={products}
					onEdit={openEditDialog}
					onDelete={handleDelete}
				/>
			)}

			{showProductDialog && (
				<ProductDialog
					product={editingProduct}
					onClose={handleDialogClose}
				/>
			)}
		</div>
	);
}
