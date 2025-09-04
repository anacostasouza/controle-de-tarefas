/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTasks } from "../hooks/useTasks";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";
import { useNavigate } from "react-router-dom";

interface TasksProps {
  user: any;
}

export function Tasks({ user }: TasksProps) {
  const navigate = useNavigate();
  const { tasks, addTask, completeTask, deleteTask } = useTasks(user.uid);

  return (
    <div className="container">
      <div className="header">
        <h2>Olá, {user.displayName}</h2>
        <button onClick={() => navigate('/profile')}>Perfil</button>
      </div>
      <h1>Minhas Tarefas</h1>
      <TaskForm onAdd={addTask} />
      <div className="nav-buttons">
        <button onClick={() => navigate("/historico")} className="secondary-button">Histórico</button>
      </div>
      <TaskList
        tasks={tasks}
        onComplete={completeTask}
        onDelete={deleteTask}
      />
      </div>
    );
  }