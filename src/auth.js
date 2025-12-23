import app from "./firebase";
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";

// ...firebaseConfigとappはそのまま...

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// デバイスによってポップアップかリダイレクトかを自動判定
function isMobile() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

export function login() {
  if (isMobile()) {
    return signInWithRedirect(auth, provider);
  } else {
    return signInWithPopup(auth, provider);
  }
}

export function logout() {
  return signOut(auth);
}

export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}
