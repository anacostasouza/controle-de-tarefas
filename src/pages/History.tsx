import { useHistory } from "../hooks/useHistory";
import { HistoryChart } from "../components/HistoryChart";
import type { User } from "firebase/auth";

interface HistoryProps {
  user: User | null;
}

export function History({ user }: HistoryProps) {
  const { tasks, chartData, loading } = useHistory(user?.uid || "");

  if (loading) return <p>Carregando histórico...</p>;

  return (
    <div className="container">
      <h1>Histórico de Tarefas</h1>

      <HistoryChart chartData={chartData} />

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.status} ({task.category})
          </li>
        ))}
      </ul>
    </div>
  );
}
