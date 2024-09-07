const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
  name: String,
  image: String,
});

const Equipment = mongoose.model("Equipments", equipmentSchema);

module.exports = Equipment;
