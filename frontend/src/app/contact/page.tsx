"use client";

import { useState } from "react";
import { Header } from "@/components/Header";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Demo: just mark as sent and log
    console.log("Contact form:", { name, email, message });
    setSent(true);
  };

  return (
    <main className="min-h-screen bg-gradient-dark">
      <Header />
      <div className="pt-32 pb-12 px-6 max-w-2xl mx-auto">
        <div className="bg-darker border border-purple border-opacity-30 rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-4">Contact</h1>
          {sent ? (
            <div className="text-green-300">
              Thanks! Your message was sent (demo only).
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="w-full p-3 bg-darker border border-purple border-opacity-40 rounded"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="w-full p-3 bg-darker border border-purple border-opacity-40 rounded"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <textarea
                className="w-full p-3 bg-darker border border-purple border-opacity-40 rounded"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-purple to-purple-light text-white py-2 px-4 rounded"
              >
                Send
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
