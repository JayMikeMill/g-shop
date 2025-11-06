import { m } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

// Skeleton row helper
function TableSkeletonRow({
  columns,
  rowHeight,
}: {
  columns: TableColumn<any>[];
  rowHeight: string;
}) {
  const contentRows = Math.min(3, Math.floor(parseInt(rowHeight) / 40));
  return (
    <tr className="animate-pulse">
      {columns.map((col) => (
        <td
          key={col.id}
          className={`border-r border-b border-border text-center`}
          style={{
            width: col.width || "120px",
            height: rowHeight,
            maxHeight: rowHeight,
          }}
        >
          <div className="flex flex-col gap-sm p-sm">
            {Array.from({ length: contentRows }).map((_, i) => (
              <div key={i} className="h-md w-3/4 mx-auto bg-border rounded" />
            ))}
          </div>
        </td>
      ))}
    </tr>
  );
}

// Table header helper
function TableHeader<T>({ columns }: { columns: TableColumn<T>[] }) {
  return (
    <thead
      className="sticky top-0 bg-primary text-primary-foreground z-10"
      style={{ minHeight: "40px" }}
    >
      <tr>
        {columns.map((col) => (
          <th
            key={col.id}
            className={`font-bold uppercase text-center text-sm px-md py-sm
							border-b border-l cursor-pointer w-full
							transition-colors duration-200
							${col.sortable ? "hover:bg-primary-400 hover:text-primary-foreground" : ""}
							${col.headerClassName || ""}`}
            style={{ width: col.width || "100%" }}
          >
            {col.renderHeader ? col.renderHeader() : col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export type RowAction<T> = {
  setItem: (item: T) => void;
  setLoading: (id: string, loadingMsg: string | null) => void;
};

export interface TableColumn<T> {
  id: string;
  label: string;
  sortable?: boolean;
  render?: (row: T, rowActions?: RowAction<T>) => ReactNode;
  renderHeader?: () => ReactNode;
  width?: string;
  className?: string;
  headerClassName?: string;
}

export interface DynamicTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  minWidth?: string;
  rowHeight?: string;
  loading?: boolean;
  loadingNextPage?: boolean;
  rowsLoading?: Record<string, string>;
  page?: number;
  totalPages?: number;
  onRowClick?: (row: T) => void;
  objectsName?: string;
  onEndReached?: () => void;
  rowActions?: RowAction<T>;
}

export const DynamicTable = <T extends { id?: string }>({
  columns,
  data,
  minWidth = "900px",
  rowHeight = "40px",
  loading = false,
  loadingNextPage = false,
  rowsLoading = {},
  page = 1,
  totalPages = 1,
  onRowClick,
  objectsName = "Objects",
  onEndReached,
  rowActions,
}: DynamicTableProps<T>) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto load next page if table not scrollable
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || loading || loadingNextPage || !onEndReached) return;
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

  // Loading skeleton
  if (loading) {
    return (
      <div className="w-full h-full shadow-surface border border-border rounded bg-background">
        <table
          className={`w-full border-collapse table-fixed font-sans`}
          style={{ minWidth }}
        >
          <TableHeader columns={columns} />
          <tbody>
            {Array.from({ length: 3 }).map((_, idx) => (
              <TableSkeletonRow
                columns={columns}
                rowHeight={rowHeight}
                key={"skeleton-full-" + idx}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Empty state
  if (data.length === 0) {
    return (
      <div className="overflow-auto shadow-surface border border-border rounded h-full">
        <table
          className={`w-full border-collapse table-fixed font-sans`}
          style={{ minWidth }}
        >
          <TableHeader columns={columns} />
          <tbody>
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-8 text-3xl font-semibold text-muted-foreground"
              >
                No {objectsName}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  // Table with data
  return (
    <div className="flex flex-col h-full">
      <div
        ref={scrollRef}
        className="overflow-auto shadow-surface border border-border rounded h-full"
        onScroll={handleScroll}
      >
        <table
          className={`w-full table-fixed border-collapse font-sans`}
          style={{ minWidth }}
        >
          <TableHeader columns={columns} />
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
                      className="w-full border-r border-border text-center break-words"
                      style={{ height: rowHeight }}
                    >
                      {col.render
                        ? col.render(row, rowActions)
                        : (row as any)[col.id]}
                    </td>
                  ))}

                  {loadingMsg && (
                    <div
                      className="absolute inset-0 flex items-center justify-left pointer-events-none bg-black/20 animate-pulse"
                      style={{
                        textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                        backdropFilter: "blur(2px)",
                      }}
                    >
                      <span className="font-bold text-2xl text-white animate-pulse p-xl">
                        {loadingMsg}
                      </span>
                    </div>
                  )}
                </tr>
              );
            })}

            {/* Skeleton for next page */}
            {loadingNextPage &&
              Array.from({ length: 1 }).map((_, idx) => (
                <TableSkeletonRow
                  columns={columns}
                  rowHeight={rowHeight}
                  key={"skeleton-" + idx}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DynamicTable;
