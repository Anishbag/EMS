import express from "express";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

import {
  searchEmployees,
  filterByDepartment,
  assignTaskToAll,
  deleteDepartmentEmployees
}
from "../controllers/adminToolsController.js";

const router = express.Router();

router.get(
  "/search",
  protect,
  authorize("Admin"),
  searchEmployees
);

router.get(
  "/department/:department",
  protect,
  authorize("Admin"),
  filterByDepartment
);

router.post(
  "/assign-all",
  protect,
  authorize("Admin"),
  assignTaskToAll
);

router.delete(
  "/department/:department",
  protect,
  authorize("Admin"),
  deleteDepartmentEmployees
);

export default router;