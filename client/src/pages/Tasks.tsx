/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { listTasks, addTask, deleteTask } from "../services/firestore";

interface TasksProps {
  user: any; 
}

export function Tasks({ user }: TasksProps) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    if (!user) return;
    listTasks(user.uid).then(setTasks);
  }, [user]);

  const addTaskHandler = async () => {
    if (!newTask.trim()) return;
    await addTask(newTask, user.uid);
    const updatedTasks = await listTasks(user.uid);
    setTasks(updatedTasks);
    setNewTask("");
  };

  const deleteTaskHandler = async (taskId: string) => {
    await deleteTask(taskId);
    const updatedTasks = await listTasks(user.uid);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h2>Olá, {user.email}</h2>

      <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Nova tarefa"
      />
      <button onClick={addTaskHandler}>Adicionar</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => deleteTaskHandler(task.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
