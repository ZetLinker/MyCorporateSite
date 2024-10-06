import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions, httpsCallable } from "firebase/functions"; // functionsとhttpsCallableのインポートを追加

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAvrAGYyiWV2axDdogta-8iSTnIxymZEc",
  authDomain: "mycorporatesite-2d46f.firebaseapp.com",
  projectId: "mycorporatesite-2d46f",
  storageBucket: "mycorporatesite-2d46f.appspot.com",
  messagingSenderId: "348782816876",
  appId: "1:348782816876:web:43db622787b0cb1c887249",
  measurementId: "G-QMR73FXFFR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app, "asia-northeast1"); // functionsの初期化を追加

setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("永続化設定に失敗しました:", error);
});

export {
  auth,
  db,
  storage,
  app,
  analytics,
  signInWithEmailAndPassword,
  functions,
  httpsCallable,
};
