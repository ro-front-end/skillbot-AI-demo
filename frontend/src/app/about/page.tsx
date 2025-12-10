"use client";

import Link from "next/link";
import { Header } from "@/components/Header";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-dark">
      <Header />
      <div className="pt-32 pb-12 px-6 max-w-4xl mx-auto">
        <div className="bg-darker border border-purple border-opacity-30 rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-4">About SkillBot</h1>
          <p className="text-gray-300 mb-4">
            SkillBot is a demo gamified learning platform that helps users
            progress through themed quizzes using learning blocks (Beginner →
            Intermediate → Expert). It's designed as a simple, extensible
            example for building adaptive learning experiences.
          </p>
          <p className="text-gray-300 mb-4">
            This project is intended for demo and learning purposes: you can
            seed the database, try quizzes, and see how block-based progression
            and simple AI-generated learning plans integrate into the flow.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">Quick Links</h2>
          <ul className="list-disc list-inside text-gray-300">
            <li>
              <Link href="/" className="text-purple">
                Home
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-purple">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
