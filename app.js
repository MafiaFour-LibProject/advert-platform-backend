const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./src/routes/authRoutes");
const adRoutes = require("./src/routes/adRoutes");
const errorHandler = require('./src/middleware/errorHandler');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/ads", adRoutes);

// Error handler
app.use(errorHandler);

module.exports = app;