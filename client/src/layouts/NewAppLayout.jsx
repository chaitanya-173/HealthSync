import NewSidebar from "../components/NewSidebar";
import { Outlet } from "react-router-dom";

export default function NewAppLayout() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <NewSidebar />

      <main className="ml-[272px] mr-[288px] p-6">
        <Outlet />
      </main>

      <aside
        className="
          fixed top-6 right-6 bottom-6
          w-64
          rounded-lg
          bg-[var(--surface)]
          p-5
        "
      >
        <p className="text-sm text-[var(--text-muted)]">
          Right Panel
        </p>
      </aside>
    </div>
  );
}