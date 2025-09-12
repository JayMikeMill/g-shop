// src/components/ProductDialog.tsx
import { useState, useEffect } from "react";
import type { Product } from "@shared/product";
import { useProducts } from "@contexts/products-context";
import "@css/dialog.css";

interface ProductDialogProps {
	product: Product | null; // If null, we are adding a new product
	onClose: () => void;       // Callback to close dialog
}

export default function ProductDialog({ product, onClose }: ProductDialogProps) {
	const productManager = useProducts();

	// Form state
	const [name, setName] = useState(product?.name || "");
	const [price, setPrice] = useState(product?.price || 0);
	const [description, setDescription] = useState(product?.description || "");
	const [imageFiles, setImageFiles] = useState<File[]>([]);

	useEffect(() => {
		// Reset form when product changes
		setName(product?.name || "");
		setPrice(product?.price || 0);
		setDescription(product?.description || "");
		setImageFiles([]);
	}, [product]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			if (product) {
				// Editing an existing product
				await productManager.editProduct(
					{ ...product, name, price, description },
					imageFiles
				);
			} else {
				// Adding a new product
				if (imageFiles.length === 0) return alert("At least one image is required");
				await productManager.addProduct(
					{ name, price, description, sizes: [], colors: [] },
					imageFiles
				);
			}

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
					<label>Images
						<input type="file" multiple onChange={e => setImageFiles(Array.from(e.target.files || []))} />
					</label>
					<label>Name
						<input type="text" value={name} onChange={e => setName(e.target.value)} required />
					</label>
					<label>Price
						<input type="number" value={price} onChange={e => setPrice(parseFloat(e.target.value))} required />
					</label>
					<label>Description
						<textarea value={description} onChange={e => setDescription(e.target.value)} required />
					</label>
					<button type="submit">{product ? "Save Changes" : "Add Product"}</button>
					<button type="button" onClick={onClose}>Cancel</button>
				</form>
			</div>
		</div>
	);
}
