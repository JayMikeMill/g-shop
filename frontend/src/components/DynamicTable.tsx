import { useState, useEffect, type ReactNode } from "react";
import type { QueryObject } from "@shared/types/QueryObject";

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
  pageSize?: number;
  searchable?: boolean;
  onRowClick?: (row: T) => void;
  actions?: (row: T) => ReactNode;
  // **Server-side fetch function**
  fetchPage: (query?: QueryObject) => Promise<{ data: T[]; total: number }>;
}

export default function DynamicTable<T extends { id?: string }>({
  columns = [],
  pageSize = 10,
  searchable = true,
  onRowClick,
  actions,
  fetchPage,
}: DynamicTableProps<T>) {
  const [pageData, setPageData] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil(total / pageSize);

  const loadPage = async (pageNumber: number) => {
    setLoading(true);
    try {
      const fetchQuery = {
        search: search || undefined,
        sortBy: sortKey || undefined,
        sortOrder: sortKey ? sortOrder : undefined,
        limit: pageSize,
        page: pageNumber,
      } as QueryObject;

      console.log("Fetching page with query:", fetchQuery);

      const { data, total } = await fetchPage(fetchQuery);

      console.log("Fetched page result:", data);

      setPageData(data);
      setTotal(total);
    } catch (err) {
      console.error("Failed to load table page:", err);
    } finally {
      setLoading(false);
    }
  };

  // Reload whenever page, search, or sort changes
  useEffect(() => {
    loadPage(page);
  }, [page, search, sortKey, sortOrder]);

  const handleSort = (col: TableColumn<T>) => {
    if (!col.sortable) return;
    if (sortKey === col.id) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(col.id);
      setSortOrder("asc");
    }
    setPage(1); // reset to first page when sorting changes
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // reset to first page when searching
  };

  return (
    <div className="flex flex-col gap-4 px-2">
      {/* Search */}
      {searchable && (
        <div className="px-4">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
            className="table-search"
          />
        </div>
      )}

      {/* Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              {actions && <th className="actions w-[120px]">Actions</th>}
              {columns.map((col) => (
                <th
                  key={col.id}
                  className={`${col.sortable ? "sortable" : ""} ${col.headerClassName || ""}`}
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
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="text-center py-4"
                >
                  Loading...
                </td>
              </tr>
            ) : (pageData || []).length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="text-center py-4"
                >
                  No data
                </td>
              </tr>
            ) : (
              pageData.map((row) => (
                <tr key={row.id} onClick={() => onRowClick?.(row)}>
                  {actions && <td className="actions">{actions(row)}</td>}
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="table-pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </button>
          <span className="flex items-center text-text">
            Page {page} of {totalPages}
          </span>
          <button
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
