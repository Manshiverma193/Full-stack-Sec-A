const express = require("express");
const rateLimit = require("express-rate-limit");

const {
    register,
    login,
    refresh
} = require("../controllers/authController");

const router = express.Router();

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        message: "Too many login attempts"
    }
});

router.post("/register", register);
router.post("/login", loginLimiter, login);
router.post("/refresh", refresh);

module.exports = router;
