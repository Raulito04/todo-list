
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYZOHLOppSQfrwl8Zz-qBY-ki-e_15azs",
  authDomain: "todolist-39362.firebaseapp.com",
  projectId: "todolist-39362",
  storageBucket: "todolist-39362.firebasestorage.app",
  messagingSenderId: "450205161314",
  appId: "1:450205161314:web:a6192b343ef40c22373e3b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
