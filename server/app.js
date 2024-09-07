const express = require("express");
const cors = require("cors");

const exerciseRoutes = require("./routes/exercise"); // Import exercise routes
const equipmentRoutes = require("./routes/equipment"); // Import equipment routes

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming JSON requests

// Use the routes
app.use("/equipments", equipmentRoutes);
app.use("/exercises", exerciseRoutes);

module.exports = app;
