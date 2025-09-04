import type { Task } from '../types/task';
import { TaskCard } from './TaskCard';

interface TaskListProps {
    tasks: Task[];
    onComplete?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export function TaskList({ tasks, onComplete, onDelete }: TaskListProps) {

    if (tasks.length === 0) {
        return <p className="no-tasks">Nenhuma tarefa disponível.</p>;
    }
    return (
        <ul className="task-list">
            {tasks.map(task => (
                <TaskCard 
                key={task.id} 
                task={task} 
                onComplete={onComplete!} 
                onDelete={onDelete!} />
            ))}
        </ul>
    );
}