"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress((current / total) * 100);
  }, [current, total]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-400">
          Question {current} of {total}
        </span>
        <span className="text-sm text-purple font-semibold">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="w-full bg-darker rounded-full h-2 border border-purple border-opacity-30">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          className="h-full bg-gradient-to-r from-purple to-purple-light rounded-full"
        />
      </div>
    </div>
  );
}
