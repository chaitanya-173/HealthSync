import NewSidebar from "../components/NewSidebar";
import { Outlet } from "react-router-dom";

export default function NewAppLayout() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <NewSidebar/>

      {/* CENTER */}
      <div className="ml-[272px] mr-72 p-6">
        <Outlet />
      </div>

      {/* RIGHT PANEL */}
      <div
        className="
          fixed right-4 top-4 bottom-4
          w-64
          rounded-3xl
          border border-[var(--border)]
          bg-[var(--bg)]/70
          backdrop-blur-2xl
          shadow-[0_10px_40px_rgba(0,0,0,0.25)]
          p-4
        "
      >
        <div className="text-sm text-[var(--text-muted)]">
          Right Panel
        </div>
      </div>
    </div>
  );
}