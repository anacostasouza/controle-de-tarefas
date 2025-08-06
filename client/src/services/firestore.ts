/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "./firebase";
import { collection, 
    addDoc, 
    getDocs, 
    doc, 
    deleteDoc,
    updateDoc,
    query,
    where } 
from "firebase/firestore";

export async function listTasks(userId: string) {
    const q = query(collection(db, "tasks"), where("userId", "==", userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addTask(title: string, userId: string) {
    return await addDoc(collection(db, "tasks"), {
        title,
        userId,
        status: "pending",
        createdAt: new Date().toISOString()
    });
}

export async function updateTask(id: string, data: any) {
    return await updateDoc(doc(db, "tasks", id), data);
}

export async function deleteTask(id: string) {
    return await deleteDoc(doc(db, "tasks", id));
}