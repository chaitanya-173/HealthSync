import NewSidebar from "../components/layout/NewSidebar";
import { Outlet } from "react-router-dom";

export default function NewAppLayout() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <NewSidebar />

      <main className="ml-[272px] pt-6 pr-6 pl-4">
        <Outlet />
      </main>
    </div>
  );
}