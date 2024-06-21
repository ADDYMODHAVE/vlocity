// server/routes/pollRoutes.js
const express = require("express");
const { createPoll, getPolls, votePoll, addComment, getPoll } = require("../controllers/pollController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, createPoll);
router.get("/", getPolls);
router.get("/:pollId", getPoll);
router.post("/:pollId/vote/:optionId", protect, votePoll);
router.post("/:pollId/comments", protect, addComment);

module.exports = router;
