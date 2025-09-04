import { useState, useEffect } from "react";
import {
  listTasks,
  addTask,
  updateTask,
  markTaskDeleted,
} from "../api/firestore";
import type { Task, TaskPriority } from "../types/task";
import { serverTimestamp } from "firebase/firestore";

export function useTasks(userId: string) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!userId) return;

    const fetchTasks = async () => {
      try {
        const allTasks = await listTasks(userId);
        setTasks(allTasks);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();
  }, [userId]);

  const addTaskHandler = async (
    title: string,
    category = "Geral",
    priority: TaskPriority = "medium"
  ) => {
    await addTask(title, userId, category, priority);
    const allTasks = await listTasks(userId);
    setTasks(allTasks);
  };

  const completeTaskHandler = async (taskId: string) => {
    await updateTask(taskId, {
      status: "completed",
      completedAt: serverTimestamp(),
    });
    const allTasks = await listTasks(userId);
    setTasks(allTasks);
  };

  const deleteTaskHandler = async (taskId: string) => {
    await markTaskDeleted(taskId);
    const allTasks = await listTasks(userId);
    setTasks(allTasks);
  };

  return {
    tasks,
    addTask: addTaskHandler,
    completeTask: completeTaskHandler,
    deleteTask: deleteTaskHandler,
  };
}
