import express from "express";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

import { applyLeave,getMyLeaves,getLeaves,approveLeave,rejectLeave } from "../controllers/leaveController.js";

const router = express.Router();


//-->employees der jonno ata

router.post("/",protect,authorize("Employee"),
  applyLeave
);

router.get("/my",protect,authorize("Employee"),
  getMyLeaves
);


//-->Admin ar jonno

router.get(
  "/",
  protect,
  authorize("Admin"),
  getLeaves
);

router.put(
  "/approve/:id",
  protect,
  authorize("Admin"),
  approveLeave
);

router.put(
  "/reject/:id",
  protect,
  authorize("Admin"),
  rejectLeave
);



export default router;