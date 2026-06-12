import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import savedRoutes from "./routes/savedRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import waterRoutes from "./routes/waterRoutes.js";

import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const configuredOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const isAllowedDevOrigin = (origin = "") => {
  return /^http:\/\/(localhost|127\.0\.0\.1|\d{1,3}(?:\.\d{1,3}){3}):5173$/.test(origin);
};

// Middlewares
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || configuredOrigins.includes(origin) || isAllowedDevOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// Connect Database
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("HealthSync backend is running...");
});

// Routes 
app.use("/api/auth", authRoutes);
app.use("/api/log", logRoutes);
app.use("/api/saved", savedRoutes);
app.use("/api/user", userRoutes);
app.use("/api/water", waterRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
