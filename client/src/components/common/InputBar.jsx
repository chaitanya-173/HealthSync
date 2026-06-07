import { Mic, Plus, Save } from "lucide-react";

export default function InputBar() {
  return (
    <div className="fixed bottom-6 left-[calc(50%-24px)] -translate-x-1/2 w-full max-w-2xl px-6">
      <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[var(--surface)]">
        <button className="p-2 rounded-lg hover:bg-[var(--surface-alt)] transition">
          <Plus size={18} />
        </button>

        <input
          type="text"
          placeholder="What did you eat or exercise?"
          className="flex-1 bg-transparent outline-none text-sm placeholder:text-[var(--text-muted)]"
        />

        <button className="p-2 rounded-lg hover:bg-[var(--surface-alt)] transition">
          <Mic size={18} />
        </button>

        <button className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-sm font-medium hover:opacity-90 transition">
          Save
        </button>
      </div>
    </div>
  );
}
