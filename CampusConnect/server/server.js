import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

import rateLimiter from "./middleware/rateLimiter.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL
  })
);

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

app.use(rateLimiter);

app.get("/", (req, res) => {
  res.json({
    message: "CampusConnect API is running"
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
  "/api/resources",
  resourceRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(errorMiddleware);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `CampusConnect server running on port ${PORT}`
  );
});