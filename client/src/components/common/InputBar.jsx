import { useState } from "react";
import { Mic, Plus, SendHorizontal } from "lucide-react";
import toast from "react-hot-toast";
import { createLog, updateDateTime } from "../../services/logService";
import { useDashboard } from "../../context/DashboardContext";

export default function InputBar() {
  const {
    selectedDate,
    fetchLogs,
    fetchSummary,
    fetchSavedLogs,
    fetchStreak,
    formatLocalDate,
  } = useDashboard();
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);

  const buildSelectedDateTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${formatLocalDate(selectedDate)}T${hours}:${minutes}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const prompt = text.trim();

    if (!prompt || saving) return;

    try {
      setSaving(true);

      const res = await createLog({ text: prompt });
      const createdLog = res.data.data;

      if (createdLog?._id) {
        await updateDateTime(createdLog._id, {
          date: buildSelectedDateTime(),
        });
      }

      setText("");
      await Promise.all([
        fetchLogs(selectedDate),
        fetchSummary(selectedDate),
        fetchSavedLogs(),
        fetchStreak(),
      ]);

      toast.success("Food logged");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not log food");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="w-full max-w-2xl mx-auto"
>
      <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[var(--surface)]">
        <button
          type="button"
          className="p-2 rounded-lg hover:bg-[var(--surface-alt)] transition"
        >
          <Plus size={18} />
        </button>

        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          type="text"
          placeholder="What did you eat or exercise?"
          className="flex-1 bg-transparent outline-none text-sm placeholder:text-[var(--text-muted)]"
          disabled={saving}
        />

        <button
          type="button"
          className="p-2 rounded-lg hover:bg-[var(--surface-alt)] transition"
        >
          <Mic size={18} />
        </button>

        <button
          type="submit"
          disabled={!text.trim() || saving}
          title="Log food"
          className="p-2.5 rounded-lg bg-[var(--primary)] text-white hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <SendHorizontal size={18} />
        </button>
      </div>
    </form>
  );
}
