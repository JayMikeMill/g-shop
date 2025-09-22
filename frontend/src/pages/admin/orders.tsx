import { useState, useEffect } from "react";
import { useAdminPageHeader } from "./dashboard";
import { useApi } from "@api/use-api";
import type { Order } from "@shared/types/order";

import DynamicTable from "@components/dynamic-table";
import OrderDialog from "@components/dialogs/order-dialog";

export default function Orders() {
  const { setPageHeader } = useAdminPageHeader();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  const { getOrders, updateOrder } = useApi();

  useEffect(() => {
    setPageHeader(<h2 className="text-lg font-semibold m-0">Orders</h2>);
    return () => setPageHeader(null);
  }, [setPageHeader]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const fetchedOrders = await getOrders();
        setOrders(fetchedOrders);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  const handleDialogClose = () => {
    setEditingOrder(null);
    // reload orders
    (async () => {
      try {
        setLoading(true);
        const fetchedOrders = await getOrders();
        setOrders(fetchedOrders);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    })();
  };

  const handleSaveOrder = async (update: Partial<Order>) => {
    if (!editingOrder) return;
    await updateOrder(editingOrder.id, { ...editingOrder, ...update });
  };

  return (
    <div className="p-0">
      {/* Order dialog */}
      {editingOrder && (
        <OrderDialog
          order={editingOrder}
          onClose={handleDialogClose}
          onSave={handleSaveOrder}
        />
      )}

      {/* Loading / Error */}
      {loading && (
        <p className="text-text-secondary text-center py-md text-[1.2rem]">
          Loading orders...
        </p>
      )}
      {error && (
        <p className="text-error text-center py-md text-[1.2rem]">
          Error loading orders: {error.message}
        </p>
      )}
      {orders.length == 0 && (
        <p className="text-error text-center py-md text-[1.2rem]">
          No orders found.
        </p>
      )}

      {/* Order list */}
      {!loading && !error && orders.length > 0 && (
        <DynamicTable
          data={orders}
          columns={[
            {
              id: "id",
              label: "Order ID",
              width: "250px",
              sortable: true,
              render: (o) => (
                <div className="flex items-center justify-center whitespace-pre-wrap">
                  <span className="font-semibold text-center">{o.id}</span>
                </div>
              ),
              renderHeader: () => <span>Order ID</span>,
            },
            {
              id: "userId",
              label: "User ID",
              width: "120px",
              sortable: true,
              render: (o) => (
                <div className="flex items-center justify-center whitespace-pre-wrap">
                  <span className="font-semibold text-center">{o.userId}</span>
                </div>
              ),
              renderHeader: () => <span>User ID</span>,
            },
            {
              id: "name",
              label: "Name",
              width: "140px",
              render: (o) => (
                <div className="flex items-center justify-center whitespace-pre-wrap">
                  <span className="font-semibold text-center">
                    {o.shippingInfo?.name || ""}
                  </span>
                </div>
              ),
              renderHeader: () => <span>Name</span>,
            },
            {
              id: "address",
              label: "Address",
              width: "300px",
              render: (o) => {
                const a = o.shippingInfo?.address;
                if (!a)
                  return (
                    <div className="flex items-center justify-center whitespace-pre-wrap" />
                  );
                return (
                  <div className="flex flex-col items-center justify-center whitespace-pre-wrap text-center">
                    <span className="font-semibold">
                      {[
                        `${a.firstName} ${a.lastName}`.trim(),
                        a.addressLine1,
                        a.addressLine2,
                        `${a.city}, ${a.state} ${a.postalCode}, ${a.country}`,
                      ]
                        .filter(Boolean)
                        .join("\n")}
                    </span>
                  </div>
                );
              },
              renderHeader: () => <span>Address</span>,
            },
            {
              id: "email",
              label: "Email",
              width: "250px",
              render: (o) => (
                <div className="flex items-center justify-center whitespace-pre-wrap">
                  <span className="font-semibold text-center whitespace-pre-wrap">
                    {o.shippingInfo?.email || ""}
                  </span>
                </div>
              ),
              renderHeader: () => <span>Email</span>,
            },
            {
              id: "phone",
              label: "Phone",
              width: "120px",
              render: (o) => (
                <div className="flex items-center justify-center whitespace-pre-wrap">
                  <span className="font-semibold text-center">
                    {o.shippingInfo?.phone || ""}
                  </span>
                </div>
              ),
              renderHeader: () => <span>Phone</span>,
            },
            {
              id: "status",
              label: "Status",
              width: "120px",
              sortable: true,
              render: (o) => (
                <div className="flex items-center justify-center whitespace-pre-wrap">
                  <span className="font-semibold text-center">{o.status}</span>
                </div>
              ),
              renderHeader: () => <span>Status</span>,
            },
            {
              id: "timestamps",
              label: "timestamps",
              width: "200px",
              sortable: true,
              render: (o) => (
                <div className="flex flex-col items-center justify-center text-center gap-1 whitespace-pre-wrap">
                  <span className="font-semibold">
                    {new Date(o.createdAt).toLocaleString()}
                  </span>
                  <span className="font-semibold">
                    {new Date(o.updatedAt).toLocaleString()}
                  </span>
                </div>
              ),
              renderHeader: () => <span>Created / Updated</span>,
            },

            {
              id: "total",
              label: "Total",
              width: "80px",
              sortable: true,
              render: (o) => (
                <div className="flex items-center justify-center">
                  <span className="font-semibold text-center">
                    ${(o.total / 100).toFixed(2)}
                  </span>
                </div>
              ),
              renderHeader: () => <span>Total</span>,
            },
            {
              id: "items",
              label: "Items",
              width: "50px",
              render: (o) => (
                <div className="flex items-center justify-center">
                  <span className="font-semibold text-center">
                    {o.items?.length || 0}
                  </span>
                </div>
              ),
              renderHeader: () => <span>Items</span>,
            },
            {
              id: "shipping",
              label: "Shipping Info",
              width: "150px",
              render: (o) => {
                const s = o.shippingInfo;
                if (!s)
                  return <div className="flex items-center justify-center" />;
                return (
                  <div className="flex flex-col items-center justify-center whitespace-pre text-center">
                    <span className="font-semibold">
                      {[
                        `Method: ${s.method}`,
                        `Carrier: ${s.carrier}`,
                        s.trackingNumber
                          ? `Tracking: ${s.trackingNumber}`
                          : null,
                        s.cost ? `Cost: $${(s.cost / 100).toFixed(2)}` : null,
                        s.notes ? `Notes: ${s.notes}` : null,
                      ]
                        .filter(Boolean)
                        .join("\n")}
                    </span>
                  </div>
                );
              },
              renderHeader: () => <span>Shipping Info</span>,
            },
            {
              id: "payment",
              label: "Payment Info",
              width: "150px",
              render: (o) => {
                const p = o.paymentInfo;
                if (!p)
                  return <div className="flex items-center justify-center" />;
                return (
                  <div className="flex flex-col items-center justify-center whitespace-pre text-center">
                    <span className="font-semibold">
                      {[
                        //`Method: ${p.method}`,
                        `Status: ${p.status}`,
                        `Amount: $${(p.amount / 100).toFixed(2)}`,
                        //`Currency: ${p.currency}`,
                        //p.transactionId ? `Txn: ${p.transactionId}` : null,
                      ]
                        .filter(Boolean)
                        .join("\n")}
                    </span>
                  </div>
                );
              },
              renderHeader: () => <span>Payment Info</span>,
            },
            {
              id: "notes",
              label: "Notes",
              width: "300px",
              render: (o) => (
                <div className="flex items-center justify-center whitespace-pre-wrap">
                  <span className="font-semibold text-center">
                    {o.notes || ""}
                  </span>
                </div>
              ),
              renderHeader: () => <span>Notes</span>,
            },
          ]}
          actions={(o) => (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setEditingOrder(o)}
                className="btn-primary"
              >
                View
              </button>
              <button
                onClick={() => setEditingOrder(o)}
                className="btn-secondary"
              >
                Edit
              </button>
            </div>
          )}
          pageSize={10}
          searchable={true}
        />
      )}
    </div>
  );
}
