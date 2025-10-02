// src/features/admin-dash/catalog-editor/CollectionTable.tsx
import type { Category, Collection } from "@shared/types/Catalog";
import { DynamicTable, Button } from "@components/ui";

interface CollectionTableProps<T extends Category | Collection> {
  data: T[];
  loading?: boolean;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onRowClick: (item: T) => void;
  onAddClick: () => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: () => void;
}

export function CollectionTable<T extends Category | Collection>({
  data,
  loading,
  page = 1,
  totalPages = 1,
  onPageChange,
  onRowClick,
  onAddClick,
  searchValue,
  onSearchChange,
  onSearchSubmit,
}: CollectionTableProps<T>) {
  return (
    <DynamicTable<T>
      data={data}
      loading={loading}
      page={page}
      totalPages={totalPages}
      onPageChange={onPageChange}
      onRowClick={onRowClick}
      searchable={!!onSearchChange && !!onSearchSubmit}
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      onSearchSubmit={onSearchSubmit}
      objectsName="Collections"
      headerButton={<Button onClick={onAddClick}>Add Collection</Button>}
      columns={[
        {
          id: "name",
          label: "Name",
          width: "150px",
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
          width: "300px",
          render: (item: T) => (
            <div className="flex items-top justify-left">
              <span className="font-semibold text-text">
                {item.description}
              </span>
            </div>
          ),
        },
      ]}
    />
  );
}

export default CollectionTable;
