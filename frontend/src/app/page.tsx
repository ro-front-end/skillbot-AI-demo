"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { ThemeCard } from "@/components/ThemeCard";
import { getThemes } from "@/services/api";

interface Theme {
  _id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export default function Home() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const data = await getThemes();
        setThemes(data);
      } catch (err: any) {
        console.error("Error fetching themes:", err);
        setError(err?.message || String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchThemes();
  }, []);

  const handleThemeClick = (themeId: string) => {
    router.push(`/themes/${themeId}`);
  };

  return (
    <main className="min-h-screen bg-gradient-dark">
      <Header />

      <div className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="gradient-text">Learn Through Gaming</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Master concepts with interactive quizzes and gamified challenges
            </p>
          </div>
          {/* Removed Explore Themes button */}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-purple border-t-purple-light rounded-full animate-spin" />
            </div>
          ) : (
            <div
              id="themes-grid"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {error && (
                <div className="col-span-full bg-red-900/40 border border-red-700 p-4 rounded-lg text-center">
                  <p className="text-red-300 mb-2">
                    Failed to load themes: {error}
                  </p>
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={async () => {
                        setLoading(true);
                        setError(null);
                        try {
                          const res = await fetch(
                            `${process.env.NEXT_PUBLIC_API_URL}/health`
                          );
                          if (!res.ok) throw new Error("Health check failed");
                          const data = await res.json();
                          alert(`API Health: ${JSON.stringify(data)}`);
                        } catch (e: any) {
                          alert(`API unreachable: ${e?.message || String(e)}`);
                        } finally {
                          setLoading(false);
                        }
                      }}
                      className="px-4 py-2 bg-purple text-white rounded-md"
                    >
                      Check API
                    </button>
                    <button
                      onClick={() => {
                        const demoId = "demo-theme";
                        router.push(`/themes/${demoId}`);
                      }}
                      className="px-4 py-2 bg-gray-800 text-white rounded-md border border-purple/30"
                    >
                      Try Demo Theme
                    </button>
                  </div>
                </div>
              )}

              {themes && themes.length > 0
                ? themes.map((theme) => (
                    <div key={theme._id}>
                      <ThemeCard
                        theme={theme}
                        onClick={() => handleThemeClick(theme._id)}
                      />
                    </div>
                  ))
                : [
                    {
                      _id: "demo-1",
                      name: "Demo Theme",
                      description: "Try a demo quiz if backend is down",
                      icon: "🎮",
                      color: "#a855f7",
                    },
                  ].map((theme) => (
                    <div key={theme._id}>
                      <ThemeCard
                        theme={theme as Theme}
                        onClick={() => handleThemeClick(theme._id)}
                      />
                    </div>
                  ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
