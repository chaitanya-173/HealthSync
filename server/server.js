import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import savedRoutes from "./routes/savedRoutes.js";

import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
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

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
