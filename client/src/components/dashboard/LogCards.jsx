import { useState } from "react";
import { Bookmark, NotebookPen } from "lucide-react";
import LogCard from "./LogCard";

function EmptyState({ title, description }) {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center rounded-lg border border-dashed border-[var(--border)] px-6 text-center">
      <p className="font-semibold">{title}</p>
      <p className="mt-2 max-w-sm text-sm text-[var(--text-muted)]">
        {description}
      </p>
    </div>
  );
}

export default function LogCards({ logs, savedLogs }) {
  const [activeTab, setActiveTab] = useState("logs");

  return (
    <div className="bg-[var(--surface)] rounded-lg h-full overflow-y-auto no-scrollbar px-5 pb-5">
      {/* Tabs */}
      <div className="pt-5 pb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("logs")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
              ${
                activeTab === "logs"
                  ? "bg-[var(--surface-alt)] text-[var(--text)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text)]"
              }
            `}
          >
            <NotebookPen size={15} />
            Logged
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
              ${
                activeTab === "saved"
                  ? "bg-[var(--surface-alt)] text-[var(--text)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text)]"
              }
            `}
          >
            <Bookmark size={15} />
            Saved
          </button>
        </div>
      </div>

      {/* Logged Meals */}
      {activeTab === "logs" && (
        <div>
          {logs.length === 0 ? (
            <EmptyState
              title="No entries logged for this day."
              description="Start by logging your first meal."
            />
          ) : (
            logs.map((log, index) => (
              <div
                key={log._id || index}
                className="rounded-lg bg-[var(--surface)]"
              >
                <LogCard log={log} index={index} mode="log" />
              </div>
            ))
          )}
        </div>
      )}

      {/* Saved Meals */}
      {activeTab === "saved" && (
        <div>
          {savedLogs.length === 0 ? (
            <EmptyState
              title="No saved entries yet."
              description="Save meals you use often and they will appear here."
            />
          ) : (
            savedLogs.map((log, index) => (
              <div
                key={log._id || index}
                className="rounded-lg bg-[var(--surface)]"
              >
                <LogCard log={log} index={index} mode="saved" />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
