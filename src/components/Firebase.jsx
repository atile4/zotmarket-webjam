import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyBVEm25iPBkBoq1JxkkPfzWmYLfhe3K0s0",
  authDomain: "zotmarket-3e777.firebaseapp.com",
  projectId: "zotmarket-3e777",
  storageBucket: "zotmarket-3e777.appspot.com",
  messagingSenderId: "445300335827",
  appId: "1:445300335827:web:780cfc83959955c7622026",
  measurementId: "G-6H0NRZD95K",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
