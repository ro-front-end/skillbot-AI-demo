const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");

router.get("/theme/:themeId", quizController.getQuizzesByTheme);
router.get("/:id", quizController.getQuizById);

module.exports = router;
