const express = require("express");

const authenticate =
    require("../middleware/authenticate");

const authorize =
    require("../middleware/authorize");

const {
    createAnnouncement,
    getAnnouncements
} = require("../controllers/announcementController");

const router = express.Router();

router.get(
    "/",
    authenticate,
    getAnnouncements
);

router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    createAnnouncement
);

module.exports = router;
