/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  listTasks,
  addTask,
  markTaskDeleted,
  updateTask,
  getUserProfile,
} from "../services/firestore";

interface TasksProps {
  user: any;
}

export function Tasks({ user }: TasksProps) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTask, setNewTask] = useState("");
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [userProfile, userTasks] = await Promise.all([
          getUserProfile(user.uid),
          listTasks(user.uid)
        ]);
        setProfile(userProfile);
        setTasks(userTasks);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const addTaskHandler = async () => {
    if (!newTask.trim()) return;
    
    try {
      await addTask(newTask, user.uid);
      const updatedTasks = await listTasks(user.uid);
      setTasks(updatedTasks);
      setNewTask("");
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTaskHandler();
    }
  };

  const deleteTaskHandler = async (taskId: string) => {
    try {
      await markTaskDeleted(taskId);
      const updatedTasks = await listTasks(user.uid);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  };

  const completeTaskHandler = async (taskId: string) => {
    try {
      await updateTask(taskId, { status: "completed", completedAt: new Date() });
      const updatedTasks = await listTasks(user.uid);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Erro ao completar tarefa:", error);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h2>Olá, {profile?.name ? profile.name : user.email}</h2>
        <button onClick={() => navigate("/editar-perfil")}>
          Editar Perfil
        </button>
      </div>

      <h1>Minhas Tarefas</h1>

      <div className="input-group">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite uma nova tarefa..."
          className="task-input"
        />
        <button onClick={addTaskHandler} className="add-button">
          <span></span> Adicionar
        </button>
      </div>

      <div className="nav-buttons">
        <button onClick={() => navigate("/historico")} className="secondary">
          Ver Histórico
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <p>Nenhuma tarefa encontrada. Adicione uma nova tarefa para começar!</p>
        </div>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className={task.status === "completed" ? "completed" : ""}>
              <span className="task-text">
                {task.title} 
                <span className={`badge ${task.status === "completed" ? "badge-secondary" : "badge-primary"}`}>
                  {task.status === "completed" ? "Concluída" : "Pendente"}
                </span>
              </span>
              
              {task.status === "pending" && (
                <div className="task-actions">
                  <button 
                    onClick={() => completeTaskHandler(task.id)} 
                    className="complete-btn"
                  >
                    Concluir
                  </button>
                  <button 
                    onClick={() => deleteTaskHandler(task.id)} 
                    className="delete-btn"
                  >
                     Excluir
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}