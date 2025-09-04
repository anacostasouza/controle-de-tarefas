import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface HistoryChartProps {
  chartData: { category: string; completed: number; pending: number }[];
}

export function HistoryChart({ chartData }: HistoryChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="completed" fill="#82ca9d" />
        <Bar dataKey="pending" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
