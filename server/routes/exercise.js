const express = require("express");
const Exercises = require("../models/exercises"); // Import the Exercise model

const router = express.Router();

// Route to get exercises
router.get("/", async (req, res) => {
  try {
    const { equipments, bodyPart, limit } = req.query;

    const equipmentsArray = equipments
      ? equipments.split(",").map((e) => e.toLowerCase())
      : [];

    const query = {
      ...(bodyPart && { bodyPart }),
    };

    let exercises = await Exercises.find(query).sort({ priority: 1 });

    exercises = exercises.filter((exercise) =>
      exercise.equipments.every(
        (eq) => eq === "" || equipmentsArray.includes(eq.toLowerCase())
      )
    );

    res.send(exercises.slice(0, parseInt(limit)));
  } catch (err) {
    res.status(500).send("Error retrieving exercises");
  }
});

module.exports = router;
