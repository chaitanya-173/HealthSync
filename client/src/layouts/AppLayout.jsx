// import Sidebar from "../components/Sidebar";
// import { Outlet } from "react-router-dom";
// import { useState, useEffect } from "react";

// export default function AppLayout() {
//   // load from localStorage
//   const [collapsed, setCollapsed] = useState(() => {
//     const saved = localStorage.getItem("sidebar-collapsed");
//     return saved === "true";
//   });

//   // save to localStorage
//   useEffect(() => {
//     localStorage.setItem("sidebar-collapsed", collapsed);
//   }, [collapsed]);

//   return (
//     <div className="flex min-h-screen bg-[var(--bg)] text-[var(--text)]">
//       {/* Sidebar */}
//       <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

//       {/* CENTER */}
//       <div
//         className={`
//       flex-1
//       transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
//       ${collapsed ? "ml-20" : "ml-72"}
//       mr-72
//       p-6
//     `}
//       >
//         <Outlet />
//       </div>

//       {/* RIGHT PANEL */}
//       <div
//         className="
//     fixed right-4 top-4 bottom-4
//     w-64
//     rounded-3xl
//     border border-[var(--border)]
//     bg-[var(--bg)]/70 backdrop-blur-2xl
//     shadow-[0_10px_40px_rgba(0,0,0,0.25)]
//     p-4
//   "
//       >
//         {/* Placeholder */}
//         <div className="text-sm text-[var(--text-muted)]">Right Panel</div>
//       </div>
//     </div>
//   );
// }
