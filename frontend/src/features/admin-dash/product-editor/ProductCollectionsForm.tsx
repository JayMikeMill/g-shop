import React from "react";
import { XButton, TagBox, AnimatedSelect } from "@components/ui";

import type { Category, Collection, Product } from "shared/types";

import { useDataApi } from "@api";
import { useFieldArray, useFormContext } from "react-hook-form";

/* -------------------- ProductTagsEditor -------------------- */
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
        <div className="flex flex-wrap">
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
        <div className="flex flex-wrap">
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

//==========================================================
// Product Collection Select
//==========================================================

interface CollectionSelectProps {
  onSelect: (collection: Collection | Category) => void;
  categories?: boolean; // whether to show categories or tags
}

const CollectionSelect: React.FC<CollectionSelectProps> = ({
  onSelect,
  categories,
}) => {
  const api = categories ? useDataApi().categories : useDataApi().collections;

  // Queries
  const { data } = api.getMany({
    select: ["id", "name"],
  });

  const collections = data?.data ?? [];

  console.log("collections", data);
  const handleSelect = (collection: Collection | Category) => {
    onSelect(collection);
  };

  const dropdownItems = collections.map((c) => ({
    value: c,
    label: c.name,
    render: (c: Collection | Category) => (
      <div className="flex gap-2 items-center w-auto cursor-pointer hover:bg-backgroundAlt">
        <span>{c.name}</span>
      </div>
    ),
  }));

  return (
    <div className="relative flex items-center gap-2 w-full">
      <AnimatedSelect
        items={dropdownItems}
        onChange={handleSelect}
        actionName={`Select ${categories ? "Category" : "Collection"}...`}
        noItemsText={`No ${categories ? "Categories" : "Collections"}.`}
        className="w-full"
      />
    </div>
  );
};
