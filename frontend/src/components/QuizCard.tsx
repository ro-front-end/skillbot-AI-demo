"use client";

import { motion } from "framer-motion";

interface QuizCardProps {
  quiz: {
    _id: string;
    title: string;
    description: string;
    difficulty: string;
    totalQuestions: number;
  };
  onClick: () => void;
}

const difficultyColors: Record<string, string> = {
  easy: "bg-green-500/20 text-green-300 border-green-500/30",
  medium: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  hard: "bg-red-500/20 text-red-300 border-red-500/30",
};

export function QuizCard({ quiz, onClick }: QuizCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -3 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <div className="bg-darker border border-purple border-opacity-30 rounded-lg p-5 hover:border-purple hover:border-opacity-100 transition-all glow-hover">
        <h3 className="text-lg font-bold mb-2 gradient-text">{quiz.title}</h3>
        <p className="text-gray-400 text-sm mb-3">{quiz.description}</p>
        <div className="flex justify-between items-center">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded border ${
              difficultyColors[quiz.difficulty]
            }`}
          >
            {quiz.difficulty.toUpperCase()}
          </span>
          <span className="text-purple text-sm">
            {quiz.totalQuestions} questions
          </span>
        </div>
        <button className="w-full mt-4 bg-purple text-white py-2 rounded-lg font-semibold hover:bg-purple-light transition-colors">
          Start Quiz
        </button>
      </div>
    </motion.div>
  );
}
