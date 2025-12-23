import app from "./firebase";
import { getFirestore, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";

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
