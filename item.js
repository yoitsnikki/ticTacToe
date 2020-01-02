// define variables
let mongoose = require("mongoose");
let validator = require("validator");

// how to make the schema for the program
let itemSchema = new mongoose.Schema({
  game: Number,
  squares: Array,
  xIsNext: Boolean,
});

module.exports = mongoose.model("Item", itemSchema);
