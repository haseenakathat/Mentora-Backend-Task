const Session = require("../models/Session");
const Lesson = require("../models/Lesson");

exports.createSession = async (req, res) => {
  try {
    if (req.user.role !== "mentor") {
      return res.status(403).json({ message: "Only mentors can create sessions" });
    }

    const { lessonId, date, topic, summary } = req.body;

    const lesson = await Lesson.findById(lessonId);
    if (!lesson || lesson.mentorId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Lesson not found or not yours" });
    }

    const session = await Session.create({
      lessonId,
      date,
      topic,
      summary
    });

    res.json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLessonSessions = async (req, res) => {
  try {
    const sessions = await Session.find({
      lessonId: req.params.id
    });

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};