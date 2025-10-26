import { useState, useCallback } from "react";

export type RowActionMsg = string;

export function useRowActions() {
  const [rowsLoading, setRowsLoading] = useState<Record<string, RowActionMsg>>(
    {}
  );

  const [hiddenKebabs, setHiddenKebabs] = useState<Record<string, boolean>>({});

  const withRowAction = useCallback(
    async (fn: () => Promise<void>, rowId: string, action: RowActionMsg) => {
      setRowsLoading((map) => ({ ...map, [rowId]: action }));
      try {
        await fn();
      } catch (err: any) {
        alert(err?.message ?? "Operation failed");
      } finally {
        setRowsLoading((map) => {
          const newMap = { ...map };
          delete newMap[rowId];
          return newMap;
        });
      }
    },
    []
  );

  return {
    withRowAction,
    rowsLoading,
    setRowsLoading,
    hiddenKebabs,
    setHiddenKebabs,
  };
}
