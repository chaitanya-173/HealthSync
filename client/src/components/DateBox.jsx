import { ChevronDown } from "lucide-react";

export default function DateBox({ selectedDate }) {
  const formatDisplayDate = (date) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <button
      className="
        flex items-center gap-2
        px-5 py-3   /* EXACT same as week buttons */
        rounded-2xl
        bg-[var(--surface)]/70 backdrop-blur-xl
        border border-[var(--border)]
        shadow
        hover:bg-[var(--surface)]
        transition-all duration-300
      "
    >
      <span className="text-sm font-medium">
        {formatDisplayDate(selectedDate)}
      </span>

      <ChevronDown
        size={16}
        className="text-[var(--text-muted)]"
      />
    </button>
  );
}