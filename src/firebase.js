// src/firebase.js
import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBxi1HrBAwZ5X1c07aJBtrD6b2lQw9FOcg",
  authDomain: "calendar-app-0202.firebaseapp.com",
  projectId: "calendar-app-0202",
  storageBucket: "calendar-app-0202.firebasestorage.app",
  messagingSenderId: "824839051792",
  appId: "1:824839051792:web:cf16e52ec4befb5ed58895",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default app;
