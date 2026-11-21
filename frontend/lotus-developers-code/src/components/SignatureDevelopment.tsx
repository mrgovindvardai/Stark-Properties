import React, { useState } from 'react';
import { Layers, Image as ImageIcon, Sparkles, Check, ArrowRight } from 'lucide-react';

interface SignatureDevelopmentProps {
  onExploreClick: () => void;
  image: string;
}

interface Hotspot {
  id: string;
  number: string;
  title: string;
  description: string;
  xPercent: number; // For hotspot pin placement
  yPercent: number;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'light',
    number: '01',
    title: 'Natural Light',
    description: 'Openings positioned to welcome daylight throughout the living spaces, creating dynamic shadows that evolve with the sun.',
    xPercent: 62,
    yPercent: 42,
  },
  {
    id: 'courtyard',
    number: '02',
    title: 'Green Courtyard',
    description: 'A planted courtyard concept that brings nature into the centre of the home, framed by reflective water channels.',
    xPercent: 48,
    yPercent: 74,
  },
  {
    id: 'materials',
    number: '03',
    title: 'Material Palette',
    description: 'A restrained combination of natural stone, charred timber, glass, and textured basalt surfaces built to age gracefully.',
    xPercent: 24,
    yPercent: 35,
  },
];

export const SignatureDevelopment: React.FC<SignatureDevelopmentProps> = ({ onExploreClick, image }) => {
  const [viewMode, setViewMode] = useState<'architecture' | 'floorplan'>('architecture');
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(HOTSPOTS[0]);

  return (
    <section id="signature" className="py-24 sm:py-32 bg-[#14251D] text-[#F8F9FA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-[#C6A875] block mb-3">
              A SIGNATURE ARCHITECTURAL CONCEPT
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight [text-wrap:balance]">
              The Obsidian Residence
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#B8BDB7] leading-relaxed [text-wrap:balance]">
              Designed around the way you want to live. An exploration of natural materials, considered proportions, open spaces, and architecture that brings the outdoors closer.
            </p>
          </div>

          {/* Architecture / Floor Plan Toggle */}
          <div className="flex items-center p-1 rounded-full bg-[#202522] border border-white/10 shrink-0">
            <button
              onClick={() => setViewMode('architecture')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all cursor-pointer ${
                viewMode === 'architecture'
                  ? 'bg-[#315844] text-white shadow-md'
                  : 'text-[#B8BDB7] hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Architecture</span>
            </button>
            <button
              onClick={() => setViewMode('floorplan')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all cursor-pointer ${
                viewMode === 'floorplan'
                  ? 'bg-[#315844] text-white shadow-md'
                  : 'text-[#B8BDB7] hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Floor Plan</span>
            </button>
          </div>
        </div>

        {/* Main Interactive Showcase Canvas */}
        <div className="relative rounded-2xl overflow-hidden bg-[#202522] border border-white/10 shadow-2xl aspect-[16/10] sm:aspect-[16/9] w-full">
          {viewMode === 'architecture' ? (
            /* Architecture View with Selectable Hotspots */
            <div className="relative w-full h-full">
              <img
                src={image}
                alt="The Obsidian Residence architectural masterpiece at dusk featuring charred timber and reflection pool"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = '/static/images/architecture-placeholder.svg';
                }}
                className="w-full h-full object-cover object-center"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

              {/* Selectable Hotspot Pins */}
              {HOTSPOTS.map((spot) => {
                const isSelected = activeHotspot?.id === spot.id;
                return (
                  <button
                    key={spot.id}
                    onClick={() => setActiveHotspot(spot)}
                    style={{ left: `${spot.xPercent}%`, top: `${spot.yPercent}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none z-20 ${
                      isSelected ? 'scale-110' : 'hover:scale-105'
                    }`}
                    aria-label={`Select architectural highlight ${spot.number}: ${spot.title}`}
                  >
                    <span className="relative flex h-10 w-10 items-center justify-center">
                      <span
                        className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${
                          isSelected ? 'bg-[#C6A875]' : 'bg-white'
                        }`}
                      />
                      <span
                        className={`relative inline-flex items-center justify-center rounded-full h-8 w-8 text-xs font-mono font-bold transition-colors ${
                          isSelected
                            ? 'bg-[#C6A875] text-[#202522] ring-2 ring-white shadow-lg'
                            : 'bg-black/70 text-white border border-white/30 backdrop-blur-md'
                        }`}
                      >
                        {spot.number}
                      </span>
                    </span>
                  </button>
                );
              })}

              {/* Floating Hotspot Detail Panel */}
              {activeHotspot && (
                <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-md p-5 rounded-xl glass-obsidian border border-white/15 text-left shadow-2xl animate-in fade-in duration-200 z-20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-medium text-[#C6A875]">
                      HIGHLIGHT {activeHotspot.number}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#B8BDB7]">
                      Architectural Detail
                    </span>
                  </div>
                  <h4 className="text-lg font-medium text-white mb-1.5">{activeHotspot.title}</h4>
                  <p className="text-sm text-[#B8BDB7] leading-relaxed">
                    {activeHotspot.description}
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Floor Plan Mode: Clean Conceptual Vector Plan */
            <div className="w-full h-full p-6 sm:p-12 flex flex-col justify-between bg-[#1a221d] text-[#F8F9FA] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-medium text-white">Conceptual Ground Level Layout</h3>
                  <p className="text-xs text-[#B8BDB7]">The Obsidian Residence · Illustrative architectural schematic</p>
                </div>
                <span className="text-xs font-mono text-[#C6A875] bg-black/40 px-3 py-1 rounded-full border border-white/10">
                  Total Built Area: ~4,600 sq. ft.
                </span>
              </div>

              {/* Scalable SVG Floor Plan Illustration */}
              <div className="my-6 max-w-3xl mx-auto w-full">
                <svg viewBox="0 0 800 450" className="w-full h-auto drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Outer Boundary & Walls */}
                  <rect x="50" y="40" width="700" height="360" rx="4" stroke="#C6A875" strokeWidth="1.5" strokeDasharray="4 4" fill="#14251D" fillOpacity="0.4" />

                  {/* Living & Dining Pavilion */}
                  <rect x="80" y="70" width="300" height="180" fill="#202522" stroke="#B8BDB7" strokeWidth="1.5" />
                  <text x="230" y="150" fill="#F8F9FA" fontSize="14" textAnchor="middle" fontFamily="sans-serif">Grand Living Pavilion</text>
                  <text x="230" y="170" fill="#B8BDB7" fontSize="10" textAnchor="middle" fontFamily="sans-serif">28' x 20' · Double Height Glass</text>

                  {/* Central Open Courtyard */}
                  <rect x="410" y="70" width="160" height="180" fill="#14251D" stroke="#315844" strokeWidth="2" />
                  <circle cx="490" cy="160" r="30" stroke="#315844" strokeWidth="1" strokeDasharray="3 3" fill="#315844" fillOpacity="0.3" />
                  <text x="490" y="165" fill="#C6A875" fontSize="12" textAnchor="middle" fontFamily="sans-serif">Open Courtyard</text>
                  <text x="490" y="180" fill="#B8BDB7" fontSize="9" textAnchor="middle" fontFamily="sans-serif">Flora & Sky Oculus</text>

                  {/* Kitchen & Culinary Atelier */}
                  <rect x="600" y="70" width="120" height="180" fill="#202522" stroke="#B8BDB7" strokeWidth="1.5" />
                  <text x="660" y="150" fill="#F8F9FA" fontSize="12" textAnchor="middle" fontFamily="sans-serif">Culinary Atelier</text>
                  <text x="660" y="168" fill="#B8BDB7" fontSize="9" textAnchor="middle" fontFamily="sans-serif">14' x 16'</text>

                  {/* Master Suite Sanctuary */}
                  <rect x="80" y="270" width="340" height="110" fill="#202522" stroke="#B8BDB7" strokeWidth="1.5" />
                  <text x="250" y="325" fill="#F8F9FA" fontSize="14" textAnchor="middle" fontFamily="sans-serif">Master Suite Sanctuary</text>
                  <text x="250" y="345" fill="#B8BDB7" fontSize="10" textAnchor="middle" fontFamily="sans-serif">Private Terrace & Basalt Bath</text>

                  {/* Reflecting Pool & Water Deck */}
                  <rect x="440" y="270" width="280" height="110" fill="#14251D" stroke="#C6A875" strokeWidth="1" fillOpacity="0.6" />
                  <path d="M470 300 Q580 320 690 300 M470 330 Q580 350 690 330" stroke="#C6A875" strokeWidth="0.8" opacity="0.4" />
                  <text x="580" y="325" fill="#C6A875" fontSize="13" textAnchor="middle" fontFamily="sans-serif">Reflecting Pool & Sky Deck</text>
                  <text x="580" y="345" fill="#B8BDB7" fontSize="9" textAnchor="middle" fontFamily="sans-serif">Basalt Stepping Stones</text>
                </svg>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#B8BDB7] pt-3 border-t border-white/10 gap-2">
                <span>Illustrative conceptual drawing. Specifications subject to engineering refinement.</span>
                <span className="text-[#C6A875]">4 Bedroom Suites · 5 Baths · Private Pool</span>
              </div>
            </div>
          )}
        </div>

        {/* Feature Highlights Grid Below Canvas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {HOTSPOTS.map((spot) => (
            <div
              key={spot.id}
              onClick={() => {
                setViewMode('architecture');
                setActiveHotspot(spot);
              }}
              className={`p-6 rounded-xl border transition-all cursor-pointer ${
                viewMode === 'architecture' && activeHotspot?.id === spot.id
                  ? 'bg-[#202522] border-[#C6A875]'
                  : 'bg-[#202522]/50 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-medium text-[#C6A875]">
                  {spot.number}
                </span>
                {activeHotspot?.id === spot.id && viewMode === 'architecture' && (
                  <Check className="w-4 h-4 text-[#C6A875]" />
                )}
              </div>
              <h3 className="text-base font-medium text-white mb-1">{spot.title}</h3>
              <p className="text-xs text-[#B8BDB7] leading-relaxed line-clamp-2">
                {spot.description}
              </p>
            </div>
          ))}
        </div>

        {/* Section Action */}
        <div className="mt-12 text-center">
          <button
            onClick={onExploreClick}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold text-white bg-[#A83D35] hover:bg-[#8f322b] transition-all shadow-md cursor-pointer"
          >
            <span>Explore This Residence</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
