import React from "react";
import { XButton, TagBox } from "@components/ui";
import type { Category, Collection, Product } from "shared/types";
import { useFieldArray, useFormContext } from "react-hook-form";

import { CollectionSelect } from "../components/CollectionSelect";

/* -------------------- ProductCollectionsForm -------------------- */
const ProductCollectionsForm: React.FC = () => {
  const { control } = useFormContext<Product>();

  const {
    fields: categories,
    append: appendCategory,
    remove: removeCategory,
  } = useFieldArray({
    control,
    name: "categories",
  });

  const {
    fields: collections,
    append: appendCollection,
    remove: removeCollection,
  } = useFieldArray({
    control,
    name: "collections",
  });

  // Called when user selects a preset from dropdown
  const addCategory = (category: Category) => {
    // Prevent duplicates by name
    if (!categories.some((t) => t.name === category.name)) {
      appendCategory(category);
    }
  };

  // Called when user selects a preset from dropdown
  const addCollection = (collection: Collection) => {
    // Prevent duplicates by name
    if (!collections.some((t) => t.name === collection.name)) {
      appendCollection(collection);
    }
  };

  const remCategory = (index: number) => removeCategory(index);
  const remCollection = (index: number) => removeCollection(index);

  return (
    <div className="flex flex-col gap-md">
      <CollectionSelect categories={true} onSelect={addCategory} />

      {categories.length > 0 && (
        <div className="flex flex-wrap  gap-md">
          {categories.map((c, i) => (
            <div key={c.id ?? i} className="flex items-center gap-2">
              <TagBox className="bg-background text-base" text={c.name}>
                <XButton className="w-5 h-5" onClick={() => remCategory(i)} />
              </TagBox>
            </div>
          ))}
        </div>
      )}

      <CollectionSelect onSelect={addCollection} />

      {collections.length > 0 && (
        <div className="flex flex-wrap gap-md">
          {collections.map((c, i) => (
            <div key={c.id ?? i} className="flex items-center gap-2">
              <TagBox className="bg-background text-base" text={c.name}>
                <XButton className="w-5 h-5" onClick={() => remCollection(i)} />
              </TagBox>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCollectionsForm;
