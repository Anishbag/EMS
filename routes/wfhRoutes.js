import express from "express";

const router = express.Router();

import protect from "../middleware/authMiddleware.js";

import authorize from "../middleware/roleMiddleware.js";

import {

  applyWFH,

  getMyWFH,

  getWFHRequests,

  approveWFH,

  rejectWFH

}

from "../controllers/wfhController.js";



router.post(
  "/apply",
  protect,
  authorize("Employee"),
  applyWFH
);

router.get(
  "/my",
  protect,
  authorize("Employee"),
  getMyWFH
);



router.get(
  "/",
  protect,
  authorize("Admin"),
  getWFHRequests
);

router.put(
  "/approve/:id",
  protect,
  authorize("Admin"),
  approveWFH
);

router.put(
  "/reject/:id",
  protect,
  authorize("Admin"),
  rejectWFH
);


export default router;