import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDU8VTQGs1ohATOfvxwuKltW1YneS5bQvs",
  authDomain: "summarist-vercel-app.firebaseapp.com",
  projectId: "summarist-vercel-app",
  storageBucket: "summarist-vercel-app.firebasestorage.app",
  messagingSenderId: "367301279701",
  appId: "1:367301279701:web:993f8d62c5e76a5f1b875c",
};

// Initialize Firebase (Prevents "app already exists" errors during development)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); // For your database later!