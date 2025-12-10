"use client";

interface ThemeCardProps {
  theme: {
    _id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
  };
  onClick: () => void;
}

export function ThemeCard({ theme, onClick }: ThemeCardProps) {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <div className="bg-gradient-to-br from-black/40 to-[#0b0220] border border-purple border-opacity-30 rounded-2xl p-5 shadow-lg hover:scale-105 transform transition-transform duration-200 h-full">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-4xl">
            {theme.icon}
          </div>
          <div>
            <h3 className="text-lg font-bold mb-1 gradient-text">
              {theme.name}
            </h3>
            <p className="text-gray-400 text-sm">{theme.description}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="col-span-3 bg-gradient-to-r from-purple to-purple-light text-white py-3 rounded-xl font-bold text-center"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
}
