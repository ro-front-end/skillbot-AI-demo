const express = require("express");
const router = express.Router();
const scoreController = require("../controllers/scoreController");

router.post("/submit", scoreController.submitQuiz);
router.get("/leaderboard/:quizId", scoreController.getLeaderboard);
router.get("/:id", scoreController.getResultById);

module.exports = router;
