const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson"
  },
  date: Date,
  topic: String,
  summary: String
}, { timestamps: true });

module.exports = mongoose.model("Session", sessionSchema);