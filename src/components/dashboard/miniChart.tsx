import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useDashboard } from '../../context/dashboardContext';

const getLast6WeeksChartData = (tasks: any[]) => {
  const now = new Date();
  const weeks: Record<string, number> = {};

  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setDate(now.getDate() - i * 7);
    const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    weeks[label] = 0;
  }

  tasks.forEach((task) => {
    if (task.status !== "completed") return;

    const label = new Date(task.updatedAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    if (weeks[label] !== undefined) {
      weeks[label]++;
    }
  });

  return Object.keys(weeks).map((week) => ({
    week,
    completed: weeks[week],
  }));
};



export default function MiniChart() {
 const { tasks } = useDashboard();
  const chartData = getLast6WeeksChartData(tasks);


  return (
    <div className="bg-white p-4 rounded-xl shadow-sm mt-6">
      <h3 className="text-gray-700 font-semibold mb-2">Tasks Completed (Last 6 Weeks)</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="week" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="completed"
              stroke="#4f46e5"
              strokeWidth={3}
              dot={{ r: 5, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
