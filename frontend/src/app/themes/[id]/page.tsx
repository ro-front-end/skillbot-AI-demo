"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { QuizCard } from "@/components/QuizCard";
import { getQuizzesByTheme, getThemes } from "@/services/api";

interface Theme {
  _id: string;
  name: string;
  icon: string;
}

interface Quiz {
  _id: string;
  title: string;
  description: string;
  difficulty: string;
  totalQuestions: number;
}

export default function ThemesPage() {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const themeId = params.id as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const themes = await getThemes();
        const selectedTheme = themes.find((t: Theme) => t._id === themeId);
        if (selectedTheme) {
          setTheme(selectedTheme);
          const quizzesData = await getQuizzesByTheme(themeId);
          setQuizzes(quizzesData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [themeId]);

  const handleQuizClick = (quizId: string) => {
    router.push(`/quiz/${quizId}`);
  };

  return (
    <main className="min-h-screen bg-gradient-dark">
      <Header />

      <div className="pt-32 pb-12 px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-7xl mx-auto"
        >
          <button
            onClick={() => router.back()}
            className="mb-8 px-4 py-2 bg-purple/20 border border-purple border-opacity-50 rounded-lg hover:bg-purple/30 transition-colors flex items-center space-x-2"
          >
            <span>←</span>
            <span>Back to Themes</span>
          </button>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-12 h-12 border-4 border-purple border-t-purple-light rounded-full"
              />
            </div>
          ) : theme ? (
            <>
              <div className="mb-12">
                <div className="text-6xl mb-4">{theme.icon}</div>
                <h1 className="text-5xl font-bold mb-2 gradient-text">
                  {theme.name}
                </h1>
                <p className="text-gray-400 text-lg">
                  {quizzes.length} quizzes available
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {quizzes.map((quiz) => (
                  <motion.div
                    key={quiz._id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    <QuizCard
                      quiz={quiz}
                      onClick={() => handleQuizClick(quiz._id)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </>
          ) : (
            <div className="text-center text-gray-400">Theme not found</div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
