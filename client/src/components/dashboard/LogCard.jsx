import { useMemo, useState } from "react";
import {
  Bookmark,
  CalendarClock,
  ChevronRight,
  MoreVertical,
  Pencil,
  Save,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";
import { useDashboard } from "../../context/DashboardContext";
import {
  deleteLog,
  updateDateTime,
  updateLog,
  updateMacros,
} from "../../services/logService";
import {
  deleteSavedEntry,
  createLogFromSavedEntry,
  saveEntry,
  updateSavedEntry,
  updateSavedMacros,
} from "../../services/savedService";

const toInputDateTime = (value) => {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

function ActionModal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-lg bg-[var(--surface)] p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">{title}</h3>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-sm text-[var(--text-muted)] hover:bg-[var(--surface-alt)]"
          >
            Close
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default function LogCard({ log, index = 0, mode = "log" }) {
  const {
    selectedDate,
    fetchLogs,
    fetchSummary,
    fetchSavedLogs,
    fetchStreak,
    formatLocalDate,
    setSelectedDate,
  } = useDashboard();
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [busy, setBusy] = useState(false);

  const { result, createdAt } = log;
  const isSaved = mode === "saved";
  const items = result?.items || [];
  const total = result?.total || {};
  const title =
    log.title ||
    items
      .slice(0, 3)
      .map((item) => item.name)
      .join(" • ") ||
    log.text ||
    "Untitled entry";

  const [entryText, setEntryText] = useState(log.text || title);
  const [macroForm, setMacroForm] = useState({
    calories: total.calories ?? 0,
    carbs: total.carbs ?? 0,
    protein: total.protein ?? 0,
    fat: total.fat ?? 0,
  });
  const [dateTime, setDateTime] = useState(toInputDateTime(createdAt));

  const refreshDashboard = async (date = selectedDate) => {
    await Promise.all([
      fetchLogs(date),
      fetchSummary(date),
      fetchSavedLogs(),
      fetchStreak(),
    ]);
  };

  const menuItems = useMemo(() => {
    if (isSaved) {
      return [
        { key: "use", label: "Use saved entry", icon: Save },
        { key: "edit", label: "Edit entry", icon: Pencil },
        { key: "macros", label: "Adjust calories and macros", icon: SlidersHorizontal },
        { key: "removeSaved", label: "Remove from saved entries", icon: Bookmark },
      ];
    }

    return [
      { key: "edit", label: "Edit entry", icon: Pencil },
      { key: "macros", label: "Adjust calories and macros", icon: SlidersHorizontal },
      { key: "date", label: "Change date and time", icon: CalendarClock },
      { key: "save", label: "Save entry", icon: Bookmark },
      { key: "delete", label: "Delete", icon: Trash2 },
    ];
  }, [isSaved]);

  const handleMenuAction = async (action) => {
    setMenuOpen(false);

    if (["edit", "macros", "date"].includes(action)) {
      setModal(action);
      return;
    }

    try {
      setBusy(true);

      if (action === "save") {
        await saveEntry(log._id);
        await fetchSavedLogs();
        toast.success("Entry saved");
      }

      if (action === "use") {
        const res = await createLogFromSavedEntry(log._id);
        const createdLog = res.data.data;

        if (createdLog?._id) {
          const now = new Date();
          const hours = String(now.getHours()).padStart(2, "0");
          const minutes = String(now.getMinutes()).padStart(2, "0");

          await updateDateTime(createdLog._id, {
            date: `${formatLocalDate(selectedDate)}T${hours}:${minutes}`,
          });
        }

        await refreshDashboard();
        toast.success("Saved entry logged");
      }

      if (action === "removeSaved") {
        await deleteSavedEntry(log._id);
        await fetchSavedLogs();
        toast.success("Removed from saved entries");
      }

      if (action === "delete") {
        const confirmed = window.confirm("Delete this log permanently?");

        if (!confirmed) return;

        await deleteLog(log._id);
        await refreshDashboard();
        toast.success("Log deleted");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Action failed");
    } finally {
      setBusy(false);
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    const nextText = entryText.trim();

    if (!nextText) return;

    try {
      setBusy(true);

      if (isSaved) {
        await updateSavedEntry(log._id, { text: nextText, title: nextText });
        await fetchSavedLogs();
      } else {
        await updateLog(log._id, { text: nextText });
        await refreshDashboard();
      }

      setModal(null);
      toast.success("Entry updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not update entry");
    } finally {
      setBusy(false);
    }
  };

  const handleMacrosSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      calories: Number(macroForm.calories),
      carbs: Number(macroForm.carbs),
      protein: Number(macroForm.protein),
      fat: Number(macroForm.fat),
    };

    try {
      setBusy(true);

      if (isSaved) {
        await updateSavedMacros(log._id, payload);
        await fetchSavedLogs();
      } else {
        await updateMacros(log._id, payload);
        await refreshDashboard();
      }

      setModal(null);
      toast.success("Macros updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not update macros");
    } finally {
      setBusy(false);
    }
  };

  const handleDateSubmit = async (event) => {
    event.preventDefault();

    try {
      setBusy(true);

      await updateDateTime(log._id, { date: dateTime });

      const nextSelectedDate = new Date(dateTime);
      setSelectedDate(nextSelectedDate);
      await refreshDashboard(nextSelectedDate);

      setModal(null);
      toast.success("Date and time updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not update date");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className={`${index % 2 === 0 ? "bg-[var(--surface-alt)]" : ""} transition-colors duration-200 hover:bg-[var(--surface-alt)]`}
    >
      <div
        onClick={() => setExpanded((value) => !value)}
        className="w-full cursor-pointer px-5 py-3 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <ChevronRight
            size={16}
            className={`shrink-0 transition-transform duration-200 ${expanded ? "rotate-90" : ""}`}
          />

          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{title}</p>

            <p className="text-[11px] text-[var(--text-muted)] mt-1">
              {new Date(createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center shrink-0 ml-auto">
          <div className="flex items-center gap-8">
            <div className="text-right w-12">
              <p className="text-sm font-semibold">{total.calories ?? 0}</p>
              <p className="text-[10px] text-[var(--text-muted)]">Calories</p>
            </div>

            <div className="text-right w-10">
              <p className="text-sm font-semibold" style={{ color: "var(--warning)" }}>
                {total.carbs ?? 0}g
              </p>
              <p className="text-[10px] text-[var(--text-muted)]">Carbs</p>
            </div>

            <div className="text-right w-10">
              <p className="text-sm font-semibold" style={{ color: "var(--primary)" }}>
                {total.protein ?? 0}g
              </p>
              <p className="text-[10px] text-[var(--text-muted)]">Protein</p>
            </div>

            <div className="text-right w-10">
              <p className="text-sm font-semibold" style={{ color: "var(--purple)" }}>
                {total.fat ?? 0}g
              </p>
              <p className="text-[10px] text-[var(--text-muted)]">Fat</p>
            </div>
          </div>

          <div className="w-px h-8 bg-[var(--border)] mx-5" />

          <div className="relative flex items-center gap-1">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setModal("edit");
              }}
              className="p-2 rounded-lg hover:bg-[var(--surface)] transition"
              title="Edit entry"
            >
              <Pencil size={14} />
            </button>

            <button
              type="button"
              disabled={busy}
              onClick={(event) => {
                event.stopPropagation();
                setMenuOpen((value) => !value);
              }}
              className="p-2 rounded-lg hover:bg-[var(--surface)] transition disabled:opacity-40"
              title="More options"
            >
              <MoreVertical size={14} />
            </button>

            {menuOpen && (
              <div
                onClick={(event) => event.stopPropagation()}
                className="absolute right-0 top-10 z-30 w-64 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2 shadow-xl"
              >
                {menuItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => handleMenuAction(item.key)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm hover:bg-[var(--surface-alt)]"
                    >
                      <Icon size={15} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {expanded && (
        <div className="px-6 pb-4">
          <div className="py-2 space-y-2">
            {items.map((item, i) => (
              <div key={`${item.name}-${i}`} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium">{item.name}</p>

                  <p className="text-xs text-[var(--text-muted)]">
                    {item.quantity}
                  </p>
                </div>

                <div className="flex gap-2 text-xs">
                  <span className="px-2 py-1 rounded-lg bg-[var(--surface-alt)]">
                    {item.calories} cal
                  </span>

                  <span
                    className="px-2 py-1 rounded-lg bg-[var(--surface-alt)]"
                    style={{ color: "var(--warning)" }}
                  >
                    C {item.carbs}g
                  </span>

                  <span
                    className="px-2 py-1 rounded-lg bg-[var(--surface-alt)]"
                    style={{ color: "var(--primary)" }}
                  >
                    P {item.protein}g
                  </span>

                  <span
                    className="px-2 py-1 rounded-lg bg-[var(--surface-alt)]"
                    style={{ color: "var(--purple)" }}
                  >
                    F {item.fat}g
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {modal === "edit" && (
        <ActionModal title="Edit Entry" onClose={() => setModal(null)}>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <textarea
              value={entryText}
              onChange={(event) => setEntryText(event.target.value)}
              rows={4}
              className="w-full resize-none rounded-lg border border-[var(--border)] bg-transparent p-3 text-sm outline-none focus:border-[var(--primary)]"
            />

            <button
              type="submit"
              disabled={busy || !entryText.trim()}
              className="w-full rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
            >
              Save Changes
            </button>
          </form>
        </ActionModal>
      )}

      {modal === "macros" && (
        <ActionModal title="Adjust Calories And Macros" onClose={() => setModal(null)}>
          <form onSubmit={handleMacrosSubmit} className="space-y-4">
            {["calories", "carbs", "protein", "fat"].map((field) => (
              <label key={field} className="block text-sm">
                <span className="mb-1 block capitalize text-[var(--text-muted)]">
                  {field}
                </span>

                <input
                  type="number"
                  min="0"
                  value={macroForm[field]}
                  onChange={(event) =>
                    setMacroForm((current) => ({
                      ...current,
                      [field]: event.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-[var(--border)] bg-transparent p-3 outline-none focus:border-[var(--primary)]"
                />
              </label>
            ))}

            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
            >
              Save Macros
            </button>
          </form>
        </ActionModal>
      )}

      {modal === "date" && (
        <ActionModal title="Change Date And Time" onClose={() => setModal(null)}>
          <form onSubmit={handleDateSubmit} className="space-y-4">
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(event) => setDateTime(event.target.value)}
              className="w-full rounded-lg border border-[var(--border)] bg-transparent p-3 outline-none focus:border-[var(--primary)]"
            />

            <button
              type="submit"
              disabled={busy || !dateTime}
              className="w-full rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
            >
              Save Date And Time
            </button>
          </form>
        </ActionModal>
      )}
    </div>
  );
}
