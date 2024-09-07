const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  name: String,
  bodyPart: String,
  equipments: [String],
  priority: Number,
  instructions: String,
  instructionVideo: String,
});

const Exercise = mongoose.model("Exercises", exerciseSchema);

module.exports = Exercise;
