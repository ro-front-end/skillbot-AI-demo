const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const getThemes = async () => {
  const response = await fetch(`${baseURL}/themes`);
  if (!response.ok) throw new Error("Failed to fetch themes");
  return response.json();
};

export const getQuizzesByTheme = async (themeId: string) => {
  const response = await fetch(`${baseURL}/quizzes/theme/${themeId}`);
  if (!response.ok) throw new Error("Failed to fetch quizzes");
  return response.json();
};

export const getQuiz = async (quizId: string) => {
  const response = await fetch(`${baseURL}/quizzes/${quizId}`);
  if (!response.ok) throw new Error("Failed to fetch quiz");
  return response.json();
};

export const getQuestions = async (quizId: string) => {
  const response = await fetch(`${baseURL}/questions/${quizId}`);
  if (!response.ok) throw new Error("Failed to fetch questions");
  return response.json();
};

export const getLearningPlan = async (params: {
  quizId?: string;
  themeId?: string;
  block?: string;
}) => {
  const qs = new URLSearchParams();
  if (params.quizId) qs.set("quizId", params.quizId);
  if (params.themeId) qs.set("themeId", params.themeId);
  if (params.block) qs.set("block", params.block);
  const response = await fetch(`${baseURL}/ai/plan?${qs.toString()}`);
  if (!response.ok) throw new Error("Failed to fetch learning plan");
  return response.json();
};

const authHeaders = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await fetch(`${baseURL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
};

export const login = async (data: { email: string; password: string }) => {
  const res = await fetch(`${baseURL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
};

export const getProfile = async () => {
  const res = await fetch(`${baseURL}/auth/me`, {
    headers: { ...authHeaders() },
  });
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
};

export const submitQuiz = async (data: {
  quizId: string;
  playerName: string;
  answers: any[];
  timeTaken: number;
}) => {
  const response = await fetch(`${baseURL}/scores/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to submit quiz");
  return response.json();
};

export const getLeaderboard = async (quizId: string) => {
  const response = await fetch(`${baseURL}/scores/leaderboard/${quizId}`);
  if (!response.ok) throw new Error("Failed to fetch leaderboard");
  return response.json();
};
