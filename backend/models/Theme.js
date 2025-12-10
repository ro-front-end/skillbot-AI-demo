const mongoose = require("mongoose");

const themeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: "🎮",
    },
    color: {
      type: String,
      default: "#a855f7",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Theme", themeSchema);
