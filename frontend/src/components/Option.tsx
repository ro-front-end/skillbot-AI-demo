"use client";

// framer-motion removed to avoid prop typing issues in this demo

interface OptionProps {
  id: string;
  text: string;
  isSelected: boolean;
  isCorrect?: boolean;
  showResult?: boolean;
  onClick: () => void;
}

export function Option({
  id,
  text,
  isSelected,
  isCorrect,
  showResult,
  onClick,
}: OptionProps) {
  let bgColor =
    "bg-darker border-purple border-opacity-30 hover:border-opacity-100";

  if (showResult) {
    if (isCorrect) {
      bgColor = "bg-green-500/20 border-green-500 text-green-300";
    } else if (isSelected && !isCorrect) {
      bgColor = "bg-red-500/20 border-red-500 text-red-300";
    }
  }

  const label = (() => {
    const n = parseInt(id, 10);
    if (Number.isInteger(n) && n >= 0) return String.fromCharCode(65 + n);
    return id;
  })();

  const classes = (() => {
    let c =
      "w-full rounded-xl p-4 text-left font-semibold transition-all shadow-md flex items-center gap-4";
    if (showResult) {
      if (isCorrect)
        c += " bg-green-600/20 border border-green-500 text-green-200";
      else if (isSelected && !isCorrect)
        c += " bg-red-600/20 border border-red-500 text-red-200";
      else c += " bg-white/5 border border-white/5 text-gray-300";
    } else if (isSelected) {
      c += " bg-purple-600/10 border border-purple-500";
    } else {
      c += " bg-white/3 border border-white/6 text-gray-100";
    }
    return c;
  })();

  return (
    <button onClick={onClick} disabled={!!showResult} className={classes}>
      <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center font-bold">
        {label}
      </div>
      <div className="flex-1">{text}</div>
    </button>
  );
}
