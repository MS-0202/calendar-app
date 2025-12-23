import app from "./firebase";
import {
  getAuth,
  signInAnonymously,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

const auth = getAuth(app);

export function login() {
  // 匿名認証でログイン
  return signInAnonymously(auth);
}

export function logout() {
  return signOut(auth);
}

export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}
