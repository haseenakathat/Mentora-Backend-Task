const express = require("express");
const router = express.Router();

const sessionController = require("../controllers/sessionController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, sessionController.createSession);

module.exports = router;
