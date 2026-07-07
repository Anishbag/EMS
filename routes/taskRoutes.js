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
  authorize("admin"),
  createTask
);

router.get(
  "/",
  protect,
  authorize("admin"),
  getTasks
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateTask
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteTask
);


router.get(
  "/mytasks",
  protect,
  authorize("employee"),
  getMyTasks
);

router.put(
  "/status/:id",
  protect,
  authorize("employee"),
  updateTaskStatus
);


export default router;