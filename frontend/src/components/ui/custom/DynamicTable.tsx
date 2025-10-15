import type { ReactNode } from "react";
import { Search } from "lucide-react";
import { Input, LoaderBar } from "@components/ui";
import "./dynamic-table.css";

export interface TableColumn<T> {
  id: string;
  label: string;
  sortable?: boolean;
  render?: (row: T) => ReactNode; // render a cell
  renderHeader?: () => ReactNode; // render the header
  width?: string; // e.g. "200px" or "15%"
  className?: string;
  headerClassName?: string;
}

export interface DynamicTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  searchable?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: () => void;
  onRowClick?: (row: T) => void;
  headerButton?: ReactNode;
  objectsName?: string;
}

export const DynamicTable = <T extends { id?: string }>({
  columns,
  data,
  loading = false,
  page = 1,
  totalPages = 1,
  onPageChange,
  searchable = true,
  searchValue = "",
  onSearchChange,
  onSearchSubmit,
  onRowClick,
  headerButton,
  objectsName = "Objects",
}: DynamicTableProps<T>) => {
  return (
    <div className="flex flex-col gap-4 px-2">
      {/* Header */}
      <div className="flex flex-row w-full gap-2 items-center">
        {headerButton && <div className="h-full">{headerButton}</div>}

        {searchable && onSearchChange && onSearchSubmit && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSearchSubmit();
            }}
            className="relative w-full h-full"
          >
            <Input
              type="text"
              placeholder={
                objectsName ? `Search ${objectsName}...` : "Search..."
              }
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <Search
              className="text-text absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              size={20}
              onClick={onSearchSubmit}
            />
          </form>
        )}
      </div>

      {/* Table */}
      <div className="table-container">
        {loading || data.length === 0 ? (
          <div className="w-full flex items-center justify-center border-border border rounded h-24 text-text text-3xl">
            {loading ? <LoaderBar /> : `No ${objectsName}`}
          </div>
        ) : (
          <table className="table w-full">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.id}
                    className={col.headerClassName || ""}
                    style={
                      col.width ? { width: col.width } : { width: "120px" }
                    }
                  >
                    {col.renderHeader ? col.renderHeader() : col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick?.(structuredClone(row))}
                >
                  {columns.map((col) => (
                    <td
                      key={col.id}
                      className={col.className || ""}
                      style={
                        col.width ? { width: col.width } : { width: "120px" }
                      }
                    >
                      {col.render ? col.render(row) : (row as any)[col.id]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && onPageChange && (
        <div className="table-pagination">
          <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
            Prev
          </button>
          <span className="flex items-center text-text">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
export default DynamicTable;
