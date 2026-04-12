import { Mic, Plus, Save } from "lucide-react";

export default function InputBar() {
  return (
    <div className="
      fixed bottom-6 left-1/2 -translate-x-1/2
      w-full max-w-2xl px-4
      z-50
    ">

      <div className="
        flex items-center gap-3
        px-4 py-3
        rounded-2xl
        bg-[var(--surface)]/80 backdrop-blur-xl
        border border-[var(--border)]
        shadow-xl
      ">

        {/* ➕ Add */}
        <button className="p-2 rounded-lg hover:bg-[var(--border)] transition">
          <Plus size={18} />
        </button>

        {/* 🧠 Input */}
        <input
          type="text"
          placeholder="What did you eat or exercise?"
          className="
            flex-1 bg-transparent outline-none
            text-sm
            placeholder:text-[var(--text-muted)]
          "
        />

        {/* 🎤 Voice */}
        <button className="p-2 rounded-lg hover:bg-[var(--border)] transition">
          <Mic size={18} />
        </button>

        {/* 💾 Save */}
        <button className="
          px-4 py-2 rounded-lg
          bg-[var(--primary)] text-white
          text-sm font-medium
          hover:opacity-90 transition
        ">
          Save
        </button>

      </div>
    </div>
  );
}