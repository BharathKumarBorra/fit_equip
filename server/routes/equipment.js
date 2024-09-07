const express = require("express");
const Equipments = require("../models/equipments"); // Import the Equipment model

const router = express.Router();

// Route to get equipment
router.get("/", async (req, res) => {
  try {
    const { name } = req.query;

    const query = name ? { name: { $regex: name, $options: "i" } } : {};
    const equipments = await Equipments.find(query);

    res.send({ equipments });
  } catch (err) {
    res.status(500).send("Error getting equipments");
  }
});

module.exports = router;
