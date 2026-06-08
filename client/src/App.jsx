import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import WeeklySummary from "./pages/WeeklySummary";

import ProtectedRoute from "./components/ProtectedRoute";
import NewAppLayout from "./layouts/NewAppLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<NewAppLayout />}>
            <Route path="/" element={<Home />} />

            <Route
              path="/weekly"
              element={<WeeklySummary />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}