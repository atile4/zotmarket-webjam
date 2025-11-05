// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAltYHpciB4QULfyROFt52AI1D7kzMmYlw",
  authDomain: "webjam-zotmarket.firebaseapp.com",
  projectId: "webjam-zotmarket",
  storageBucket: "webjam-zotmarket.firebasestorage.app",
  messagingSenderId: "916224197139",
  appId: "1:916224197139:web:6d4f288b9b80a239f335e6",
  measurementId: "G-Q57VYL0S15"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
