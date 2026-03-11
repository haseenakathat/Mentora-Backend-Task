const express = require("express");
const router = express.Router();

const lessonController = require("../controllers/lessonController");
const sessionController = require("../controllers/sessionController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, lessonController.createLesson);
router.get("/", auth, lessonController.getLessons);
router.get("/:id/sessions", auth, sessionController.getLessonSessions);

module.exports = router;