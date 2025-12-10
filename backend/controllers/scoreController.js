const Score = require("../models/Score");
const Question = require("../models/Question");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Quiz = require("../models/Quiz");
const Theme = require("../models/Theme");

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

exports.submitQuiz = async (req, res) => {
  try {
    const { quizId, playerName, answers, timeTaken } = req.body;

    if (!quizId || !playerName || !answers) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Try to read userId from Authorization header if present
    let userId = null;
    try {
      const auth = req.headers.authorization;
      if (auth) {
        const parts = auth.split(" ");
        if (parts.length === 2) {
          const payload = jwt.verify(parts[1], JWT_SECRET);
          userId = payload.id;
        }
      }
    } catch (e) {
      // ignore token errors; submission continues as guest
      userId = null;
    }

    // Calculate score
    let correctAnswers = 0;
    const processedAnswers = [];

    for (const answer of answers) {
      const question = await Question.findById(answer.questionId);
      if (!question) continue;

      const correctOption = question.options.find((opt) => opt.isCorrect);
      const isCorrect =
        correctOption && correctOption.id === answer.selectedOption;

      if (isCorrect) {
        correctAnswers++;
      }

      processedAnswers.push({
        questionId: answer.questionId,
        selectedOption: answer.selectedOption,
        isCorrect,
      });
    }

    const totalQuestions = answers.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    // Use quiz.passingScore if available
    let quizObj = null;
    try {
      quizObj = await Quiz.findById(quizId).lean();
    } catch (e) {
      quizObj = null;
    }
    const passingThreshold =
      quizObj && quizObj.passingScore ? quizObj.passingScore : 70;
    const passed = score >= passingThreshold;

    const result = await Score.create({
      quizId,
      playerName,
      score,
      totalQuestions,
      answers: processedAnswers,
      timeTaken,
      passed,
    });

    // If authenticated, award badge for theme completion and a trophy if all themes completed
    if (userId) {
      try {
        const quizFull = quizObj || (await Quiz.findById(quizId).lean());
        if (quizFull && quizFull.themeId && passed) {
          const themeId = quizFull.themeId;
          const user = await User.findById(userId);
          if (user) {
            const hasBadge = user.badges.some(
              (b) => String(b) === String(themeId)
            );
            if (!hasBadge) {
              user.badges.push(themeId);
            }

            // If user now has badges for all themes, award trophy
            const allThemesCount = await Theme.countDocuments();
            if (user.badges.length >= allThemesCount) {
              user.trophies.push({
                title: "Master of All Themes",
                date: new Date(),
              });
            }

            await user.save();
          }
        }
      } catch (e) {
        console.error("Error awarding badge/trophy", e.message || e);
      }
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    const { quizId } = req.params;
    const leaderboard = await Score.find({ quizId })
      .sort({ score: -1, timeTaken: 1 })
      .limit(10)
      .lean();

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getResultById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Score.findById(id).lean();
    if (!result) return res.status(404).json({ message: "Result not found" });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
