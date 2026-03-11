const Student = require("../models/Student");

exports.createStudent = async (req, res) => {
  try {
    if (req.user.role !== "parent") {
      return res.status(403).json({ message: "Only parent allowed" });
    }

    const student = await Student.create({
      name: req.body.name,
      parentId: req.user.id
    });

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find({
      parentId: req.user.id
    });

    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};