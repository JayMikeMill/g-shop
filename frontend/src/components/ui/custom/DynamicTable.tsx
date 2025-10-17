import type { ReactNode } from "react";
import { LoaderBar } from "@components/ui";

export interface TableColumn<T> {
  id: string;
  label: string;
  sortable?: boolean;
  render?: (row: T) => ReactNode;
  renderHeader?: () => ReactNode;
  width?: string;
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
  onRowClick?: (row: T) => void;
  objectsName?: string;
}

export const DynamicTable = <T extends { id?: string }>({
  columns,
  data,
  loading = false,
  page = 1,
  totalPages = 1,
  onPageChange,
  onRowClick,
  objectsName = "Objects",
}: DynamicTableProps<T>) => {
  // If loading, return the overlay loader immediately
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full w-full shadow-card border border-border rounded bg-background">
        <LoaderBar />
      </div>
    );
  }

  // If no data, show empty state
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full shadow-card border border-border rounded bg-background text-text text-3xl">
        No {objectsName}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="overflow-auto shadow-card border border-border rounded h-full">
        <table className="table w-full border-collapse table-fixed font-sans">
          <thead className="sticky top-0 bg-primary text-primary-foreground z-10">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.id}
                  className={`font-bold uppercase text-center text-sm px-md py-sm
										border-b border-l border-border cursor-pointer
										transition-colors duration-200
										${col.sortable ? "hover:bg-primary-400 hover:text-primary-foreground" : ""}
										${col.headerClassName || ""}`}
                  style={{ width: col.width || "120px" }}
                >
                  {col.renderHeader ? col.renderHeader() : col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(structuredClone(row))}
                className={`transition-colors duration-300 border-b
									${i % 2 === 0 ? "bg-background" : "bg-card"} hover:bg-primary-50`}
              >
                {columns.map((col) => (
                  <td
                    key={col.id}
                    className={`px-md py-sm border-r border-border text-center break-words ${col.className || ""}`}
                    style={{ width: col.width || "120px" }}
                  >
                    {col.render ? col.render(row) : (row as any)[col.id]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && onPageChange && (
        <div className="flex justify-center gap-2 p-md">
          <button
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className="cursor-pointer transition-all duration-200 px-4 py-2 rounded border border-border bg-card text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:bg-primary hover:enabled:text-primary-foreground hover:enabled:border-primary"
          >
            Prev
          </button>
          <span className="flex items-center text-text">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
            className="cursor-pointer transition-all duration-200 px-4 py-2 rounded border border-border bg-card text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:bg-primary hover:enabled:text-primary-foreground hover:enabled:border-primary"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DynamicTable;
