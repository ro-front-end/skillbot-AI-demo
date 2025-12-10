"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { getProfile } from "@/services/api";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (e) {
        console.error(e);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  if (loading)
    return (
      <main className="min-h-screen bg-gradient-dark">
        <Header />
        <div className="pt-32 px-6">Loading...</div>
      </main>
    );

  return (
    <main className="min-h-screen bg-gradient-dark">
      <Header />
      <div className="pt-32 pb-12 px-6 max-w-3xl mx-auto">
        <div className="bg-darker border border-purple border-opacity-30 rounded-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <p className="text-sm text-gray-400">{profile.email}</p>
            </div>
            <div>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4">Badges</h2>
          {profile.badges && profile.badges.length > 0 ? (
            <div className="flex gap-3 flex-wrap mb-6">
              {profile.badges.map((b: any) => (
                <div
                  key={b._id}
                  className="px-3 py-2 bg-purple/10 border border-purple rounded"
                >
                  {b.name}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 mb-6">
              No badges yet — complete a theme to earn badges.
            </p>
          )}

          <h2 className="text-xl font-semibold mb-4">Trophies</h2>
          {profile.trophies && profile.trophies.length > 0 ? (
            <div className="flex gap-3 flex-wrap">
              {profile.trophies.map((t: any, idx: number) => (
                <div
                  key={idx}
                  className="px-3 py-2 bg-yellow-900/10 border border-yellow-700 rounded"
                >
                  {t.title} — {new Date(t.date).toLocaleDateString()}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">
              No trophies yet — earn trophies by mastering all themes.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
