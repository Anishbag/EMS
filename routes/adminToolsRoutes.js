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
  authorize("admin"),
  searchEmployees
);

router.get(
  "/department/:department",
  protect,
  authorize("admin"),
  filterByDepartment
);

router.post(
  "/assign-all",
  protect,
  authorize("admin"),
  assignTaskToAll
);

router.delete(
  "/department/:department",
  protect,
  authorize("admin"),
  deleteDepartmentEmployees
);

export default router;