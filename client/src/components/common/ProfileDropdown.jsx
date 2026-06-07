import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  User,
  Pencil,
  Heart,
  MapPin,
  MessageSquare,
  LogOut,
} from "lucide-react";

export default function ProfileDropdown({ collapsed, open, setOpen }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const ref = useRef();

  // ✅ FIX: use mousedown (not click)
  useEffect(() => {
    function handleClick(e) {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [setOpen]);

  return (
    <div ref={ref}>
      {open && (
        <div
          className={`
            absolute
            ${collapsed ? "left-16" : "left-72"}
            bottom-0 translate-y-[10px]
            w-64
            rounded-lg
            border border-[var(--border)]
            bg-[var(--bg)]/80 backdrop-blur-xl
            shadow-[0_10px_40px_rgba(0,0,0,0.3)]
            overflow-hidden 
          `}
        >
          {/* Profile Info */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-[var(--border)]">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="profile"
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-[var(--surface)] flex items-center justify-center">
                <User size={20} />
              </div>
            )}

            <div>
              <p className="font-medium text-sm">{user?.name || "Guest"}</p>
              <p className="text-xs text-[var(--text-muted)]">
                {user?.email || "Not logged in"}
              </p>
            </div>
          </div>

          {/* Options */}
          <div className="py-2">
            <MenuItem icon={<Pencil size={16} />} text="Edit Profile" onClick={() => navigate("/edit-profile")} />
            <MenuItem icon={<Heart size={16} />} text="Favourites" onClick={() => navigate("/favourites")} />
            <MenuItem icon={<MapPin size={16} />} text="Location" onClick={() => navigate("/edit-profile")} />
            <MenuItem icon={<MessageSquare size={16} />} text="Feedback" onClick={() => alert("Open feedback")} />
          </div>

          <div className="border-t border-[var(--border)]" />

          <button
            onClick={() => {
              if (user) logout();
              else navigate("/login");
              setOpen(false);
            }}
            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-[var(--surface)] transition"
          >
            <LogOut size={16} />
            {user ? "Logout" : "Sign In"}
          </button>
        </div>
      )}
    </div>
  );
}

function MenuItem({ icon, text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-[var(--surface)] transition"
    >
      {icon}
      {text}
    </button>
  );
}