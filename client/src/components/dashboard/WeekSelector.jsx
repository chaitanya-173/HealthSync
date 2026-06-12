import { useMemo } from "react";
import { useDashboard } from "../../context/DashboardContext";

const days = ["M", "T", "W", "T", "F", "S", "S"];

const getStartOfWeek = (date) => {
  const start = new Date(date);
  const day = start.getDay();
  const diff = day === 0 ? -6 : 1 - day;

  start.setDate(start.getDate() + diff);
  start.setHours(0, 0, 0, 0);

  return start;
};

export default function WeekSelector() {
  const { selectedDate, setSelectedDate } = useDashboard();

  const weekDays = useMemo(() => {
    const temp = [];

    const start = getStartOfWeek(selectedDate);

    for (let i = 0; i < 7; i++) {
      const d = new Date(start);

      d.setDate(start.getDate() + i);

      temp.push({
        date: d,
        day: days[i],
        dayNum: d.getDate(),
      });
    }

    return temp;
  }, [selectedDate]);

  const isSameDay = (d1, d2) => d1.toDateString() === d2.toDateString();

  const isFutureDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return date > today;
  };

  return (
    <div
      className="
        flex items-center justify-between
        px-4 py-3
        rounded-lg
        bg-[var(--surface)]
      "
    >
      {weekDays.map((d, index) => {
        const selected = isSameDay(d.date, selectedDate);

        return (
          <button
            key={index}
            disabled={isFutureDate(d.date)}
            onClick={() => setSelectedDate(d.date)}
            className="
              flex flex-col items-center
              gap-1.5
              disabled:opacity-30 disabled:cursor-not-allowed
            "
          >
            <span className="text-xs text-[var(--text-muted)]">{d.day}</span>

            <div
              className={`
                w-9 h-9
                rounded-full
                flex items-center justify-center
                text-sm font-semibold
                transition-all duration-200

                ${
                  selected
                    ? "bg-[var(--primary)] text-white"
                    : "bg-[var(--surface-alt)] text-[var(--text)]"
                }
              `}
            >
              {d.dayNum}
            </div>
          </button>
        );
      })}
    </div>
  );
}
