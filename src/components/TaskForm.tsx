import { useState, type FormEvent } from "react";
import type { TaskPriority } from "../types/task";

interface TaskFormProps {
  onAdd: (title: string, category?: string, priority?: TaskPriority) => void;
}

export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [category, setCategory] = useState("Trabalho");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, category || "Geral", priority || "medium");
    setTitle("");
    setPriority("medium");
    setCategory("Trabalho");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Digite o título da tarefa"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)}>
        <option value="low">Baixa</option>
        <option value="medium">Média</option>
        <option value="high">Alta</option>
      </select>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Trabalho">Trabalho</option>
        <option value="Pessoal">Pessoal</option>
        <option value="Estudo">Estudo</option>
        <option value="Outros">Outros</option>
      </select>

      <button type="submit" className="add-button">
        Adicionar
      </button>
    </form>
  );
}
