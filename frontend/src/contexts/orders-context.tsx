import React, { createContext, useContext } from "react";
import * as orderService from "@services/order-service";

interface OrdersContextType {
  getAllOrders: (limit: number, cursor?: string) => Promise<any[]>;
  createOrder: (order: any) => Promise<any>;
  getOrder: (id: string) => Promise<any>;
  updateOrder: (id: string, order: any) => Promise<any>;
  deleteOrder: (id: string) => Promise<any>;
}

const OrdersContext = createContext<OrdersContextType | null>(null);

export const OrdersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <OrdersContext.Provider
    value={{
      getAllOrders: orderService.getAllOrders,
      createOrder: orderService.createOrder,
      getOrder: orderService.getOrder,
      updateOrder: orderService.updateOrder,
      deleteOrder: orderService.deleteOrder,
    }}
  >
    {children}
  </OrdersContext.Provider>
);

export const useOrders = () => {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within OrdersProvider");
  return ctx;
};