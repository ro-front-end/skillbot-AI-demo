"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";

interface Answer {
  questionId: string;
  selectedOption: string;
  isCorrect: boolean;
}

interface ResultData {
  _id: string;
  playerName: string;
  score: number;
  totalQuestions: number;
  answers: Answer[];
  timeTaken: number;
  passed: boolean;
}

export default function ResultsPage() {
  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const resultId = params.id as string;

  useEffect(() => {
    const fetchResult = async () => {
      try {
        // Try localStorage first (fast after submit)
        const savedResult = localStorage.getItem(`result-${resultId}`);
        if (savedResult) {
          setResult(JSON.parse(savedResult));
          setLoading(false);
          return;
        }

        // Otherwise fetch from API
        const data = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/scores/${resultId}`
        );
        if (data.ok) {
          setResult(await data.json());
        } else {
          console.warn("Result not found on API");
        }
      } catch (error) {
        console.error("Error fetching result:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [resultId]);

  const handleBackHome = () => {
    router.push("/");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple border-t-purple-light rounded-full animate-spin" />
      </main>
    );
  }

  // For demo purposes, create a sample result
  const demoResult: ResultData = {
    _id: resultId,
    playerName: "Player",
    score: 85,
    totalQuestions: 10,
    answers: [],
    timeTaken: 180,
    passed: true,
  };

  const displayResult = result || demoResult;
  const minutes = Math.floor(displayResult.timeTaken / 60);
  const seconds = displayResult.timeTaken % 60;

  return (
    <main className="min-h-screen bg-gradient-dark">
      <Header />

      <div className="pt-32 pb-12 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-darker border border-purple border-opacity-30 rounded-lg p-8 text-center">
            <div className="mb-8">
              {displayResult.passed ? (
                <div className="text-6xl mb-4 inline-block">🎉</div>
              ) : (
                <div className="text-6xl mb-4">📚</div>
              )}
            </div>

            <h1 className="text-4xl font-bold mb-2 gradient-text">
              {displayResult.passed ? "Congratulations!" : "Good Try!"}
            </h1>

            <p className="text-gray-400 mb-8">
              {displayResult.playerName}, you completed the quiz!
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-purple/20 to-purple-light/10 border border-purple border-opacity-30 rounded-lg p-4">
                <div className="text-3xl font-bold text-purple mb-1">
                  {displayResult.score}%
                </div>
                <div className="text-xs text-gray-400">Score</div>
              </div>

              <div className="bg-gradient-to-br from-purple/20 to-purple-light/10 border border-purple border-opacity-30 rounded-lg p-4">
                <div className="text-3xl font-bold text-purple mb-1">
                  {displayResult.answers.filter((a) => a.isCorrect).length ||
                    Math.round(
                      (displayResult.score / 100) * displayResult.totalQuestions
                    )}
                  /{displayResult.totalQuestions}
                </div>
                <div className="text-xs text-gray-400">Correct</div>
              </div>

              <div className="bg-gradient-to-br from-purple/20 to-purple-light/10 border border-purple border-opacity-30 rounded-lg p-4">
                <div className="text-3xl font-bold text-purple mb-1">
                  {minutes}:{String(seconds).padStart(2, "0")}
                </div>
                <div className="text-xs text-gray-400">Time</div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleBackHome}
                className="w-full bg-gradient-to-r from-purple to-purple-light text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Try Another Quiz
              </button>

              {displayResult.passed && (
                <p className="text-green-400 text-sm">
                  ✨ You passed this quiz! Keep learning!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
