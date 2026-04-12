import { Pencil, MoreVertical } from "lucide-react";

export default function LogCard({ log }) {
  const { result, createdAt, text } = log;

  const items = result?.items || [];
  const total = result?.total || {};

  return (
    <div className="
      rounded-xl p-4
      border border-[var(--border)]
      bg-[var(--surface)]/70 backdrop-blur-xl
      shadow
      space-y-3
    ">

      {/* 🔹 Original Input */}
      {text && (
        <p className="text-xs text-[var(--text-muted)] truncate">
          {text}
        </p>
      )}

      {/* 🔹 ITEMS */}
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="space-y-1">

            {/* Name */}
            <p className="font-medium text-sm">
              {item.name} ({item.quantity})
            </p>

            {/* Macros chips */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2 py-0.5 rounded-md bg-[var(--border)]">
                Calories: {item.calories}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[var(--border)]">
                Carbs: {item.carbs}g
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[var(--border)]">
                Protein: {item.protein}g
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[var(--border)]">
                Fat: {item.fat}g
              </span>
            </div>

            {/* Divider between items */}
            {i !== items.length - 1 && (
              <div className="border-t border-[var(--border)] mt-2" />
            )}
          </div>
        ))}
      </div>

      {/* 🔹 TOTAL */}
      <div className="border-t border-[var(--border)] pt-3">

        <div className="grid grid-cols-4 gap-2 text-center text-xs">

          {[
            { label: "Calories", value: total.calories },
            { label: "Carbs", value: `${total.carbs}g` },
            { label: "Protein", value: `${total.protein}g` },
            { label: "Fat", value: `${total.fat}g` },
          ].map((m, i) => (
            <div key={i}>
              <p className="text-[var(--text-muted)]">{m.label}</p>
              <p className="font-semibold text-sm">{m.value}</p>

              <div className="h-[3px] bg-[var(--border)] rounded mt-1">
                <div className="h-[3px] bg-[var(--primary)] rounded w-[40%]" />
              </div>
            </div>
          ))}

        </div>

      </div>

      {/* 🔹 FOOTER */}
      <div className="flex items-center justify-between pt-1">

        <span className="text-xs text-[var(--text-muted)]">
          {new Date(createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>

        <div className="flex items-center gap-2">
          <Pencil size={14} className="cursor-pointer hover:text-[var(--primary)]" />
          <MoreVertical size={14} className="cursor-pointer hover:text-[var(--primary)]" />
        </div>

      </div>

    </div>
  );
}