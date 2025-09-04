import type { Task } from '../types/task';

interface TaskCardProps {
    task: Task;
    onComplete: (id: string) => void;
    onDelete: (id: string) => void;
}

export function TaskCard({ task, onComplete, onDelete }: TaskCardProps) {
    return (
      <li className={`task-item ${task.status === "completed" ? "completed" : ""}`}>
        <div className="task-text">
          <span className="task-title">{task.title}</span>

          <div className="badges">
            <span className={`badge priority ${task.priority}`}>{task.priority}</span>
            <span className="badge category">{task.category}</span>
            <span className={`badge ${task.status === "completed" ? "badge-secondary" : "badge-primary"}`}>
              {task.status === "completed" ? "Concluída" : "Pendente"}
            </span>
          </div>
        </div>

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
