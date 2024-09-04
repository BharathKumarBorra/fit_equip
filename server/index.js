const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // To use environment variables

const app = express();
app.use(cors());
app.use(express.json()); // For parsing application/json

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Define a schema and model
const exerciseSchema = new mongoose.Schema({
  name: String,
  bodyPart: String,
  equipment: [String],
  priority: Number,
  instructions: String,
});

const equipmentSchema = new mongoose.Schema({
  name: String,
  image: String,
});

const Exercise = mongoose.model("Exercise", exerciseSchema);
const Equipment = mongoose.model("Equipments", equipmentSchema);

app.post("/equipments", async (req, res) => {
  try {
    const equipmentsData = req.body;
    const equipments = await Equipment.insertMany(equipmentsData);
    res.status(201).send(equipments);
    console.log("successfully added euqipments");
  } catch (err) {
    console.log("error: ", err);
    res.status(500).send("Error inserting equipments");
  }
});

app.get("/equipments", async (req, res) => {
  try {
    const { name } = req.query;

    // If a name query is provided, use a regex to match any equipment name that contains the query value
    const query = name ? { name: { $regex: name, $options: "i" } } : {};

    const equipments = await Equipment.find(query); // Make sure the model name is correct
    console.log("equipments: ", equipments);

    res.send({ equipments });
  } catch (err) {
    console.log("error: ", err);
    res.status(500).send("Error getting equipments");
  }
});

// POST route to insert multiple exercises
app.post("/exercises", async (req, res) => {
  try {
    const exercisesData = req.body; // Array of exercise objects from the request body
    const exercises = await Exercise.insertMany(exercisesData);
    res.status(201).send(exercises); // Send back the inserted exercises
  } catch (err) {
    console.error("Error inserting exercises", err);
    res.status(500).send("Error inserting exercises");
  }
});

// Sample route to get exercises
app.get("/exercises", async (req, res) => {
  try {
    // Extract bodyPart from query parameters and equipments from request body
    const { bodyPart } = req.query;
    const { equipments } = req.body;

    // Build query based on the provided bodyPart and equipments
    const query = {
      ...(bodyPart && { bodyPart }),
      ...(equipments && { equipment: { $all: equipments } }),
    };

    // Find exercises that match the query and sort by priority
    const exercises = await Exercise.find(query).sort({ priority: 1 });
    console.log("excercises: ", exercises);
    res.send(exercises);
  } catch (err) {
    console.log("error: ", err);
    res.status(500).send("Error retrieving exercises");
  }
});

app.get("/", async (req, res) => {
  res.send("Hello");
});

// Start the server
const PORT = process.env.PORT;
app.listen(5000, () =>
  console.log(`Server running on port http://localhost:5000`)
);

// GET route to fetch exercises based on equipment, body part, and limit
app.get("/exercises", async (req, res) => {
  try {
    const { equipments, bodyPart, limit } = req.query;

    // Split the equipment names into an array
    const equipmentArray = equipments ? equipments.split(",") : [];

    // Construct the query object
    const query = {};

    if (equipmentArray.length > 0) {
      query.equipment = { $in: equipmentArray };
    }

    if (bodyPart) {
      query.bodyPart = bodyPart;
    }

    // Fetch exercises from the database
    const exercises = await Exercise.find(query)
      .limit(parseInt(limit)) // Limit the number of results
      .exec();

    res.json({ exercises });
  } catch (error) {
    console.error("Error fetching exercises:", error);
    res.status(500).send("Error fetching exercises");
  }
});
