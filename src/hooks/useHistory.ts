/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { listAllTasks } from "../api/firestore";
import type { Task } from "../types/task";

export function useHistory(userId: string) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchTasks = async () => {
      setLoading(true);
      try {
        const allTasks = await listAllTasks(userId);
        setTasks(allTasks);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userId]);

  // Gera dados agregados para gráfico
  const chartData = tasks.reduce((acc: Record<string, any>, task) => {
    const cat = task.category || "Geral";
    if (!acc[cat]) acc[cat] = { category: cat, completed: 0, pending: 0 };
    if (task.status === "completed") acc[cat].completed += 1;
    else if (task.status === "pending") acc[cat].pending += 1;
    return acc;
  }, {});

  return {
    tasks,
    chartData: Object.values(chartData),
    loading,
  };
}
