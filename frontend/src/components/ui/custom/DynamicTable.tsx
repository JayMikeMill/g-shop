import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
// Skeleton row helper
function TableSkeletonRow({ columns }: { columns: TableColumn<any>[] }) {
  return (
    <tr className="animate-pulse">
      {columns.map((col) => (
        <td
          key={col.id}
          className={`border-r border-b border-border text-center break-words ${col.className || ""}`}
          style={{ width: col.width || "120px", minHeight: "40px" }} // <- force row height
        >
          <div className="flex flex-col gap-sm p-sm">
            <div className="h-md w-3/4 mx-auto bg-border rounded" />
            <div className="h-md w-3/4 mx-auto bg-border rounded" />
            <div className="h-md w-3/4 mx-auto bg-border rounded" />
          </div>
        </td>
      ))}
    </tr>
  );
}

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
  loading?: boolean; // initial load
  loadingNextPage?: boolean; // loading next page only
  rowsLoading?: Record<string, string>;
  page?: number;
  totalPages?: number;
  onRowClick?: (row: T) => void;
  objectsName?: string;
  onEndReached?: () => void; // fire when scroll near bottom
}

export const DynamicTable = <T extends { id?: string }>({
  columns,
  data,
  loading = false,
  loadingNextPage = false,
  rowsLoading = {},
  page = 1,
  totalPages = 1,
  onRowClick,
  objectsName = "Objects",
  onEndReached,
}: DynamicTableProps<T>) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Check if table is full and trigger loading if not
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || loading || loadingNextPage || !onEndReached) return;
    // If table is not scrollable and more pages exist, load more
    if (el.scrollHeight <= el.clientHeight + 10 && page < totalPages) {
      onEndReached();
    }
  }, [data, loading, loadingNextPage, page, totalPages, onEndReached]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (target.scrollHeight - target.scrollTop <= target.clientHeight + 50) {
      onEndReached?.();
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full shadow-surface border border-border rounded bg-background">
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
            {Array.from({ length: 3 }).map((_, idx) => (
              <TableSkeletonRow
                columns={columns}
                key={"skeleton-full-" + idx}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full shadow-surface border border-border rounded bg-background text-text text-3xl">
        No {objectsName}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div
        ref={scrollRef}
        className="overflow-auto shadow-surface border border-border rounded h-full"
        onScroll={handleScroll}
      >
        <table className="table w-full border-collapse table-fixed font-sans">
          <thead className="sticky top-0 bg-primary text-primary-foreground z-10">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.id}
                  className={`font-bold uppercase text-center text-sm px-md py-sm
                    border-b border-l cursor-pointer
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
            {data.map((row, i) => {
              const loadingMsg = rowsLoading[row.id ?? ""];
              const backgroundColor =
                i % 2 === 0 ? "bg-background" : "bg-surface";
              return (
                <tr
                  key={row.id}
                  className={`relative ${backgroundColor} border-b hover:bg-primary-50`}
                  onClick={() =>
                    !loadingMsg && onRowClick?.(structuredClone(row))
                  }
                >
                  {columns.map((col) => (
                    <td
                      key={col.id}
                      className="border-r border-border text-center break-words relative"
                      style={{ width: col.width || "120px", minHeight: "40px" }}
                    >
                      {col.render ? col.render(row) : (row as any)[col.id]}
                    </td>
                  ))}

                  {/* Row overlay */}
                  {loadingMsg && (
                    <td
                      colSpan={columns.length}
                      className="absolute inset-0 flex items-center justify-left pointer-events-none bg-black/20 animate-pulse"
                      style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
                    >
                      <span className="font-bold text-2xl text-white animate-pulse p-xl">
                        {loadingMsg}
                      </span>
                    </td>
                  )}
                </tr>
              );
            })}
            {/* Skeleton rows for next page loading */}
            {loadingNextPage &&
              Array.from({ length: 1 }).map((_, idx) => (
                <TableSkeletonRow columns={columns} key={"skeleton-" + idx} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DynamicTable;
