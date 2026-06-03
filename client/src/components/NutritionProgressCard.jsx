import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function NutritionProgressCard() {
  const calories = {
    current: 1850,
    goal: 2500,
  };

  const macros = [
    {
      label: "Carbs",
      current: 180,
      goal: 190,
      color: "#F7B731",
      track: "#5B4716",
    },
    {
      label: "Protein",
      current: 150,
      goal: 150,
      color: "#00B8A3",
      track: "#103A38",
    },
    {
      label: "Fat",
      current: 45,
      goal: 70,
      color: "#EF4743",
      track: "#4A1D1D",
    },
  ];

  const totalGoal = macros[0].goal + macros[1].goal + macros[2].goal;

  const TOTAL_ARC = 345; // 265
  const START = 225;
  const GAP = 5;

  const carbsArc = (macros[0].goal / totalGoal) * TOTAL_ARC;

  const proteinArc = (macros[1].goal / totalGoal) * TOTAL_ARC;

  const fatArc = (macros[2].goal / totalGoal) * TOTAL_ARC;

  const carbsStart = START;
  const carbsEnd = carbsStart - carbsArc;

  const proteinStart = carbsEnd - GAP;
  const proteinEnd = proteinStart - proteinArc;

  const fatStart = proteinEnd - GAP;
  const fatEnd = fatStart - fatArc;

  const carbsProgress =
    Math.min(macros[0].current, macros[0].goal) / macros[0].goal;
  const proteinProgress =
    Math.min(macros[1].current, macros[1].goal) / macros[1].goal;
  const fatProgress =
    Math.min(macros[2].current, macros[2].goal) / macros[2].goal;

  const caloriesLeft = calories.goal - calories.current;

  return (
    <div
  className="
    w-full
    h-[170px]

    rounded-3xl
    border border-[var(--border)]
    bg-[var(--surface)]/70
    backdrop-blur-xl

    px-4 py-2
    flex items-center justify-between
    overflow-hidden
  "
>
      {/* CHART */}
      <div className="relative w-[180px] h-[145px] flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* CARBS TRACK */}
            <Pie
              data={[{ value: 100 }]}
              dataKey="value"
              startAngle={carbsStart}
              endAngle={carbsEnd}
              innerRadius={68}
              outerRadius={74}
              stroke="none"
              cornerRadius={50}
              isAnimationActive={false}
            >
              <Cell fill={macros[0].track} />
            </Pie>

            {/* CARBS PROGRESS */}
            <Pie
              data={[{ value: 100 }]}
              dataKey="value"
              startAngle={carbsStart}
              endAngle={carbsStart - carbsArc * carbsProgress}
              innerRadius={68}
              outerRadius={74}
              stroke="none"
              cornerRadius={50}
            >
              <Cell fill={macros[0].color} />
            </Pie>

            {/* PROTEIN TRACK */}
            <Pie
              data={[{ value: 100 }]}
              dataKey="value"
              startAngle={proteinStart}
              endAngle={proteinEnd}
              innerRadius={68}
              outerRadius={74}
              stroke="none"
              cornerRadius={50}
              isAnimationActive={false}
            >
              <Cell fill={macros[1].track} />
            </Pie>

            {/* PROTEIN PROGRESS */}
            <Pie
              data={[{ value: 100 }]}
              dataKey="value"
              startAngle={proteinStart}
              endAngle={proteinStart - proteinArc * proteinProgress}
              innerRadius={68}
              outerRadius={74}
              stroke="none"
              cornerRadius={50}
            >
              <Cell fill={macros[1].color} />
            </Pie>

            {/* FAT TRACK */}
            <Pie
              data={[{ value: 100 }]}
              dataKey="value"
              startAngle={fatStart}
              endAngle={fatEnd}
              innerRadius={68}
              outerRadius={74}
              stroke="none"
              cornerRadius={50}
              isAnimationActive={false}
            >
              <Cell fill={macros[2].track} />
            </Pie>

            {/* FAT PROGRESS */}
            <Pie
              data={[{ value: 100 }]}
              dataKey="value"
              startAngle={fatStart}
              endAngle={fatStart - fatArc * fatProgress}
              innerRadius={68}
              outerRadius={74}
              stroke="none"
              cornerRadius={50}
            >
              <Cell fill={macros[2].color} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* CENTER */}
        <div
          className="
            absolute inset-0
            flex flex-col
            items-center justify-center
          "
        >
          <h2 className="text-[32px] font-bold leading-none">
            {calories.current}
          </h2>

          <p className="text-sm text-[var(--text-muted)]">/{calories.goal}</p>

          <p className="mt-1 text-xs text-[var(--text-muted)]">Calories</p>
        </div>
      </div>

      {/* RIGHT STATS */}
      <div className="flex flex-col gap-2 w-[90px]">
        {macros.map((m) => (
          <div
            key={m.label}
            className="pl-2 border-l-2"
            style={{
              borderColor: m.color,
            }}
          >
            <p
              className="text-xs font-medium"
              style={{
                color: m.color,
              }}
            >
              {m.label}
            </p>

            <p className="text-[16px] font-semibold">
              {m.current}
              <span className="text-[var(--text-muted)] font-normal">
                /{m.goal}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
