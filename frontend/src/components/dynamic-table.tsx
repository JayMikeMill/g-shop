import { useState, type ReactNode, useMemo } from "react";

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
  data: T[];
  columns: TableColumn<T>[];
  actions?: (row: T) => ReactNode;
  pageSize?: number;
  searchable?: boolean;
}

export default function DynamicTable<T extends { id: string | number }>({
  data,
  columns,
  actions,
  pageSize = 10,
  searchable = true,
}: DynamicTableProps<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Filtered & sorted data
  const filteredData = useMemo(() => {
    let temp = [...data];
    if (search) {
      temp = temp.filter((row) =>
        columns.some((col) => {
          const value = (row as any)[col.id];
          return value?.toString().toLowerCase().includes(search.toLowerCase());
        })
      );
    }
    if (sortKey) {
      temp.sort((a, b) => {
        const aVal = (a as any)[sortKey];
        const bVal = (b as any)[sortKey];
        if (aVal == null) return 1;
        if (bVal == null) return -1;
        if (aVal === bVal) return 0;
        return sortOrder === "asc"
          ? aVal > bVal
            ? 1
            : -1
          : aVal < bVal
            ? 1
            : -1;
      });
    }
    return temp;
  }, [data, search, sortKey, sortOrder, columns]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const pageData = filteredData.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (col: TableColumn<T>) => {
    if (!col.sortable) return;
    if (sortKey === col.id) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(col.id);
      setSortOrder("asc");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Search */}
      {searchable && (
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border border-inputBorder rounded shadow-sm focus:outline-none focus:ring focus:ring-accent w-full md:w-64"
        />
      )}

      <div className="overflow-x-auto w-full rounded card-shadow border border-divider">
        <table className="w-full min-w-[800px] border-collapse table-fixed">
          <thead>
            <tr className="bg-primary sticky top-0 z-10">
              {columns.map((col) => (
                <th
                  key={col.id}
                  className={`font-semibold text-text-secondary uppercase text-xs py-3 px-4 border-r border-divider cursor-pointer ${col.headerClassName || ""}`}
                  style={col.width ? { width: col.width } : { width: "120px" }}
                  onClick={() => handleSort(col)}
                >
                  {col.renderHeader ? (
                    col.renderHeader()
                  ) : (
                    <div className="flex items-center justify-center gap-1">
                      {col.label}
                      {sortKey === col.id && (
                        <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                      )}
                    </div>
                  )}
                </th>
              ))}
              {actions && (
                <th className="w-[140px]  font-semibold text-text-secondary uppercase text-xs py-3 px-4 text-center border-l border-divider sticky top-0 right-0 bg-accent z-20">
                  ACTIONS
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, idx) => (
              <tr
                key={row.id}
                className={`${idx % 2 === 0 ? "bg-surface" : "bg-accent"} hover:bg-accent/20 transition-colors`}
              >
                {columns.map((col) => (
                  <td
                    key={col.id}
                    className={`px-4 py-2 border-r border-divider whitespace-nowrap ${col.className || ""}`}
                    style={
                      col.width ? { width: col.width } : { width: "120px" }
                    }
                  >
                    {col.render ? col.render(row) : (row as any)[col.id]}
                  </td>
                ))}
                {actions && (
                  <td
                    className={`${idx % 2 === 0 ? "bg-surface" : "bg-accent"} px-4 py-2 border-l border-divider sticky right-0 z-20 flex flex-col items-center justify-start gap-2 h-full`}
                  >
                    {actions(row)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-2">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>
          <span className="text-text">
            Page {page} of {totalPages}
          </span>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
