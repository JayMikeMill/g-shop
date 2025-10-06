// React hooks for state and lifecycle
import { useEffect, useState } from "react";

import {
  type OrderShippingInfo,
  type OrderItem,
  TransactionStatus as TransactionStatuses,
  PaymentMethod as PaymentMethods,
  OrderStatus as OrderStatuses,
} from "@my-store/shared";

import { useApi } from "@api/useApi";

// Import PaymentStatus and PaymentMethod enums
import { Button } from "@components/ui";

// Square environment variables (from Vite)
const SQUARE_APPLICATION_ID = import.meta.env.VITE_SQUARE_APPLICATION_ID || "";
const SQUARE_LOCATION_ID = import.meta.env.VITE_SQUARE_LOCATION_ID || "";

// Extend the window object to include Square
declare global {
  interface Window {
    Square?: any;
  }
}

interface SquarePaymentFormProps {
  total: number;
  orderItems: OrderItem[];
  shippingInfo: OrderShippingInfo;
  setLoading: (loading: boolean) => void;
  setMessage: (msg: string | null) => void;
}

export default function PaymentFormSquare({
  total,
  orderItems,
  shippingInfo,
  setLoading,
  setMessage,
}: SquarePaymentFormProps) {
  const [cardInstance, setCardInstance] = useState<any>(null);
  const { processPayment, orders } = useApi();

  // Setup mutation hook for creating orders
  const createOrder = orders.create();

  // Initialize Square card
  useEffect(() => {
    async function initializeSquare() {
      if (!window.Square) return console.error("Square.js not loaded");
      try {
        const payments = window.Square.payments(
          SQUARE_APPLICATION_ID,
          SQUARE_LOCATION_ID
        );
        const card = await payments.card();
        document.getElementById("card-container")!.innerHTML = "";
        await card.attach("#card-container");
        setCardInstance(card);
      } catch (err) {
        console.error("Square card init error:", err);
      }
    }

    initializeSquare();
  }, []);

  const handleGenerateNonce = async () => {
    if (!cardInstance) return alert("Payment form not ready yet");
    try {
      const result = await cardInstance.tokenize();
      if (result.status === "OK") return result.token;
      alert(
        "Payment info invalid: " +
          (result.errors?.map((e: any) => e.message).join(", ") || "")
      );
      return null;
    } catch (err) {
      console.error("Tokenization error:", err);
      return null;
    }
  };

  const handlePayment = async () => {
    const nonce = await handleGenerateNonce();
    if (!nonce) return alert("Could not get payment info");

    try {
      setLoading(true);

      const response = await processPayment({
        nonce,
        amount: total,
        items: orderItems.map((item) => ({
          name:
            typeof item.product === "string"
              ? item.product
              : typeof item.product === "object" && "name" in item.product
                ? (item.product as { name: string }).name
                : "Unknown Product",
          price: item.price,
          quantity: item.quantity,
        })),
        address: shippingInfo,
      });

      const payment = (response as { payment: any }).payment;
      console.log("Payment response data:", payment);

      if (payment.status === "COMPLETED") {
        await onSuccess(payment);
      } else {
        setMessage("Payment failed: " + payment.error);
      }
    } catch (err) {
      console.error("Payment error:", err);
      setMessage("Payment could not be processed");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const onSuccess = async (payment: any) => {
    setMessage("Payment successful!");

    try {
      await createOrder.mutateAsync({
        id: "pending id",
        items: orderItems,
        total,
        status: OrderStatuses.PAID,
        createdAt: new Date(),
        updatedAt: new Date(),
        transaction: {
          method: PaymentMethods.SQUARE,
          amount: payment.amountMoney.amount,
          currency: payment.amountMoney.currency,
          status: TransactionStatuses.PAID,
        },
        shippingInfo,
      });
    } catch (err: any) {
      console.error("Order creation failed:", err);
      setMessage("Order could not be saved");
    }
  };

  return (
    <div className="payment-form max-w-2xl mx-auto p-lg bg-surface rounded-lg shadow-xl flex flex-col gap-md text-text font-sans">
      <h3 className="text-3xl mb-lg text-center font-bold">
        {total > 0 ? "Payment" : ""}
      </h3>
      <p className="text-lg font-semibold text-textSecondary text-right md:text-left">
        Total: ${total.toFixed(2)}
      </p>

      <div
        id="card-container"
        className="w-full h-52 mb-md border border-border rounded-md bg-background"
      ></div>

      <Button
        onClick={handlePayment}
        className="w-full"
        disabled={!cardInstance}
      >
        Pay Now
      </Button>
    </div>
  );
}
