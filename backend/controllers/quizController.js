const Quiz = require("../models/Quiz");
const Question = require("../models/Question");

exports.getQuizzesByTheme = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ themeId: req.params.themeId });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
