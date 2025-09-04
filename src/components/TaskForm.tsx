import { useState } from "react";

interface TaskFormProps {
    onAdd: (title: string) => void;
}

export function TaskForm({ onAdd }: TaskFormProps) {
    const [newTask, setNewTask] = useState("");

    const handleSubmit = () => {
        if (newTask.trim()) {
            onAdd(newTask);
            setNewTask("");
        }
    };

    return (
        <div className="input-group">
            <input
                type="text"
                className="task-input"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Digite uma nova tarefa..."
            />
            <button onClick={handleSubmit} className="add-button">
                Adicionar
            </button>
        </div>
    );
}