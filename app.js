/*
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
*/


const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./src/routes/authRoutes");
const adRoutes = require("./src/routes/adRoutes");
const userRoutes = require('./src/routes/userRoutes');
const vendorRoutes = require('./src/routes/vendorRoutes');
const errorHandler = require('./src/middleware/errorHandler');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/ads", adRoutes);
app.use("/api/users", userRoutes);
app.use("/api/vendors", vendorRoutes);


// Root Route
app.get('/', (req, res) => {
  res.status(200).send('✅ Advert Platform Backend is live!');
});

// Index Route
app.get("/api", (req, res) => {
  res.json({
    message: "✅ Advert Platform Backend is Live",
    endpoints: {
      auth: {
        register: "POST /api/auth/register",
        login: "POST /api/auth/login"
      },
      ads: {
        getAllAds: "GET /api/ads",
        getAdById: "GET /api/ads/:id",
        createAd: "POST /api/ads",
        updateAd: "PUT /api/ads/:id",
        deleteAd: "DELETE /api/ads/:id"
      }
    }
  });
});

// 404 Route
app.use((req, res) => {
  res.status(404).json({ error: "Route Not Found" });
});

// Error handler
app.use(errorHandler);

module.exports = app;