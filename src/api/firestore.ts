/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../services/firebase";
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
  orderBy,
} from "firebase/firestore";
import type { Task, TaskStatus, TaskPriority } from "../types/task";

/** ----------------- TAREFAS ----------------- **/

// Lista tarefas ativas (pending ou completed)
export async function listTasks(userId: string): Promise<Task[]> {
  const q = query(
    collection(db, "tasks"),
    where("userId", "==", userId),
    where("status", "in", ["pending", "completed"]),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      status: data.status as TaskStatus,
      category: data.category || "Geral",
      priority: data.priority as TaskPriority || "medium",
      createdAt: data.createdAt,
      completedAt: data.completedAt,
      deletedAt: data.deletedAt,
    } as Task;
  });
}

// Adiciona nova tarefa
export async function addTask(title: string, userId: string, category: string = "Geral", priority: TaskPriority = "medium") {
  return await addDoc(collection(db, "tasks"), {
    title,
    userId,
    status: "pending" as TaskStatus,
    category,
    priority,
    createdAt: serverTimestamp()
  });
}

// Atualiza tarefa
export async function updateTask(id: string, data: Partial<Task>) {
  return await updateDoc(doc(db, "tasks", id), data);
}

// Marca tarefa como "deleted"
export async function markTaskDeleted(id: string) {
  return await updateDoc(doc(db, "tasks", id), {
    status: "deleted",
    deletedAt: serverTimestamp()
  });
}

/** ----------------- HISTÓRICO ----------------- **/

// Lista todas as tarefas (incluindo deleted)
export async function listAllTasks(userId: string): Promise<Task[]> {
  const q = query(
    collection(db, "tasks"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  // Converte cada documento para Task
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      status: data.status,
      category: data.category || "Geral",
      priority: data.priority || "medium",
      createdAt: data.createdAt,
      completedAt: data.completedAt,
      deletedAt: data.deletedAt,
    } as Task;
  });
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
    createdAt: serverTimestamp(),
  });
}

export async function updateUserProfile(userId: string, data: any) {
  return await updateDoc(doc(db, "users", userId), data);
}

export async function deleteUserProfile(userId: string) {
  return await updateDoc(doc(db, "users", userId), { status: "deleted" });
}
