const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const {
    registerSchema,
    loginSchema
} = require("../validators/validators");

const createAccessToken = (user) => {

    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "15m"
        }
    );
};

const createRefreshToken = (user) => {

    return jwt.sign(
        {
            id: user._id
        },
        process.env.REFRESH_SECRET,
        {
            expiresIn: "7d"
        }
    );
};

const register = async (req, res) => {

    try {

        const data = registerSchema.parse(req.body);

        const existing = await User.findOne({
            email: data.email
        });

        if (existing) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }

        const passwordHash = await bcrypt.hash(
            data.password,
            10
        );

        const user = await User.create({
            name: data.name,
            email: data.email,
            passwordHash,
            role: data.role || "STUDENT"
        });

        res.status(201).json({
            message: "Registration successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        res.status(400).json({
            message: "Invalid registration data",
            error: error.message
        });
    }
};

const login = async (req, res) => {

    try {

        const data = loginSchema.parse(req.body);

        const user = await User.findOne({
            email: data.email
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const valid = await bcrypt.compare(
            data.password,
            user.passwordHash
        );

        if (!valid) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const accessToken = createAccessToken(user);
        const refreshToken = createRefreshToken(user);

        res.cookie(
            "refreshToken",
            refreshToken,
            {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000
            }
        );

        res.json({
            message: "Login successful",
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        res.status(400).json({
            message: "Invalid login request"
        });
    }
};

const refresh = async (req, res) => {

    const token = req.cookies.refreshToken;

    if (!token) {
        return res.status(401).json({
            message: "Refresh token missing"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.REFRESH_SECRET
        );

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        const accessToken = createAccessToken(user);

        res.json({
            accessToken
        });

    } catch (error) {

        res.status(401).json({
            message: "Invalid refresh token"
        });
    }
};

module.exports = {
    register,
    login,
    refresh
};
