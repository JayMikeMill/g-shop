// src/firebaseAdmin.ts
import admin from "firebase-admin";
import path from "path";

// Path to your service account key
const serviceAccount = path.resolve(__dirname, "./serviceAccountKey.json");

let initalized = false;
export function initializeFirebase() {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),

      // only needed for Realtime DB
      //databaseURL: "https://nail-store-6a3f2.firebaseio.com",
    });
    console.log("🔥 Firebase initialized!");
    initalized = true;
  }
}

export function useFirebase() {
  if (!initalized) {
    initializeFirebase();
  }
  return { admin, auth: admin.auth(), db: admin.firestore() };
}
