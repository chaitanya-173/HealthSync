import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AppLayout() {
  // load from localStorage
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved === "true";
  });

  // save to localStorage
  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", collapsed);
  }, [collapsed]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">

      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content */}
      <div
        className={`
          transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${collapsed ? "ml-20" : "ml-72"}
          p-6
        `}
      >
        <Outlet />
      </div>

    </div>
  );
}