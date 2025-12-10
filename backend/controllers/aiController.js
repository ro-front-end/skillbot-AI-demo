const Theme = require("../models/Theme");
const Quiz = require("../models/Quiz");

// Simple, deterministic "AI" learning plan generator based on theme and block
exports.generateLearningPlan = async (req, res) => {
  try {
    const { quizId, themeId, block } = req.query;

    let theme = null;
    if (themeId) theme = await Theme.findById(themeId).lean();
    if (!theme && quizId) {
      const quiz = await Quiz.findById(quizId).lean();
      if (quiz && quiz.themeId)
        theme = await Theme.findById(quiz.themeId).lean();
    }

    const themeName = theme ? theme.name : "General Topic";
    const level = block || "beginner";

    const resources = [
      {
        title: `${themeName} — Beginner Tutorial Search`,
        url: `https://www.google.com/search?q=${encodeURIComponent(
          themeName + " " + level + " tutorial"
        )}`,
        type: "search",
      },
      {
        title: `freeCodeCamp: ${themeName} resources`,
        url: `https://www.freecodecamp.org/search?query=${encodeURIComponent(
          themeName
        )}`,
        type: "course",
      },
      {
        title: `YouTube: ${themeName} tutorials`,
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent(
          themeName + " tutorial"
        )}`,
        type: "video",
      },
    ];

    // Simple question templates per block
    const practiceQuestions = [];
    if (level === "beginner") {
      practiceQuestions.push(
        {
          question: `What is ${themeName} primarily about?`,
          choices: [
            "A concept",
            "An unrelated topic",
            "A type of food",
            "A movie",
          ],
          answer: "A concept",
          explanation: `At a high level, ${themeName} covers foundational concepts.`,
        },
        {
          question: `Where is a good place to start learning ${themeName}?`,
          choices: [
            "Beginner tutorials",
            "Advanced research papers",
            "Random forums",
            "Old textbooks",
          ],
          answer: "Beginner tutorials",
          explanation:
            "Start with structured beginner tutorials to build fundamentals.",
        },
        {
          question: `Which resource type helps most for hands-on practice?`,
          choices: [
            "Interactive tutorials",
            "Theoretical books",
            "Podcasts",
            "Movies",
          ],
          answer: "Interactive tutorials",
          explanation:
            "Interactive tutorials and exercises reinforce learning.",
        }
      );
    } else if (level === "intermediate") {
      practiceQuestions.push(
        {
          question: `Which topic in ${themeName} is typically intermediate-level?`,
          choices: [
            "Applied techniques",
            "Basic definitions",
            "Introductory greetings",
            "None of the above",
          ],
          answer: "Applied techniques",
          explanation:
            "Intermediate learning focuses on applied techniques and patterns.",
        },
        {
          question: `What helps progress from beginner to intermediate in ${themeName}?`,
          choices: [
            "Project-based practice",
            "Watching movies",
            "Memorizing slogans",
            "Skipping steps",
          ],
          answer: "Project-based practice",
          explanation:
            "Building small projects consolidates intermediate knowledge.",
        }
      );
    } else {
      practiceQuestions.push({
        question: `Expert-level work in ${themeName} often requires:`,
        choices: [
          "Deep problem solving",
          "Casual reading",
          "Daily gossip",
          "Simple quizzes",
        ],
        answer: "Deep problem solving",
        explanation:
          "Expertise requires deep problem solving and specialization.",
      });
    }

    res.json({ theme: themeName, level, resources, practiceQuestions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
