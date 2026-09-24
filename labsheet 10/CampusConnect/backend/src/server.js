require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");

const connectDB = require("./config/db");
const { connectRedis } =
    require("./config/redis");

const authRoutes =
    require("./routes/authRoutes");

const eventRoutes =
    require("./routes/eventRoutes");

const announcementRoutes =
    require("./routes/announcementRoutes");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
});

app.set("io", io);

app.use(helmet());

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true
    })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {

    res.json({
        message: "CampusConnect API is running"
    });
});

app.get("/api/health", (req, res) => {

    res.json({
        status: "OK",
        service: "CampusConnect Backend"
    });
});

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/events",
    eventRoutes
);

app.use(
    "/api/announcements",
    announcementRoutes
);

io.on("connection", (socket) => {

    console.log(
        "Student socket connected:",
        socket.id
    );

    socket.on("disconnect", () => {

        console.log(
            "Socket disconnected:",
            socket.id
        );
    });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {

    await connectDB();
    await connectRedis();

    server.listen(
        PORT,
        () => {

            console.log("");
            console.log(
                "================================"
            );
            console.log(
                " CampusConnect Backend Running"
            );
            console.log(
                "================================"
            );
            console.log(
                `http://localhost:${PORT}`
            );
            console.log(
                `http://localhost:${PORT}/api/health`
            );
            console.log(
                "================================"
            );
        }
    );
};

startServer();
