// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVEm25iPBkBoq1JxkkPfzWmYLfhe3K0s0",
  authDomain: "zotmarket-3e777.firebaseapp.com",
  projectId: "zotmarket-3e777",
  storageBucket: "zotmarket-3e777.firebasestorage.app",
  messagingSenderId: "445300335827",
  appId: "1:445300335827:web:780cfc83959955c7622026",
  measurementId: "G-6H0NRZD95K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
