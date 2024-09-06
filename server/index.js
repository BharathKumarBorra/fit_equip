const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // To use environment variables

const app = express();
app.use(cors()); // Enable CORS for handling cross-origin requests
app.use(express.json()); // Middleware for parsing application/json

// Database connection
const connectToDatabase = async () => {
  try {
    // Connect to MongoDB using the URI from environment variables
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Use the new URL parser for MongoDB
      useUnifiedTopology: true, // Use the new server discovery and monitoring engine
    });
    console.log("Connected to MongoDB"); // Log a message on successful connection
  } catch (err) {
    // Log an error message and exit the process if connection fails
    console.error("Could not connect to MongoDB", err);
    process.exit(1); // Exit the process with an error code
  }
};

// Define a schema and model for Exercise
const exerciseSchema = new mongoose.Schema({
  name: String, // Name of the exercise
  bodyPart: String, // The body part the exercise targets
  equipments: [String], // List of equipment needed for the exercise
  priority: Number, // Priority of the exercise
  instructions: String, // Instructions for performing the exercise
  instructionVideo: String, // URL of a video demonstrating the exercise
});

// Define a schema and model for Equipment
const equipmentSchema = new mongoose.Schema({
  name: String, // Name of the equipment
  image: String, // URL of an image representing the equipment
});

// Create models from the schemas
const Exercise = mongoose.model("Exercise", exerciseSchema);
const Equipment = mongoose.model("Equipments", equipmentSchema);

// Route to get equipments
app.get("/equipments", async (req, res) => {
  try {
    const { name } = req.query; // Extract the name query parameter

    // Build a query object to search equipment by name if a query is provided
    const query = name ? { name: { $regex: name, $options: "i" } } : {};

    // Fetch equipment from the database based on the query
    const equipments = await Equipment.find(query);

    res.send({ equipments }); // Send the equipments as response
  } catch (err) {
    // Log an error message and send a 500 status if fetching fails
    res.status(500).send("Error getting equipments");
  }
});

// Route to get exercises
app.get("/exercises", async (req, res) => {
  try {
    const { equipments, bodyPart, limit } = req.query;
    // Convert the equipments query parameter into an array
    const equipmentsArray = equipments
      ? equipments.split(",").map((e) => e.toLowerCase())
      : [];

    // Build the query for body part if it exists
    const query = {
      ...(bodyPart && { bodyPart }),
    };

    // Query the database for exercises based on the query object
    let exercises = await Exercise.find(query).sort({ priority: 1 });

    // Filter exercises where all equipments required are present in the equipmentsArray
    exercises = exercises.filter((exercise) =>
      exercise.equipments.every(
        (eq) => eq === "" || equipmentsArray.includes(eq.toLowerCase())
      )
    );

    // Send the filtered exercises as response, limited by the 'limit' query parameter
    res.send(exercises.slice(0, parseInt(limit)));
  } catch (err) {
    // Send a 500 status if fetching fails

    res.status(500).send("Error retrieving exercises");
  }
});

// Start the server
const startServer = () => {
  const PORT = process.env.PORT; // Use the port from environment variables or default to 5000
  app.listen(
    PORT,
    () => console.log(`Server running on http://localhost:${PORT}`) // Log a message when the server starts
  );
};

// Initialize the database connection and start the server
const initializeDBAndServer = async () => {
  await connectToDatabase(); // Connect to the database
  startServer(); // Start the server
};

// Execute the initialization function
initializeDBAndServer();
