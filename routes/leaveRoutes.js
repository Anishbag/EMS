import express from "express";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

import { applyLeave,getMyLeaves,getLeaves,approveLeave,rejectLeave } from "../controllers/leaveController.js";

const router = express.Router();


//-->employees der jonno ata

router.post("/",protect,authorize("employee"),
  applyLeave
);

router.get("/my",protect,authorize("employee"),
  getMyLeaves
);


//-->Admin ar jonno

router.get(
  "/",
  protect,
  authorize("admin"),
  getLeaves
);

router.put(
  "/approve/:id",
  protect,
  authorize("admin"),
  approveLeave
);

router.put(
  "/reject/:id",
  protect,
  authorize("admin"),
  rejectLeave
);



export default router;