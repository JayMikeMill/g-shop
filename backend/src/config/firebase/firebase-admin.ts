// src/firebaseAdmin.ts
import admin from "firebase-admin";
import path from "path";

// Path to your service account key
const serviceAccount = path.resolve(__dirname, "./config/NailStoreFirebaseServiceAccount.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	
	// only needed for Realtime DB
	//databaseURL: "https://nail-store-6a3f2.firebaseio.com",
});

// Export auth, db, etc. for other files
export const auth = admin.auth();      // for authentication
export const db = admin.firestore();   // Firestore database
//export const rtdb = admin.database();  // Realtime Database (optional)
export default admin;
