import {
  Target,
  BarChart3,
  Bell,
  Droplet,
  Sun,
  Moon,
  User,
  Menu,
  LayoutDashboard,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { NavLink } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Daily Goals", icon: Target, path: "/goals" },
  { label: "Weekly Summary", icon: BarChart3, path: "/weekly" },
  { label: "Reminders", icon: Bell, path: "/reminders" },
  { label: "Water Tracker", icon: Droplet, path: "/water" },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  const { dark, toggleTheme } = useTheme();
  const [profileOpen, setProfileOpen] = useState(false);

  const navClass = ({ isActive }) =>
  `
    group relative flex items-center gap-3
    px-4 py-2.5 rounded-xl
    transition-[transform,opacity] duration-300
    ${
      isActive
        ? "bg-[var(--surface)] text-[var(--primary)]"
        : "hover:bg-[var(--surface)]"
    }
  `;

  return (
    <aside
      className={`
        fixed z-50
        top-4 left-4 bottom-4
        rounded-3xl
        border border-[var(--border)]
        bg-[var(--bg)]/70 backdrop-blur-2xl
        shadow-[0_10px_40px_rgba(0,0,0,0.25)]
        flex flex-col
        transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${collapsed ? "w-20" : "w-72"}
      `}
    >
      {/* HEADER */}
      <div className="h-16 flex items-center px-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="group relative flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-[var(--surface)] transition"
        >
          <div className="w-[18px] flex justify-center">
            <Menu size={18} />
          </div>

          {/* optional label (same behavior as others) */}
        </button>
      </div>

      {/* NAV */}
      <div className="flex flex-col gap-2 px-3 flex-1 mt-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink key={item.label} to={item.path} className={navClass}>
              <Icon size={18} className="shrink-0 ml-0.5" />

              <span
                className={`
                  text-sm font-medium whitespace-nowrap
                  ${
                    collapsed
                      ? "opacity-0 translate-x-[-10px]"
                      : "opacity-100 translate-x-0"
                  }
                `}
              >
                {item.label}
              </span>

              {collapsed && (
                <span className="absolute left-16 bg-[var(--surface)] px-2 py-1 rounded-md text-xs opacity-0 group-hover:opacity-100 transition">
                  {item.label}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* BOTTOM */}
      <div className="p-3 border-t border-[var(--border)] flex flex-col gap-2">
        {/* Theme */}
        <button
          onClick={toggleTheme}
          className="group relative flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-[var(--surface)] transition"
        >
          <div className="w-[18px] flex justify-center">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </div>

          <span
            className={`
              text-sm whitespace-nowrap
              transition-all duration-300
              ${
                collapsed
                  ? "opacity-0 translate-x-[-10px]"
                  : "opacity-100 translate-x-0"
              }
            `}
          >
            {dark ? "Light Mode" : "Dark Mode"}
          </span>

          {collapsed && (
            <span className="absolute left-16 bg-[var(--surface)] px-2 py-1 rounded-md text-xs opacity-0 group-hover:opacity-100 transition">
              {dark ? "Light Mode" : "Dark Mode"}
            </span>
          )}
        </button>

        {/* Profile */}
        <div className="group relative">
          <button
            onClick={() => setProfileOpen((prev) => !prev)}
            className="group relative flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-[var(--surface)] transition w-full"
          >
            {/* ICON FIX */}
            <div className="w-[18px] flex justify-center">
              <User size={18} />
            </div>

            <span
              className={`
                text-sm whitespace-nowrap
                transition-all duration-300
                ${
                  collapsed
                    ? "opacity-0 translate-x-[-10px]"
                    : "opacity-100 translate-x-0"
                }
              `}
            >
              Profile
            </span>

            {collapsed && (
              <span className="absolute left-16 bg-[var(--surface)] px-2 py-1 rounded-md text-xs opacity-0 group-hover:opacity-100 transition">
                Profile
              </span>
            )}
          </button>

          {/* Dropdown */}
          <ProfileDropdown
            collapsed={collapsed}
            open={profileOpen}
            setOpen={setProfileOpen}
          />
        </div>
      </div>
    </aside>
  );
}
