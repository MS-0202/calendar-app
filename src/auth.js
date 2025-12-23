import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBxi1HrBAwZ5X1c07aJBtrD6b2lQw9FOcg",
  authDomain: "calendar-app-0202.firebaseapp.com",
  projectId: "calendar-app-0202",
  storageBucket: "calendar-app-0202.firebasestorage.app",
  messagingSenderId:"824839051792",
  appId: "1:824839051792:web:cf16e52ec4befb5ed58895"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export function login() {
  return signInWithPopup(auth, provider);
}

export function logout() {
  return signOut(auth);
}

export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}
