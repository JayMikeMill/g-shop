import { FirebaseAuthAdapter } from "@adapters/auth/firebase-auth-adapter";
import { FirebaseDBAdapter } from "@adapters/db/firebase-db-adapter";
import { SquarePaymentAdapter } from "@adapters/payment/square-payment-adapter";
import { FirebaseStorageAdapter } from "@adapters/storage/firebase-storage-adapter";
import { ImgBBStorageAdapter } from "@adapters/storage/imgbb-storage-adapter";

import dotenv from "dotenv"; 
import path from "path";

// Load environment variables
// Load backend .env even if we run from project root
// Load the .env located in the same folder as this file
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

// Create the adapters based on environment variables
export const auth = process.env.ADAPTER_AUTH 
=== "firebase" ? new FirebaseAuthAdapter() 
: new FirebaseAuthAdapter();

export const db = process.env.ADAPTER_DATABASE 
=== "firestore" ? new FirebaseDBAdapter() 
: new FirebaseDBAdapter();

export const storage = process.env.ADAPTER_STORAGE 
=== "firebase" ? new FirebaseStorageAdapter() 
: new ImgBBStorageAdapter();

export const payment = process.env.ADAPTER_PAYMENT 
=== "square" ? new SquarePaymentAdapter() 
: new SquarePaymentAdapter();
