import express from "express";

import {
  createTask,
  getTasks,
  getMyTasks,
  updateTaskStatus,
  updateTask,
  deleteTask
}
from "../controllers/taskController.js";

import protect from "../middleware/authMiddleware.js";

import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();



router.post(
  "/",
  protect,
  authorize("Admin"),
  createTask
);

router.get(
  "/",
  protect,
  authorize("Admin"),
  getTasks
);

router.put(
  "/:id",
  protect,
  authorize("Admin"),
  updateTask
);

router.delete(
  "/:id",
  protect,
  authorize("Admin"),
  deleteTask
);


router.get(
  "/mytasks",
  protect,
  authorize("Employee"),
  getMyTasks
);

router.put(
  "/status/:id",
  protect,
  authorize("Employee"),
  updateTaskStatus
);


export default router;