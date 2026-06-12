import express from "express";

import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
}
from "../controllers/employeeController.js";

import protect from "../middleware/authMiddleware.js";

import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("Admin"),
  createEmployee
);

router.get(
  "/",
  protect,
  authorize("Admin"),
  getEmployees
);

router.get(
  "/:id",
  protect,
  authorize("Admin"),
  getEmployeeById
);

router.put(
  "/:id",
  protect,
  authorize("Admin"),
  updateEmployee
);

router.delete(
  "/:id",
  protect,
  authorize("Admin"),
  deleteEmployee
);

export default router;