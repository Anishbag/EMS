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
  authorize("employee"),
  applyWFH
);

router.get(
  "/my",
  protect,
  authorize("employee"),
  getMyWFH
);



router.get(
  "/",
  protect,
  authorize("admin"),
  getWFHRequests
);

router.put(
  "/approve/:id",
  protect,
  authorize("admin"),
  approveWFH
);

router.put(
  "/reject/:id",
  protect,
  authorize("admin"),
  rejectWFH
);


export default router;