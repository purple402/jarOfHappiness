import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  query,
  getDocs,
} from "firebase/firestore";

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

async function createUser(email, password, displayName) {
  try {
    // 계정 생성
    await createUserWithEmailAndPassword(auth, email, password);
    // 별명 설정
    await updateProfile(auth.currentUser, { displayName: displayName });
    // 사용자별 문서 생성
    await createUserDoc(auth.currentUser);
    return auth.currentUser;
  } catch (error) {
    console.log("firebase createUser", error.message);
  }
}

async function createUserDoc(user) {
  try {
    const newUserColRef = collection(DB, "Happiness");
    const id = user.uid;
    const newUserDoc = {
      id,
      createdAt: Date.now(),
    };
    await setDoc(doc(newUserColRef, id), newUserDoc);
  } catch (error) {
    console.log("firebase createUserDoc", error.message);
  }
}

export { login, logout, createUser };
