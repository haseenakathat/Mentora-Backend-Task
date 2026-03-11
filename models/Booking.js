const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  },
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson"
  }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);