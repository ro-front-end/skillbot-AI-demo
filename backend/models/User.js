const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    badges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Theme",
      },
    ],
    trophies: [
      {
        title: String,
        date: Date,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
