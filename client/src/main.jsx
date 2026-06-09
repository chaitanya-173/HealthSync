import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { DashboardProvider } from "./context/DashboardContext";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <DashboardProvider>
          <App />
        </DashboardProvider>
      </AuthProvider>
    </ThemeProvider>
  // </StrictMode>
);