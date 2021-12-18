const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const gradientScheme = Schema({
  name: {
    type: String,
    default: "unnamed",
  },
  downloads: {
    type: Number,
    default: 0,
  },
  colors: {
    start: String,
    end: String,
    direction: {
      type: String,
      default: "to bottom",
    },
  },
});

module.exports = mongoose.model("gradient", gradientScheme);