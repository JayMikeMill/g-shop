import { FirebaseAuthAdapter } from "@adapters/auth/firebase-auth-adapter";
import { FirebaseDBAdapter } from "@adapters/db/firebase-db-adapter";
import { SquarePaymentAdapter } from "@adapters/payment/square-payment-adapter";

// Create the adapter
export const auth = new FirebaseAuthAdapter();
export const db = new FirebaseDBAdapter();
export const payment = new SquarePaymentAdapter();