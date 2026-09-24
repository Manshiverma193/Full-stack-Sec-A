const express = require("express");

const authenticate =
    require("../middleware/authenticate");

const authorize =
    require("../middleware/authorize");

const {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    rsvpEvent
} = require("../controllers/eventController");

const router = express.Router();

router.get(
    "/",
    authenticate,
    getEvents
);

router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    createEvent
);

router.put(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    updateEvent
);

router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    deleteEvent
);

router.post(
    "/:id/rsvp",
    authenticate,
    authorize("STUDENT"),
    rsvpEvent
);

module.exports = router;
