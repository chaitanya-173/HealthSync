import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { useDashboard } from "../../context/DashboardContext";

export default function Calendar() {
  const { selectedDate, setSelectedDate, logs, formatLocalDate } =
    useDashboard();

  const [currentMonth, setCurrentMonth] = useState(
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
  );

  const today = new Date();

  const monthName = currentMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const days = ["M", "T", "W", "T", "F", "S", "S"];

  const datesWithLogs = [
    ...new Set(logs.map((log) => formatLocalDate(new Date(log.createdAt)))),
  ];

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const totalDays = new Date(year, month + 1, 0).getDate();

    let startOffset = firstDay.getDay();
    startOffset = startOffset === 0 ? 6 : startOffset - 1;

    const arr = [];

    for (let i = 0; i < startOffset; i++) {
      arr.push(null);
    }

    for (let day = 1; day <= totalDays; day++) {
      arr.push(new Date(year, month, day));
    }

    return arr;
  }, [currentMonth]);

  const isSameDay = (d1, d2) => d1?.toDateString() === d2?.toDateString();

  const hasLogs = (date) =>
    datesWithLogs.includes(formatLocalDate(date));

  const isFutureDate = (date) => {
    const todayCopy = new Date();
    todayCopy.setHours(0, 0, 0, 0);

    return date > todayCopy;
  };

  const isCurrentMonth =
    currentMonth.getMonth() === today.getMonth() &&
    currentMonth.getFullYear() === today.getFullYear();

  return (
    <div
      className="
      w-full
      h-fit
        bg-[var(--surface)]
        rounded-lg
        p-4
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">{monthName}</h3>

        <div className="flex gap-1">
          <button
            onClick={() =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() - 1,
                  1,
                ),
              )
            }
            className="
              p-2
              rounded-lg
              hover:bg-[var(--surface-alt)]
              transition-all
            "
          >
            <ChevronLeft size={16} />
          </button>

          <button
            disabled={isCurrentMonth}
            onClick={() =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() + 1,
                  1,
                ),
              )
            }
            className="
              p-2
              rounded-lg
              hover:bg-[var(--surface-alt)]
              transition-all
              disabled:opacity-30
              disabled:cursor-not-allowed
            "
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 mb-3">
        {days.map((day) => (
          <div
            key={day}
            className="
              text-center
              text-xs
              text-[var(--text-muted)]
            "
          >
            {day}
          </div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-y-2">
        {calendarDays.map((date, idx) => {
          if (!date) {
            return <div key={idx} />;
          }

          const selected = isSameDay(date, selectedDate);

          const todayDate = isSameDay(date, today);

          const future = isFutureDate(date);

          return (
            <button
              key={idx}
              disabled={future}
              onClick={() => setSelectedDate(date)}
              className={`
                relative
                w-9 h-9
                mx-auto
                rounded-full
                flex items-center justify-center
                text-sm
                transition-all duration-200

                ${
                  future
                    ? "opacity-25 cursor-not-allowed"
                    : "hover:bg-[var(--surface-alt)]"
                }
              `}
            >
              {/* Logged Day */}
              {hasLogs(date) && !selected && !future && (
                <div
                  className="
                      absolute inset-0
                      rounded-full
                      bg-[var(--surface-alt)]
                    "
                />
              )}

              {/* Today */}
              {todayDate && !selected && !future && (
                <div
                  className="
                      absolute inset-0
                      rounded-full
                      border
                      border-[var(--primary)]
                    "
                />
              )}

              {/* Selected */}
              {selected && (
                <div
                  className="
                    absolute inset-0
                    rounded-full
                    bg-[var(--primary)]
                  "
                />
              )}

              <span className="relative z-10">{date.getDate()}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
