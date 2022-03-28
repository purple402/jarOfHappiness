import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKOTaYFavnsmOoQ2SnhwZezPlK6i4OVC8",
  authDomain: "jar-of-happiness-24abd.firebaseapp.com",
  projectId: "jar-of-happiness-24abd",
  storageBucket: "jar-of-happiness-24abd.appspot.com",
  messagingSenderId: "144008940645",
  appId: "1:144008940645:web:8db24083e2e8544dc48a8c",
  measurementId: "G-9BYWE4E31X",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const DB = getFirestore(app);

async function login(email, password) {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    console.log("firebase login", error.message);
  }
}

async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    console.log("firebase logout", error.message);
  }
}

export { login, logout };
