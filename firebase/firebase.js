import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBDmU1olsmlbmRuB7W82WUoWcNb4N5EIU",
  authDomain: "authy-1fc69.firebaseapp.com",
  projectId: "authy-1fc69",
  storageBucket: "authy-1fc69.appspot.com",
  messagingSenderId: "788881852355",
  appId: "1:788881852355:web:bf2867cb63bdeac7a39f76",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, db, auth };
