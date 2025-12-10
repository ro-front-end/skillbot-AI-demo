const express = require("express");
const router = express.Router();
const aiController = require("../controllers/aiController");

// GET /api/ai/plan?quizId=...&themeId=...&block=beginner
router.get("/plan", aiController.generateLearningPlan);

module.exports = router;
