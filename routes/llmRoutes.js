const express = require("express");
const router = express.Router();

const llmController = require("../controllers/llmController");
const limiter = require("../middleware/rateLimiter");

router.post("/summarize", limiter, llmController.summarize);

module.exports = router;