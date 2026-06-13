import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { submitFeedback } from "../../services/feedbackService";

import { User, Pencil, MessageSquare, LogOut } from "lucide-react";

export default function ProfileDropdown({ collapsed, open, setOpen }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const ref = useRef();

  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackCategory, setFeedbackCategory] = useState("experience");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  useEffect(() => {
    function handleClick(e) {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
        setFeedbackOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, [setOpen]);

  const closeDropdown = () => {
    setOpen(false);
    setFeedbackOpen(false);
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();

    if (feedbackMessage.trim().length < 5) {
      toast.error("Please write a little more feedback");
      return;
    }

    try {
      setSubmittingFeedback(true);

      const res = await submitFeedback({
        category: feedbackCategory,
        message: feedbackMessage.trim(),
      });

      toast.success(res.data?.message || "Feedback submitted successfully");

      setFeedbackMessage("");
      setFeedbackCategory("experience");

      closeDropdown();
    } catch (error) {
      console.log("FEEDBACK ERROR");
      console.log(error);
      console.log(error?.response);
      console.log(error?.response?.data);

      toast.error(
        error?.response?.data?.message || "Failed to submit feedback",
      );
    } finally {
      setSubmittingFeedback(false);
    }
  };

  return (
    <div ref={ref}>
      {open && (
        <div
          className={`
            absolute
            ${collapsed ? "left-16" : "left-72"}
            bottom-0 translate-y-[10px]
            w-72
            rounded-lg
            border border-[var(--border)]
            bg-[var(--surface)]
            shadow-xl
            overflow-hidden
            z-50
          `}
        >
          {/* Profile */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-[var(--border)]">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="profile"
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-[var(--surface-alt)] flex items-center justify-center">
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

          {/* Menu */}
          <div className="py-2">
            <MenuItem
              icon={<Pencil size={16} />}
              text="Edit Profile"
              onClick={() => {
                navigate("/edit-profile");
                closeDropdown();
              }}
            />

            <MenuItem
              icon={<MessageSquare size={16} />}
              text="Feedback"
              onClick={() => setFeedbackOpen((prev) => !prev)}
            />
          </div>

          {/* Feedback */}
          {feedbackOpen && (
            <form
              onSubmit={handleSubmitFeedback}
              className="border-t border-[var(--border)] p-4 space-y-3"
            >
              <select
                value={feedbackCategory}
                onChange={(e) => setFeedbackCategory(e.target.value)}
                className="
                  w-full
                  px-3 py-2
                  rounded-lg
                  bg-[var(--surface-alt)]
                  border border-[var(--border)]
                  text-sm
                  outline-none
                "
              >
                <option value="experience">Experience</option>

                <option value="bug">Bug Report</option>

                <option value="idea">Feature Idea</option>

                <option value="other">Other</option>
              </select>

              <textarea
                rows={4}
                maxLength={1000}
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                placeholder="Tell us what can be improved..."
                className="
                  w-full
                  px-3 py-2
                  rounded-lg
                  bg-[var(--surface-alt)]
                  border border-[var(--border)]
                  text-sm
                  resize-none
                  outline-none
                "
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setFeedbackOpen(false)}
                  className="
                    px-3 py-2
                    rounded-lg
                    text-sm
                    border border-[var(--border)]
                    hover:bg-[var(--surface-alt)]
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submittingFeedback}
                  className="
                    px-3 py-2
                    rounded-lg
                    text-sm
                    bg-[var(--primary)]
                    text-white
                    hover:opacity-90
                  "
                >
                  {submittingFeedback ? "Sending..." : "Send"}
                </button>
              </div>
            </form>
          )}

          <div className="border-t border-[var(--border)]" />

          {/* Logout */}
          <button
            onClick={() => {
              if (user) {
                logout();
              } else {
                navigate("/login");
              }

              closeDropdown();
            }}
            className="
              w-full
              flex items-center gap-2
              px-4 py-3
              text-sm
              text-red-500
              hover:bg-[var(--surface-alt)]
              transition
            "
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
      className="
        w-full
        flex items-center gap-3
        px-4 py-2
        text-sm
        hover:bg-[var(--surface-alt)]
        transition
      "
    >
      {icon}
      {text}
    </button>
  );
}
