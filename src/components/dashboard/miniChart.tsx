import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { week: 'Week 1', completed: 8 },
  { week: 'Week 2', completed: 12 },
  { week: 'Week 3', completed: 6 },
  { week: 'Week 4', completed: 16 },
  { week: 'Week 5', completed: 7 },
  { week: 'Week 6', completed: 10 },
];

export default function MiniChart() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm mt-6">
      <h3 className="text-gray-700 font-semibold mb-2">Tasks Completed (Last 6 Weeks)</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
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
