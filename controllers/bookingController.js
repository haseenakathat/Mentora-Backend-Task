const Booking = require("../models/Booking");
const Student = require("../models/Student");

exports.createBooking = async (req, res) => {
  try {
    if (req.user.role !== "parent") {
      return res.status(403).json({ message: "Only parents can book" });
    }

    const { studentId, lessonId } = req.body;

    const student = await Student.findById(studentId);
    if (!student || student.parentId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Student not found or not yours" });
    }

    const booking = await Booking.create({
      studentId,
      lessonId
    });

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};