import express from "express";

import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent
} from "../controllers/eventController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", getEvents);

router.get("/:id", getEventById);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createEvent
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateEvent
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteEvent
);

router.post(
  "/:id/register",
  authMiddleware,
  roleMiddleware("student"),
  registerForEvent
);

export default router;