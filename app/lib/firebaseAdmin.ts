// lib/firebaseAdmin.ts
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!process.env.FIREBASE_PROJECT_ID) {
  throw new Error("Missing FIREBASE_PROJECT_ID");
}

if (!process.env.FIREBASE_CLIENT_EMAIL) {
  throw new Error("Missing FIREBASE_CLIENT_EMAIL");
}

if (!privateKey) {
  throw new Error("Missing FIREBASE_PRIVATE_KEY");
}

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey,
    }),
  });
}

export const adminDb = getFirestore();