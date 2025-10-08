// AdminProductsPage.tsx

import {
  AdminCrudPage,
  ProductEditorDialog,
  productTableColumns,
} from "@features/admin-dash";

import type { Product } from "@shared/types";
import { useApi } from "@api/useApi";

export default function AdminProductsPage() {
  const { uploadImage } = useApi();

  const uploadBlobURL = async (blobURL: string, name: string) => {
    const blob = await fetch(blobURL).then((r) => r.blob());
    const uploaded = await uploadImage(blob, name);
    return uploaded.url;
  };
  const preSaveHook = async (item: Product): Promise<Product> => {
    if (!item.images || item.images.length === 0) return item;

    try {
      for (let i = 0; i < item.images.length; i++) {
        if (item.images[i].main.startsWith("blob:")) {
          item.images[i].main = await uploadBlobURL(
            item.images[i].main,
            `${item.name}_main`
          );
          item.images[i].preview = await uploadBlobURL(
            item.images[i].preview,
            `${item.name}_preview`
          );
          item.images[i].thumbnail = await uploadBlobURL(
            item.images[i].thumbnail,
            `${item.name}_thumbnail`
          );
        }
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      throw new Error("Failed to upload images. Please try again.");
    }
    return item;
  };

  return (
    <AdminCrudPage<Product>
      objectName="Product"
      objectsName="Products"
      apiKey="products"
      columns={productTableColumns}
      Editor={ProductEditorDialog}
      pageSize={5}
      preSaveHook={preSaveHook}
      searchable={true}
    />
  );
}
