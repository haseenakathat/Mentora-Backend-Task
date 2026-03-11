const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, studentController.createStudent);
router.get("/", auth, studentController.getStudents);

module.exports = router;