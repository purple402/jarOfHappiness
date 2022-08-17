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
    console.log("firebase login", error.code);
    return error.code;
  }
}

async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    console.log("firebase logout", error.code);
    return error.code;
  }
}

async function createUser(email, password, displayName) {
  try {
    // 계정 생성
    await createUserWithEmailAndPassword(auth, email, password);
    // 별명 설정
    await updateUserDisplayName(displayName);
    // 사용자별 문서 생성
    await createUserDoc(auth.currentUser);
    // 생성 후 로그인된 계정 반환
    return auth.currentUser;
  } catch (error) {
    console.log("firebase createUser", error.code);
    return error.code;
  }
}

async function updateUserDisplayName(displayName) {
  await updateProfile(auth.currentUser, { displayName: displayName });
}

async function createUserDoc(user) {
  // 사용자 문서 생성
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

function getCurrentUser() {
  try {
    const user = auth.currentUser;
    return user;
  } catch (error) {
    console.log("firebase getCurrentUser", error.message);
  }
}

// 작성한 행복 저장하기
async function createHappiness({ text, emoji, date }) {
  // 작성 년도와 작성자 확인
  const year = date.substring(0, 4);
  const uid = auth.currentUser.uid;

  // 해당 년도의 콜렉션 없으면 생성, 있으면 무시됨
  const yearRef = await addDoc(collection(DB, "Happiness", uid, year), {});
  const newHappiness = { date, text, emoji, createdAt: Date.now() };
  await setDoc(yearRef, newHappiness);
}

async function getHappiness(year) {
  const uid = auth.currentUser.uid;
  const yearRef = collection(DB, "Happiness", uid, year);
  const querySnapshot = await getDocs(yearRef);

  let data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  // 작성한 날짜 내림차순 정렬
  data.sort((a, b) => {
    return b.createdAt - a.createdAt;
  });
  const length = data.length;
  return { data, length };
}

async function countHappiness(year) {
  // 입력받은 해에 작성된 개수 확인
  const uid = auth.currentUser.uid;
  const yearRef = collection(DB, "Happiness", uid, year);
  const querySnapshot = await getDocs(yearRef);
  let count = querySnapshot._snapshot.docChanges.length;
  return count;
}

export {
  login,
  logout,
  createUser,
  getCurrentUser,
  updateUserDisplayName,
  createHappiness,
  getHappiness,
  countHappiness,
};
