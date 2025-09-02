/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

interface HistoryProps {
  user: any;
}

export function History({ user }: HistoryProps) {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchHistory = async () => {
      const q = query(
        collection(db, "tasks"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc") // Mostra as mais recentes primeiro
      );
      const snapshot = await getDocs(q);
      const allTasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(allTasks);
    };

    fetchHistory();
  }, [user]);

  return (
    <div>
      <h2>Histórico de Tarefas</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - <strong>{task.status}</strong>
            {task.deletedAt && <span> (Excluída)</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
