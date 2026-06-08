import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function CaloriesChart({ data }) {
  const chartData = data.map((d) => ({
    ...d,
    shortDate: new Date(d.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }),
    fullDate: new Date(d.date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;

    const item = payload[0].payload;

    return (
      <div
        className="
          bg-[var(--surface-alt)]
          border border-white/5
          rounded-lg
          px-4 py-3
          shadow-xl
        "
      >
        <p className="text-xs text-[var(--text-muted)] mb-1">{item.fullDate}</p>

        <p className="font-semibold text-[#22C55E]">{item.calories} Calories</p>
      </div>
    );
  };

  return (
    <div className="bg-[var(--surface)] rounded-lg p-5 h-[240px]">
      <div className="mb-4">
        <h3 className="font-semibold">Calories Trend</h3>

        <p className="text-xs text-[var(--text-muted)] mt-1">
          Daily calorie intake over the last 7 days
        </p>
      </div>

      <ResponsiveContainer width="100%" height="78%">
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />

          <XAxis
            dataKey="shortDate"
            tick={{
              fill: "#7A8A8C",
              fontSize: 12,
            }}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            domain={[0, 2500]}
            ticks={[0, 500, 1000, 1500, 2000, 2500]}
            tick={{
              fill: "#7A8A8C",
              fontSize: 12,
            }}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "#22C55E",
              strokeOpacity: 0.25,
              strokeWidth: 1,
            }}
          />

          <Line
            type="monotone"
            dataKey="calories"
            stroke="#22C55E"
            strokeWidth={3}
            dot={{
              r: 4,
              fill: "#22C55E",
              strokeWidth: 0,
            }}
            activeDot={{
              r: 7,
              fill: "#08120F",
              stroke: "#22C55E",
              strokeWidth: 3,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
