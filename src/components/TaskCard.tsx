import type { Task } from '../types/task';

interface TaskCardProps {
    task: Task;
    onComplete: (id: string) => void;
    onDelete: (id: string) => void;
}

export function TaskCard({ task, onComplete, onDelete }: TaskCardProps) {
    return (
    <li className={task.status === "completed" ? "completed" : ""}>
      <span className="task-text">
        {task.title} 
        <span className={`badge ${task.status === "completed" ? "badge-secondary" : "badge-primary"}`}>
          {task.status === "completed" ? "Concluída" : "Pendente"}
        </span>
      </span> 

      {task.status === "pending" && (
        <div className='task-actions'>
          <button onClick={() => onComplete(task.id)} className="complete-button">
            Concluir
            </button>
            <button onClick={() => onDelete(task.id)} className="delete-button">
            Excluir
            </button>
        </div>
      )}
    </li>
  );
}
