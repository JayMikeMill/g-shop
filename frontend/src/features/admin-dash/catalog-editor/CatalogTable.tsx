// src/features/admin-dash/catalog-editor/CatalogTable.tsx
import { DynamicTable, Button } from "@components/ui";
import type { Category, Collection } from "@shared/types/Catalog";

interface CollectionTableProps<T extends Category | Collection> {
  fetcher: () => Promise<{ data: T[]; total: number }>;
  onRowClick: (item: T) => void;
  onAddClick: () => void;
  typeLabel: string;
  keyProp?: number;
}

export function CollectionTable<T extends Category | Collection>({
  fetcher,
  onRowClick,
  onAddClick,
  typeLabel,
  keyProp,
}: CollectionTableProps<T>) {
  return (
    <DynamicTable
      fetchPage={fetcher}
      key={keyProp}
      onRowClick={onRowClick}
      objectsName={typeLabel + "s"}
      headerButton={<Button onClick={onAddClick}>Add {typeLabel}</Button>}
      columns={[
        {
          id: "name",
          label: "Name",
          sortable: true,
          render: (item: T) => (
            <div className="flex items-center justify-center">
              <span className="font-semibold text-center text-text">
                {item.name}
              </span>
            </div>
          ),
        },
        {
          id: "description",
          label: "Description",
          render: (item: T) => (
            <div className="flex items-top justify-left">
              <span className="font-semibold text-text">
                {item.description}
              </span>
            </div>
          ),
        },
      ]}
      pageSize={10}
      searchable={true}
    />
  );
}
