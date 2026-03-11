const Lesson = require("../models/Lesson");

exports.createLesson = async (req, res) => {
  try {
    if (req.user.role !== "mentor") {
      return res.status(403).json({ message: "Only mentor allowed" });
    }

    const lesson = await Lesson.create({
      title: req.body.title,
      description: req.body.description,
      mentorId: req.user.id
    });

    res.json(lesson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};