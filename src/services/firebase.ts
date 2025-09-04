import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0avyaKGSMSXIbzf4mVJzeyusQtQbjMXM",
  authDomain: "controle-tarefas-3d622.firebaseapp.com",
  projectId: "controle-tarefas-3d622",
  storageBucket: "controle-tarefas-3d622.firebasestorage.app",
  messagingSenderId: "458728245662",
  appId: "1:458728245662:web:debc41cf7bcb82e836ee8f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();