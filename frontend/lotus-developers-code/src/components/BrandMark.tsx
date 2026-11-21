import React from 'react';

interface BrandMarkProps {
  size?: 'header' | 'footer';
}

/** Original architectural monogram with a cinematic, precision-engineered finish. */
export const BrandMark: React.FC<BrandMarkProps> = ({ size = 'header' }) => {
  const isHeader = size === 'header';

  return (
    <span className={`inline-flex items-center ${isHeader ? 'gap-2.5' : 'gap-3'}`}>
      <svg
        className={`${isHeader ? 'h-11 w-11 sm:h-12 sm:w-12' : 'h-14 w-14'} shrink-0 text-[#D5B36B] transition-transform duration-500 group-hover:rotate-3`}
        viewBox="0 0 48 48"
        fill="none"
        role="img"
        aria-label="Stark Properties geometric tower emblem"
      >
        <defs>
          <linearGradient id="stark-metal" x1="8" y1="6" x2="39" y2="43" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFF0C4" />
            <stop offset=".48" stopColor="#D5B36B" />
            <stop offset="1" stopColor="#8A6730" />
          </linearGradient>
          <radialGradient id="stark-core" cx="0" cy="0" r="1" gradientTransform="matrix(0 12 -12 0 24 24)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#A83D35" stopOpacity=".48" />
            <stop offset="1" stopColor="#A83D35" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path d="M15 3.75h18L44.25 15v18L33 44.25H15L3.75 33V15L15 3.75Z" stroke="url(#stark-metal)" strokeWidth="1.5" />
        <path d="M24 6.5 41.5 24 24 41.5 6.5 24 24 6.5Z" stroke="currentColor" strokeOpacity=".28" strokeWidth=".7" />
        <circle cx="24" cy="24" r="12" fill="url(#stark-core)" stroke="currentColor" strokeOpacity=".72" strokeWidth="1" />
        <path d="M17.5 35V19.5L24 12l6.5 7.5V35M17.5 24h13M21.5 35v-7h5v7M20 20.5h8" stroke="url(#stark-metal)" strokeWidth="1.7" strokeLinecap="square" strokeLinejoin="miter" />
        <path d="M24 4.5v4M24 39.5v4M4.5 24h4M39.5 24h4" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="24" cy="24" r="2.3" fill="#A83D35" stroke="#F4D99A" strokeWidth=".8" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`${isHeader ? 'text-base sm:text-lg' : 'text-2xl'} font-extrabold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-white via-[#E8E4D9] to-[#AFA99B] drop-shadow-[0_1px_8px_rgba(213,179,107,0.2)]`}>
          STARK
        </span>
        <span className={`${isHeader ? 'mt-1 text-[9px]' : 'mt-1.5 text-[10px]'} flex items-center gap-2 font-semibold tracking-[0.3em] text-[#D5B36B]`}>
          PROPERTIES
          <span aria-hidden="true" className="h-px w-5 bg-[#A83D35]" />
        </span>
      </span>
    </span>
  );
};
