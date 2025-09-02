/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "./firebase";
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  query, 
  where, 
  getDoc, 
  setDoc, 
  serverTimestamp, 
  orderBy 
} from "firebase/firestore";

/** ----------------- TAREFAS ----------------- **/

// Lista tarefas ativas (pending ou completed)
export async function listTasks(userId: string) {
  const q = query(
    collection(db, "tasks"),
    where("userId", "==", userId),
    where("status", "in", ["pending", "completed"]),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Adiciona nova tarefa
export async function addTask(title: string, userId: string) {
  return await addDoc(collection(db, "tasks"), {
    title,
    userId,
    status: "pending",
    createdAt: serverTimestamp()
  });
}

// Atualiza qualquer campo da tarefa
export async function updateTask(id: string, data: any) {
  return await updateDoc(doc(db, "tasks", id), data);
}

// Marca a tarefa como "deleted" (não remove do Firestore)
export async function markTaskDeleted(id: string) {
  return await updateDoc(doc(db, "tasks", id), {
    status: "deleted",
    deletedAt: serverTimestamp()
  });
}

/** ----------------- HISTÓRICO ----------------- **/

// Lista todas as tarefas (incluindo deleted)
export async function listAllTasks(userId: string) {
  const q = query(
    collection(db, "tasks"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

/** ----------------- PERFIL DO USUÁRIO ----------------- **/

export async function getUserProfile(userId: string) {
  const ref = doc(db, "users", userId);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

export async function setUserProfile(userId: string, data: any) {
  return await setDoc(doc(db, "users", userId), {
    ...data,
    createdAt: serverTimestamp()
  });
}

export async function updateUserProfile(userId: string, data: any) {
  return await updateDoc(doc(db, "users", userId), data);
}

export async function deleteUserProfile(userId: string) {
  return await updateDoc(doc(db, "users", userId), { status: "deleted" });
}
