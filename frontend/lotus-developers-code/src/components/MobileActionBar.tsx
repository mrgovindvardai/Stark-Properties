import React from 'react';
import { Compass, Calendar } from 'lucide-react';

interface MobileActionBarProps {
  onExplore: () => void;
  onEnquire: () => void;
}

export const MobileActionBar: React.FC<MobileActionBarProps> = ({ onExplore, onEnquire }) => {
  return (
    <nav
      aria-label="Mobile Quick Actions"
      className="md:hidden fixed bottom-4 left-4 right-4 z-30"
    >
      <div className="glass-obsidian rounded-full p-1.5 shadow-2xl border border-white/15 flex items-center justify-between gap-2 max-w-sm mx-auto backdrop-blur-2xl">
        <button
          onClick={onExplore}
          className="flex-1 py-2.5 px-4 rounded-full text-xs uppercase tracking-wider font-medium text-white hover:bg-white/10 flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Compass className="w-3.5 h-3.5 text-[#C6A875]" />
          <span>Explore</span>
        </button>

        <button
          onClick={onEnquire}
          className="flex-1 py-2.5 px-4 rounded-full text-xs uppercase tracking-wider font-semibold text-white bg-[#A83D35] hover:bg-[#8f322b] flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Enquire</span>
        </button>
      </div>
    </nav>
  );
};
