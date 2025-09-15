import React, { createContext, useContext } from "react";
import * as paymentService from "@services/payment-service";

interface PaymentsContextType {
  processPayment: (payment: any) => Promise<any>;
  refundPayment: (paymentId: string) => Promise<any>;
}

const PaymentsContext = createContext<PaymentsContextType | null>(null);

export const PaymentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <PaymentsContext.Provider
    value={{
      processPayment: paymentService.processPayment,
      refundPayment: paymentService.refundPayment,
    }}
  >
    {children}
  </PaymentsContext.Provider>
);

export const usePayments = () => {
  const ctx = useContext(PaymentsContext);
  if (!ctx) throw new Error("usePayments must be used within PaymentsProvider");
  return ctx;
};