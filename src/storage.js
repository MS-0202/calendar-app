import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";

// ここにFirebaseコンソールでコピーしたfirebaseConfigを貼り付けてください
const firebaseConfig = {
  apiKey: "AIzaSyBxi1HrBAwZ5X1c07aJBtrD6b2lQw9FOcg",
  authDomain: "calendar-app-0202.firebaseapp.com",
  projectId: "calendar-app-0202",
  storageBucket: "calendar-app-0202.firebasestorage.app",
  messagingSenderId: "824839051792",
  appId: "1:824839051792:web:cf16e52ec4befb5ed58895",
  measurementId: "G-7L440220JW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function loadDayData(date) {
  const docRef = doc(db, "calendar", date);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}

export async function saveDayData(date, data) {
  await setDoc(doc(db, "calendar", date), data);
}

export async function resetDayData(date) {
  await deleteDoc(doc(db, "calendar", date));
}
