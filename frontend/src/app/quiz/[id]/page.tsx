"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useFormik } from "formik";
// framer-motion removed from this file to avoid TS prop typing issues
import { Header } from "@/components/Header";
import { ProgressBar } from "@/components/ProgressBar";
import { Option } from "@/components/Option";
import {
  getQuiz,
  getQuestions,
  submitQuiz,
  getLearningPlan,
} from "@/services/api";
import { playerNameSchema } from "@/services/validations";
import { useMemo } from "react";

interface Question {
  _id: string;
  text: string;
  type: string;
  block: "beginner" | "intermediate" | "expert";
  options: Array<{ id: string; text: string; isCorrect: boolean }>;
}

interface Quiz {
  _id: string;
  title: string;
  description: string;
  totalQuestions: number;
  themeId?: string;
}

interface LearningPlan {
  theme: string;
  level: string;
  resources: Array<{ title: string; url: string; type: string }>;
  practiceQuestions: Array<{
    question: string;
    choices: string[];
    answer: string;
    explanation?: string;
  }>;
}

type QuizState = "enterName" | "quiz" | "finished";

export default function QuizPage() {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [blockQuestionIndex, setBlockQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [showResults, setShowResults] = useState(false);
  const [showLearningPlan, setShowLearningPlan] = useState(false);
  const [learningPlan, setLearningPlan] = useState<LearningPlan | null>(null);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quizState, setQuizState] = useState<QuizState>("enterName");
  const [startTime] = useState<number>(Date.now());
  const router = useRouter();
  const params = useParams();
  const quizId = params.id as string;

  const formik = useFormik({
    initialValues: { playerName: "" },
    validationSchema: playerNameSchema,
    onSubmit: () => {
      setQuizState("quiz");
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quizData = await getQuiz(quizId);
        setQuiz(quizData);
        const questionsData = await getQuestions(quizId);
        setQuestions(questionsData);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [quizId]);

  const blockOrder = ["beginner", "intermediate", "expert"];
  const availableBlocks = blockOrder.filter((b) =>
    questions.some((q) => q.block === b)
  );
  const currentBlock = availableBlocks[currentBlockIndex];
  const blockQuestions = questions.filter((q) => q.block === currentBlock);
  const currentQuestion = blockQuestions[blockQuestionIndex];

  // Simple Fisher-Yates shuffle for demo — randomizes option order per question render
  const shuffle = (arr: any[]) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const displayedOptions = useMemo(() => {
    if (!currentQuestion) return [] as any[];
    return shuffle(currentQuestion.options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion?._id]);

  const handleSelectOption = (optionId: string) => {
    if (showResults) return;
    if (!currentQuestion) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion._id]: optionId,
    });
  };

  const handleNextQuestion = () => {
    if (!currentQuestion) return;
    if (blockQuestionIndex < blockQuestions.length - 1) {
      setBlockQuestionIndex(blockQuestionIndex + 1);
      setShowResults(false);
    }
  };

  const handleShowResult = () => {
    setShowResults(true);
  };

  const evaluateBlock = () => {
    // calculate block score
    const blockQids = blockQuestions.map((q) => q._id);
    let correct = 0;
    for (const q of blockQuestions) {
      const selected = selectedAnswers[q._id];
      const correctOpt = q.options.find((o) => o.isCorrect);
      if (selected && correctOpt && selected === correctOpt.id) correct++;
    }
    const percent = Math.round((correct / blockQuestions.length) * 100);
    return { correct, percent };
  };

  const handleFinishBlock = async () => {
    const { correct, percent } = evaluateBlock();
    if (percent >= 80) {
      // advance to next block or finish
      if (currentBlockIndex < availableBlocks.length - 1) {
        alert(
          `Passed ${currentBlock} block: ${percent}% — advancing to next block`
        );
        setCurrentBlockIndex(currentBlockIndex + 1);
        setBlockQuestionIndex(0);
        setShowResults(false);
      } else {
        // finished all blocks — submit full quiz
        try {
          const answers = questions.map((q) => ({
            questionId: q._id,
            selectedOption: selectedAnswers[q._id] || null,
          }));

          const timeTaken = Math.floor((Date.now() - startTime) / 1000);

          const result = await submitQuiz({
            quizId,
            playerName: formik.values.playerName,
            answers,
            timeTaken,
          });

          // persist result locally so the results page can read it immediately
          try {
            localStorage.setItem(
              `result-${result._id}`,
              JSON.stringify(result)
            );
          } catch (e) {
            // ignore storage errors
          }

          router.push(`/results/${result._id}`);
        } catch (error) {
          console.error("Error submitting quiz:", error);
          alert("Failed to submit quiz");
        }
      }
    } else {
      // failed block — fetch a simple learning plan (AI)
      try {
        setAiGenerating(true);

        // call the AI plan endpoint
        const plan = await getLearningPlan({
          quizId: quizId,
          themeId: (quiz as any)?.themeId,
          block: currentBlock,
        });

        // ensure the user sees an "AI is generating" loader for ~2.5s
        await new Promise((res) => setTimeout(res, 2500));

        setLearningPlan(plan);
        setShowLearningPlan(true);
      } catch (err) {
        console.error("Failed to fetch learning plan", err);
        // fallback to ask user to retry
        const tryAgain = confirm(
          `You scored ${percent}% in the ${currentBlock} block. You need 80% to advance. Retry this block?`
        );
        if (tryAgain) {
          const newSelected = { ...selectedAnswers };
          for (const q of blockQuestions) delete newSelected[q._id];
          setSelectedAnswers(newSelected);
          setBlockQuestionIndex(0);
          setShowResults(false);
        } else {
          router.push("/");
        }
      } finally {
        setAiGenerating(false);
      }
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple border-t-purple-light rounded-full animate-spin" />
      </main>
    );
  }

  if (!quiz || questions.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="text-center text-gray-400">Quiz not found</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-dark">
      <Header />

      <div className="pt-32 pb-12 px-6">
        <div className="max-w-2xl mx-auto">
          {quizState === "enterName" ? (
            <div className="bg-darker border border-purple border-opacity-30 rounded-lg p-8 text-center">
              <h2 className="text-3xl font-bold mb-6 gradient-text">
                {quiz.title}
              </h2>
              <p className="text-gray-400 mb-8">{quiz.description}</p>

              <form onSubmit={formik.handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="playerName"
                  placeholder="Enter your name"
                  value={formik.values.playerName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-3 bg-darker border border-purple border-opacity-50 rounded-lg focus:outline-none focus:border-purple focus:border-opacity-100 text-white placeholder-gray-500"
                />
                {formik.touched.playerName && formik.errors.playerName && (
                  <p className="text-red-400 text-sm">
                    {formik.errors.playerName}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple to-purple-light text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Start Quiz ({quiz.totalQuestions} questions)
                </button>
              </form>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <ProgressBar
                  current={blockQuestionIndex + 1}
                  total={blockQuestions.length || 1}
                />
              </div>

              {aiGenerating ? (
                <div className="bg-darker border border-yellow-500 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-bold mb-2">
                    AI is generating your learning plan...
                  </h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Our AI assistant is crafting a tailored plan for this topic
                    — this takes a couple seconds.
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                    <div className="text-gray-300">
                      Preparing personalized resources
                    </div>
                  </div>
                </div>
              ) : showLearningPlan && learningPlan ? (
                <div className="bg-darker border border-yellow-500 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-bold mb-2">
                    Learning Plan — {learningPlan.theme} ({learningPlan.level})
                  </h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Try these resources, then re-attempt the block.
                  </p>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Resources</h4>
                    <ul className="list-disc list-inside text-left">
                      {learningPlan.resources.map((r, i) => (
                        <li key={i}>
                          <a
                            className="text-purple"
                            href={r.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {r.title}
                          </a>{" "}
                          <span className="text-xs text-gray-400">
                            ({r.type})
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Practice Questions</h4>
                    <ol className="list-decimal list-inside text-left">
                      {learningPlan.practiceQuestions.map((pq, idx) => (
                        <li key={idx} className="mb-3">
                          <div className="font-medium">{pq.question}</div>
                          <div className="text-sm text-gray-300">
                            Choices: {pq.choices.join(" • ")}
                          </div>
                          <div className="text-sm text-green-300 mt-1">
                            Answer: {pq.answer}
                          </div>
                          {pq.explanation && (
                            <div className="text-xs text-gray-400">
                              {pq.explanation}
                            </div>
                          )}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        // retry block: clear block answers
                        const newSelected = { ...selectedAnswers };
                        for (const q of blockQuestions)
                          delete newSelected[q._id];
                        setSelectedAnswers(newSelected);
                        setBlockQuestionIndex(0);
                        setShowResults(false);
                        setShowLearningPlan(false);
                      }}
                      className="flex-1 bg-purple text-white py-2 rounded-lg"
                    >
                      Retry Block
                    </button>

                    <button
                      onClick={() => router.push("/")}
                      className="flex-1 bg-gray-700 text-white py-2 rounded-lg"
                    >
                      Back Home
                    </button>
                  </div>
                </div>
              ) : null}

              {currentQuestion ? (
                <div
                  key={currentQuestion._id}
                  className="bg-darker border border-purple border-opacity-30 rounded-lg p-8 mb-8"
                >
                  <h3 className="text-2xl font-bold mb-8">
                    {currentQuestion.text}
                  </h3>

                  <div className="space-y-4 mb-8">
                    {currentQuestion.options.map((option, idx) => (
                      <Option
                        key={option.id}
                        id={String(idx)}
                        text={option.text}
                        isSelected={
                          selectedAnswers[currentQuestion._id] === option.id
                        }
                        isCorrect={option.isCorrect}
                        showResult={showResults}
                        onClick={() => handleSelectOption(option.id)}
                      />
                    ))}
                  </div>

                  <div className="flex gap-4">
                    {!showResults ? (
                      <button
                        onClick={handleShowResult}
                        disabled={!selectedAnswers[currentQuestion._id]}
                        className="flex-1 bg-purple text-white py-3 rounded-lg font-semibold hover:bg-purple-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Check Answer
                      </button>
                    ) : (
                      <>
                        {blockQuestionIndex < blockQuestions.length - 1 ? (
                          <button
                            onClick={handleNextQuestion}
                            className="flex-1 bg-purple text-white py-3 rounded-lg font-semibold hover:bg-purple-light transition-colors"
                          >
                            Next Question
                          </button>
                        ) : (
                          <button
                            onClick={handleFinishBlock}
                            className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                          >
                            Finish Block
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-darker border border-purple border-opacity-30 rounded-lg p-8 text-center">
                  <p className="text-gray-300 mb-4">
                    No questions available for the current block.
                  </p>
                  {currentBlockIndex < availableBlocks.length - 1 ? (
                    <button
                      onClick={() => {
                        setCurrentBlockIndex(currentBlockIndex + 1);
                        setBlockQuestionIndex(0);
                      }}
                      className="bg-purple text-white py-2 px-4 rounded-lg"
                    >
                      Skip to next block
                    </button>
                  ) : (
                    <button
                      onClick={() => router.push("/")}
                      className="bg-purple text-white py-2 px-4 rounded-lg"
                    >
                      Back Home
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
