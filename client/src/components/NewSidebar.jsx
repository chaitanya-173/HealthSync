import {
  Target,
  BarChart3,
  Bell,
  Droplet,
  Sun,
  Moon,
  User,
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

export default function NewSidebar() {
  const { dark, toggleTheme } = useTheme();
  const [profileOpen, setProfileOpen] = useState(false);

  const navClass = ({ isActive }) =>
    `
      flex items-center gap-3
      px-4 py-3 rounded-xl
      transition
      ${
        isActive
          ? "bg-[var(--surface)] text-[var(--primary)]"
          : "hover:bg-[var(--surface)]"
      }
    `;

  return (
    <aside
      className="
        fixed z-50
        top-4 left-4 bottom-4
        w-60
        rounded-3xl
        border border-[var(--border)]
        bg-[var(--bg)]/70
        backdrop-blur-2xl
        shadow-[0_10px_40px_rgba(0,0,0,0.25)]
        flex flex-col
      "
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-6 font-bold text-lg">
        HealthSync
      </div>

      {/* NAV */}
      <div className="flex flex-col gap-2 px-3 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink key={item.label} to={item.path} className={navClass}>
              <Icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Bottom */}
      <div className="p-3 border-t border-[var(--border)] flex flex-col gap-2">
        <button
          onClick={toggleTheme}
          className="
            flex items-center gap-3
            px-4 py-3 rounded-xl
            hover:bg-[var(--surface)]
            transition
          "
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
          <span className="text-sm">{dark ? "Light Mode" : "Dark Mode"}</span>
        </button>

        <button
          onClick={() => setProfileOpen((prev) => !prev)}
          className="
            flex items-center gap-3
            px-4 py-3 rounded-xl
            hover:bg-[var(--surface)]
            transition
          "
        >
          <User size={18} />
          <span className="text-sm">Profile</span>
        </button>

        <ProfileDropdown
          collapsed={false}
          open={profileOpen}
          setOpen={setProfileOpen}
        />
      </div>
    </aside>
  );
}
