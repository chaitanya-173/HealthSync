import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function MacroChart({ data }) {
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
        <p className="text-xs text-[var(--text-muted)] mb-2">
          {item.fullDate}
        </p>

        <div className="space-y-1 text-sm">
          <p style={{ color: "#F59E0B" }}>
            Carbs: {item.carbs}g
          </p>

          <p style={{ color: "#22C55E" }}>
            Protein: {item.protein}g
          </p>

          <p style={{ color: "#A855F7" }}>
            Fat: {item.fat}g
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[var(--surface)] rounded-lg p-5 h-[290px]">
      <div className="mb-4">
        <h3 className="font-semibold">
          Macro Breakdown
        </h3>

        <p className="text-xs text-[var(--text-muted)] mt-1">
          Daily carbs, protein and fat intake
        </p>
      </div>

      <ResponsiveContainer width="100%" height="72%">
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <CartesianGrid
            stroke="rgba(255,255,255,0.05)"
            vertical={false}
          />

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
              fill: "rgba(255,255,255,0.03)",
            }}
          />

          <Bar
            dataKey="carbs"
            stackId="a"
            fill="#F59E0B"
            radius={[4, 4, 0, 0]}
          />

          <Bar
            dataKey="protein"
            stackId="a"
            fill="#22C55E"
          />

          <Bar
            dataKey="fat"
            stackId="a"
            fill="#A855F7"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="flex items-center justify-center gap-5 mt-2 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-[#F59E0B]" />
          <span>Carbs</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-[#22C55E]" />
          <span>Protein</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-[#A855F7]" />
          <span>Fat</span>
        </div>
      </div>
    </div>
  );
}