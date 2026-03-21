import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD9qadE1xaVj1vGN8GxcReP5rUkQkNbYg4",
  authDomain: "boutiques-lycee.firebaseapp.com",
  projectId: "boutiques-lycee",
  storageBucket: "boutiques-lycee.firebasestorage.app",
  messagingSenderId: "339009074786",
  appId: "1:339009074786:web:fd617ac3b8df504b00433b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
