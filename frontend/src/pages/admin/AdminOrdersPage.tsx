// src/features/admin-dash/order-editor/AdminOrdersPage.tsx
import { useState } from "react";
import { CircleSpinner } from "@components/ui";
import { useApi } from "@api/useApi";
import { OrderTable } from "@features/admin-dash/order-editor/OrdersTable";
import type { Order } from "@shared/types/Order";
import type { QueryObject } from "@shared/types/QueryObject";

export default function AdminOrdersPage() {
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [isSavingOrder, setIsSavingOrder] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const pageSize = 10;

  const { orders } = useApi();

  // Fetch orders
  const {
    data: ordersData,
    isLoading,
    refetch: refetchOrders,
  } = orders.getAll({ page, limit: pageSize, search } as QueryObject);

  const orderList = ordersData?.data ?? [];
  const totalPages = ordersData?.total
    ? Math.ceil(ordersData.total / pageSize)
    : 1;

  // Mutation hooks
  const updateOrder = orders.update();
  const deleteOrder = orders.delete();

  const clearState = () => setEditingOrder(null);

  const handleSaveOrder = async (update: Partial<Order>) => {
    if (!editingOrder || !editingOrder.id) return;
    setIsSavingOrder(true);
    try {
      await updateOrder.mutateAsync({
        ...editingOrder,
        ...update,
        id: editingOrder.id,
      });
      clearState();
    } catch (err: any) {
      alert("Failed to save order: " + err.message);
    } finally {
      setIsSavingOrder(false);
    }
    refetchOrders();
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!orderId) return;
    setIsSavingOrder(true);
    try {
      await deleteOrder.mutateAsync(orderId);
      clearState();
    } catch (err: any) {
      alert("Failed to delete order: " + err.message);
    } finally {
      setIsSavingOrder(false);
    }
    refetchOrders();
  };

  return (
    <div className="pt-lg pb-lg">
      {/* Spinner overlay */}
      {isSavingOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30">
          <CircleSpinner text="Saving Order..." />
        </div>
      )}

      {/* Orders table */}
      <OrderTable
        orders={orderList}
        loading={isLoading}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        searchValue={search}
        onSearchChange={setSearch}
        onSearchSubmit={() => setPage(1)} // reset page when searching
        onRowClick={setEditingOrder}
      />
    </div>
  );
}
