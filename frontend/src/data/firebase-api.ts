// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"; // 🔹 Add this


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_EsB9ybq5KUYdweDHMl9i3rPdaxfeyKk",
  authDomain: "nail-store-6a3f2.firebaseapp.com",
  projectId: "nail-store-6a3f2",
  storageBucket: "nail-store-6a3f2.firebasestorage.app",
  messagingSenderId: "543368348306",
  appId: "1:543368348306:web:1e907b86c74620bd45dc4b",
  measurementId: "G-E6PGYVMS6H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Export Firestore and Storage to use in other files
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);