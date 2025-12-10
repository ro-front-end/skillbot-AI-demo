import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkillBot - Gamified Learning",
  description: "Turn learning into a game with SkillBot",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-dark text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
