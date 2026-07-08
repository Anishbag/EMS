import express from "express";

import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getDepartments
}
from "../controllers/employeeController.js";

import protect from "../middleware/authMiddleware.js";

import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("admin"),
  createEmployee
);

router.get(
  "/",
  protect,
  authorize("admin"),
  getEmployees
);


router.get(
  "/departments",
  protect,
  authorize("admin"),
  getDepartments
);


router.get(
  "/:id",
  protect,
  authorize("admin"),
  getEmployeeById
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateEmployee
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteEmployee
);




export default router;