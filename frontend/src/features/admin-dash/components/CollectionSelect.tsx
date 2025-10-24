import { useDataApi } from "@app/hooks";
import { AnimatedSelect } from "@components/ui";
import type { Category, Collection } from "shared/types";

//==========================================================
// Product Collection Select
//==========================================================

interface CollectionSelectProps {
  onSelect: (collection: Collection | Category) => void;
  categories?: boolean; // whether to show categories or tags
}

export const CollectionSelect: React.FC<CollectionSelectProps> = ({
  onSelect,
  categories,
}) => {
  const api = categories ? useDataApi().categories : useDataApi().collections;

  // Queries
  const { data } = api.getMany({
    select: ["id", "name"],
  });

  const collections = data?.data ?? [];

  const handleSelect = (collection: Collection | Category) => {
    onSelect(collection);
  };

  const dropdownItems = collections.map((c) => ({
    value: c,
    label: c.name,
    render: (c: Collection | Category) => (
      <div className="flex gap-2 items-center w-auto cursor-pointer">
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
