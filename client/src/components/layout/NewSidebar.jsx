import {
  Target,
  BarChart3,
  Droplet,
  Sun,
  Moon,
  User,
  LayoutDashboard,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { NavLink } from "react-router-dom";
import ProfileDropdown from "../common/ProfileDropdown"
import { useState } from "react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Daily Goals", icon: Target, path: "/goals" },
  { label: "Weekly Summary", icon: BarChart3, path: "/weekly" },
  { label: "Water Tracker", icon: Droplet, path: "/water" },
];

export default function NewSidebar() {
  const { dark, toggleTheme } = useTheme();
  const [profileOpen, setProfileOpen] = useState(false);

  const navClass = ({ isActive }) =>
    `
      flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
      ${
        isActive
          ? "bg-[var(--surface-alt)] text-[var(--primary)]"
          : "text-[var(--text-muted)] hover:bg-[var(--surface-alt)] hover:text-[var(--text)]"
      }
    `;

  return (
    <aside className="fixed top-6 left-6 bottom-6 w-60 rounded-lg bg-[var(--surface)] flex flex-col">
      {/* LOGO */}
      <div className="px-6 pt-6 pb-5">
        <h1 className="text-xl font-bold tracking-tight">HealthSync</h1>
      </div>

      {/* NAVIGATION */}
      <div className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink key={item.label} to={item.path} className={navClass}>
              <Icon size={18} />

              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* FOOTER */}
      <div className="p-4 space-y-2">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-muted)] hover:bg-[var(--surface-alt)] hover:text-[var(--text)] transition-all"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}

          <span className="text-sm">{dark ? "Light Mode" : "Dark Mode"}</span>
        </button>

        <button
          onClick={() => setProfileOpen((prev) => !prev)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-muted)] hover:bg-[var(--surface-alt)] hover:text-[var(--text)] transition-all"
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
