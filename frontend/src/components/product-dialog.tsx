// src/components/ProductDialog.tsx
import { useState, useEffect, useRef } from "react";
import type { Product } from "@models/product";
import { useProducts } from "@contexts/products-context";
import "@css/dialog.css";
import "@css/product-dialog.css";

interface ProductDialogProps {
	product: Product | null; // If null, we are adding a new product
	onClose: () => void;       // Callback to close dialog
}

export default function ProductDialog({ product, onClose }: ProductDialogProps) {
	const productManager = useProducts();

	// Form state
	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [description, setDescription] = useState("");
	const [imageFiles, setImageFiles] = useState<File[]>([]);
	const [imagePreviews, setImagePreviews] = useState<string[]>([]);
	const [discountValue, setDiscountValue] = useState(0);
	const [discountType, setDiscountType] = useState<"%" | "$">("%");
	const [tags, setTags] = useState("");
	const [lightboxImage, setLightboxImage] = useState<string | null>(null);

	// Drag and drop state
	const dragItem = useRef<number | null>(null);
	const dragOverItem = useRef<number | null>(null);
	const [isDragging, setIsDragging] = useState(false);

	useEffect(() => {
		document.body.classList.add("body-no-scroll");
		return () => {
			document.body.classList.remove("body-no-scroll");
		};
	}, []);

	useEffect(() => {
		setName(product?.name || "");
		setPrice(product?.price || 0);
		setDescription(product?.description || "");
		setImageFiles([]);
		setImagePreviews(product?.images || []);
		setTags(product?.tags?.join(", ") || "");

		if (product && product.discount) {
			const discountStr = product.discount;
			if (discountStr.includes("%")) {
				setDiscountType("%");
				setDiscountValue(parseFloat(discountStr.replace("%", "")));
			} else { // Fixed amount
				setDiscountType("$");
				setDiscountValue(parseFloat(discountStr));
			}
		} else {
			setDiscountType("%");
			setDiscountValue(0);
		}
	}, [product]);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		setImageFiles(prev => [...prev, ...files]);

		const newPreviews = files.map(file => URL.createObjectURL(file));
		setImagePreviews(prev => [...prev, ...newPreviews]);
	};

	const removeImage = (index: number) => {
		const newImagePreviews = [...imagePreviews];
		const removedPreview = newImagePreviews.splice(index, 1)[0];
		setImagePreviews(newImagePreviews);

		const newImageFiles = [...imageFiles];
		const fileIndex = imageFiles.findIndex(file => URL.createObjectURL(file) === removedPreview);
		if (fileIndex > -1) {
			newImageFiles.splice(fileIndex, 1);
			setImageFiles(newImageFiles);
		}
	};

	const handleSort = () => {
		if (dragItem.current === null || dragOverItem.current === null) return;

		const newImagePreviews = [...imagePreviews];
		const draggedItemContent = newImagePreviews.splice(dragItem.current, 1)[0];
		newImagePreviews.splice(dragOverItem.current, 0, draggedItemContent);

		dragItem.current = null;
		dragOverItem.current = null;

		setImagePreviews(newImagePreviews);
		setIsDragging(false);
	};

	const handleTouchStart = (index: number, e: React.TouchEvent) => {
		e.preventDefault(); // Prevent context menu
		dragItem.current = index;
		setIsDragging(true);
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		if (!isDragging) return;
		const touch = e.touches[0];
		const target = document.elementFromPoint(touch.clientX, touch.clientY);
		const targetIndex = (target as HTMLElement)?.dataset.index;
		if (targetIndex) {
			dragOverItem.current = parseInt(targetIndex);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const tagsArray = tags.split(",").map(tag => tag.trim()).filter(tag => tag !== "");
			const discountString = discountValue > 0 ? (discountType === "%" ? `${discountValue}%` : `${discountValue}`) : "";

			if (product) {
				// Editing an existing product
				await productManager.editProduct(
					{ ...product, name, price, description, discount: discountString, tags: tagsArray, images: imagePreviews },
					imageFiles
				);
			} else {
				// Adding a new product
				if (imageFiles.length === 0) return alert("At least one image is required");
				await productManager.addProduct(
					{ name, price, description, sizes: ["S", "M", "L"], colors: ["Red", "Blue"], discount: discountString, tags: tagsArray },
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
			<div className="dialog product-dialog">
				<div className="dialog-header">
					<h2>{product ? "Edit Product" : "Add Product"}</h2>
					<button onClick={onClose} className="close-button">&times;</button>
				</div>
				<form onSubmit={handleSubmit} className="product-form" onContextMenu={(e) => e.preventDefault()}> {/* Prevent context menu on form */}
					<div className="form-grid">
						<div className="image-upload-section">
							<label className="file-input-label">
								Add Images
								<input type="file" multiple onChange={handleImageChange} accept="image/*" />
							</label>
							<div className="image-previews">
								{imagePreviews.map((preview, index) => (
									<div
										key={preview}
										data-index={index}
										className={`image-preview ${isDragging && dragItem.current === index ? "dragging" : ""}`}
										draggable
										onDragStart={() => { dragItem.current = index; setIsDragging(true); }}
										onDragEnter={() => (dragOverItem.current = index)}
										onDragEnd={handleSort}
										onDragOver={(e) => e.preventDefault()}
										onTouchStart={(e) => handleTouchStart(index, e)}
										onTouchMove={handleTouchMove}
										onTouchEnd={handleSort}
										onClick={() => setLightboxImage(preview)}
									>
										{index === 0 && <span className="image-label">Main</span>}
										<img src={preview} alt="Product preview" />
										<button type="button" onClick={(e) => { e.stopPropagation(); removeImage(index); }}>&times;</button>
									</div>
								))}
							</div>
						</div>

						<div className="product-details-section">
							<label>Name
								<input type="text" value={name} onChange={e => setName(e.target.value)} required />
							</label>
							<div className="price-discount-row">
								<label className="price-input-wrapper">Price
									<div className="input-with-symbol">
										<span className="symbol">$</span>
										<input type="number" value={price} onChange={e => setPrice(parseFloat(e.target.value))} required step="0.01" />
									</div>
								</label>
								<div className="discount-group">
									<label>Discount
										<div className="input-with-symbol">
											<span className="symbol">{discountType}</span>
											<input type="number" className="discount-input" value={discountValue} onChange={e => setDiscountValue(parseFloat(e.target.value))} step="0.01" />
										</div>
									</label>
									<select className="discount-selector" value={discountType} onChange={e => setDiscountType(e.target.value as "%" | "$")}>
										<option value="%">%</option>
										<option value="$">$</option>
									</select>
								</div>
							</div>
							<label>Tags (comma-separated)
								<input type="text" value={tags} onChange={e => setTags(e.target.value)} />
							</label>
							<label>Description
								<textarea value={description} onChange={e => setDescription(e.target.value)} required />
							</label>
						</div>
					</div>
					<div className="dialog-actions">
						<button type="button" onClick={onClose} className="secondary-button">Cancel</button>
						<button type="submit" className="primary-button">{product ? "Save Changes" : "Add Product"}</button>
					</div>
				</form>
			</div>
			{lightboxImage && (
				<div className="image-lightbox-overlay" onClick={() => setLightboxImage(null)}>
					<div className="image-lightbox-content">
						<img src={lightboxImage} alt="Enlarged product preview" />
					</div>
				</div>
			)}
		</div>
	);
}
