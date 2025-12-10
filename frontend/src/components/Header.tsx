"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    try {
      const u = localStorage.getItem("user");
      if (u) setUser(JSON.parse(u));
    } catch (e) {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    // reload to update UI
    if (typeof window !== "undefined") window.location.href = "/";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-darker bg-opacity-80 backdrop-blur-md border-b border-purple border-opacity-20">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-3">
            <span className="text-3xl">🎮</span>
            <h1 className="text-2xl font-bold gradient-text">SkillBot</h1>
          </Link>
        </div>

        <nav className="hidden sm:flex items-center space-x-6">
          <Link href="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link href="/about" className="text-gray-300 hover:text-white">
            About
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-white">
            Contact
          </Link>
          {user ? (
            <>
              <Link href="/profile" className="text-gray-300 hover:text-white">
                Profile
              </Link>
              <button onClick={handleLogout} className="text-sm text-red-400">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-300 hover:text-white">
                Sign In
              </Link>
              <Link
                href="/register"
                className="text-purple hover:text-white font-semibold"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>

        <div className="sm:hidden">
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="p-2 rounded-md bg-purple/10 text-purple"
          >
            {open ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <div className="sm:hidden px-6 pb-4">
          <div className="flex flex-col space-y-2">
            <Link href="/" className="block text-gray-300 py-2">
              Home
            </Link>
            <Link href="/about" className="block text-gray-300 py-2">
              About
            </Link>
            <Link href="/contact" className="block text-gray-300 py-2">
              Contact
            </Link>
            {user ? (
              <>
                <Link href="/profile" className="block text-gray-300 py-2">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-left text-red-400 py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block text-gray-300 py-2">
                  Sign In
                </Link>
                <Link href="/register" className="block text-purple py-2">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
