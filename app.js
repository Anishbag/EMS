import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import wfhRoutes from "./routes/wfhRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import adminToolsRoutes from "./routes/adminToolsRoutes.js"

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/employees", employeeRoutes);

app.use("/api/tasks", taskRoutes);

app.use("/api/leaves", leaveRoutes);

app.use("/api/wfh", wfhRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/admin-tools",adminToolsRoutes);

export default app;

