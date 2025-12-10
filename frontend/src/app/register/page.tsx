"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/services/api";
import { Header } from "@/components/Header";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await register({ name, email, password });
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      router.push("/profile");
    } catch (err: any) {
      setError(err?.message || "Registration failed");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-dark">
      <Header />
      <div className="pt-32 pb-12 px-6 max-w-md mx-auto">
        <div className="bg-darker border border-purple border-opacity-30 rounded-lg p-8">
          <h1 className="text-2xl font-bold mb-4">Create Account</h1>
          {error && <div className="text-red-400 mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="w-full p-3 bg-darker border border-purple border-opacity-40 rounded"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full p-3 bg-darker border border-purple border-opacity-40 rounded"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="w-full p-3 bg-darker border border-purple border-opacity-40 rounded"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-purple to-purple-light text-white py-2 px-4 rounded"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
