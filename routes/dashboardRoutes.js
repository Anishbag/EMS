import express from "express";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

import {getAdminDashboard,getEmployeeDashboard} from "../controllers/dashboardController.js";

const router = express.Router();

router.get(
  "/admin",
  protect,
  authorize("admin"),
  getAdminDashboard
);


router.get(
  "/employee",
  protect,
  authorize("employee"),
  getEmployeeDashboard
);

export default router;