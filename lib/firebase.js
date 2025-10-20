import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwaRlUfiC5RhzY71r_bV1fYtf2tSjftXM",
  authDomain: "crypto-exchange-auth.firebaseapp.com",
  projectId: "crypto-exchange-auth",
  storageBucket: "crypto-exchange-auth.firebasestorage.app",
  messagingSenderId: "383079337153",
  appId: "1:383079337153:web:e15171f2d22fe45ae0d840",
  measurementId: "G-02LMY0TVNY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);