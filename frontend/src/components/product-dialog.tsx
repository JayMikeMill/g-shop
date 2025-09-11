// src/components/ProductDialog.tsx
import { useState, useEffect } from "react";
import type { Product } from "@shared/product";
import { useProducts } from "@contexts/products-context";
import "@css/dialog.css";

interface ProductDialogProps {
	product?: Product | null; // If null or undefined, we are adding a new product
	onClose: () => void;       // Callback to close dialog
	onUpdate: (products: Product[]) => void; // Callback to update product list
}

export default function ProductDialog({ product, onClose, onUpdate }: ProductDialogProps) {
	const productManager = useProducts();

	// Form state
	const [name, setName] = useState(product?.name || "");
	const [price, setPrice] = useState(product?.price || 0);
	const [description, setDescription] = useState(product?.description || "");
	const [imageFile, setImageFile] = useState<File | null>(null);

	useEffect(() => {
		// Reset form when product changes
		setName(product?.name || "");
		setPrice(product?.price || 0);
		setDescription(product?.description || "");
		setImageFile(null);
	}, [product]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			if (product) {
				// TODO: implement update product logic in Firebase
				alert("Edit functionality not implemented yet");
			} else {
				if (!imageFile) return alert("Image required");
				await productManager.addProduct({
                    name, price, description,
                    sizes: [],
                    colors: []
                }, imageFile);
			}

			// Refresh product list
			const allProducts = await productManager.fetchProducts();
			onUpdate(allProducts);
			onClose();
		} catch (err: any) {
			alert(err.message || "Error saving product");
		}
	};

	return (
		<div className="dialog-overlay">
			<div className="dialog">
				<h2>{product ? "Edit Product" : "Add Product"}</h2>
				<form onSubmit={handleSubmit}>
					<label>Name
						<input type="text" value={name} onChange={e => setName(e.target.value)} required />
					</label>
					<label>Price
						<input type="number" value={price} onChange={e => setPrice(parseFloat(e.target.value))} required />
					</label>
					<label>Description
						<textarea value={description} onChange={e => setDescription(e.target.value)} required />
					</label>
					<label>Image
						<input type="file" onChange={e => setImageFile(e.target.files?.[0] || null)} />
					</label>
					<button type="submit">{product ? "Save Changes" : "Add Product"}</button>
					<button type="button" onClick={onClose}>Cancel</button>
				</form>
			</div>
		</div>
	);
}
