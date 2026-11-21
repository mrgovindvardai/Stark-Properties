import React, { useState } from 'react';
import { ArrowDown, Search } from 'lucide-react';
import { LOCATIONS, PROPERTY_TYPES, BUDGET_RANGES } from '../data/properties';
import { FilterCriteria } from '../utils/propertyFilter';

interface HeroProps {
  onSearch: (criteria: FilterCriteria) => void;
  onExploreClick: () => void;
  backgroundImage: string;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onExploreClick, backgroundImage }) => {
  const [selectedLocation, setSelectedLocation] = useState<string>('All Locations');
  const [selectedType, setSelectedType] = useState<string>('All Residences');
  const [selectedBudget, setSelectedBudget] = useState<string>('Any Budget');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      location: selectedLocation,
      propertyType: selectedType,
      budgetRange: selectedBudget,
    });
  };

  const scrollToPhilosophy = () => {
    const el = document.getElementById('philosophy');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 sm:px-8 lg:px-12 bg-[#202522] overflow-hidden">
      {/* Background Cinematic Image with Balanced Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt="Stark Properties architectural luxury residence featuring glass pavilions and reflecting pool at dusk"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = '/static/images/architecture-placeholder.svg';
          }}
          className="w-full h-full object-cover object-center scale-100 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Apple-style balanced dark charcoal gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#202522] via-[#202522]/60 to-[#202522]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#202522]/80 via-transparent to-[#202522]/50" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto w-full pt-12 md:pt-20 text-center flex flex-col items-center">
        {/* Eyebrow */}
        <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-6 text-[10px] sm:text-xs md:text-sm font-medium tracking-[0.16em] sm:tracking-[0.25em] uppercase text-[#C6A875]">
          <span>STARK PROPERTIES</span>
          <span aria-hidden="true" className="opacity-60">/</span>
          <span>THOUGHTFULLY DESIGNED LIVING</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-[#F8F9FA] mb-6 leading-[1.08] [text-wrap:balance]">
          Spaces That <span className="font-normal text-white">Move You.</span>
        </h1>

        {/* Supporting Copy */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl font-normal text-[#B8BDB7] leading-relaxed mb-10 [text-wrap:balance]">
          Discover thoughtfully designed residences where architecture, nature, and everyday living come together.
        </p>

        {/* Primary and Secondary Action Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-16">
          <button
            onClick={onExploreClick}
            className="px-8 py-3.5 rounded-full text-sm font-medium tracking-wide text-white bg-[#315844] hover:bg-[#284837] active:scale-[0.98] transition-all duration-200 shadow-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Explore Residences
          </button>
          <button
            onClick={scrollToPhilosophy}
            className="px-6 py-3.5 rounded-full text-sm font-medium tracking-wide text-[#F8F9FA] border border-white/20 hover:border-white/50 hover:bg-white/5 active:scale-[0.98] transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Our Philosophy
          </button>
        </div>
      </div>

      {/* Floating Search Widget */}
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <form
          onSubmit={handleSearchSubmit}
          className="glass-obsidian rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-xl border border-white/10"
          aria-label="Property Search Filter"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
            {/* Field 1: Location */}
            <div className="space-y-1.5">
              <label htmlFor="hero-location" className="block text-xs uppercase tracking-wider font-medium text-[#B8BDB7]">
                Location
              </label>
              <select
                id="hero-location"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-[#14251D]/90 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-[#F8F9FA] focus:outline-none focus:border-[#C6A875] transition-colors cursor-pointer"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc} className="bg-[#202522] text-[#F8F9FA]">
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Field 2: Property Type */}
            <div className="space-y-1.5">
              <label htmlFor="hero-type" className="block text-xs uppercase tracking-wider font-medium text-[#B8BDB7]">
                Residence Type
              </label>
              <select
                id="hero-type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-[#14251D]/90 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-[#F8F9FA] focus:outline-none focus:border-[#C6A875] transition-colors cursor-pointer"
              >
                {PROPERTY_TYPES.map((type) => (
                  <option key={type} value={type} className="bg-[#202522] text-[#F8F9FA]">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Field 3: Budget Range */}
            <div className="space-y-1.5">
              <label htmlFor="hero-budget" className="block text-xs uppercase tracking-wider font-medium text-[#B8BDB7]">
                Budget Range
              </label>
              <select
                id="hero-budget"
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full bg-[#14251D]/90 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-[#F8F9FA] focus:outline-none focus:border-[#C6A875] transition-colors cursor-pointer"
              >
                {BUDGET_RANGES.map((b) => (
                  <option key={b} value={b} className="bg-[#202522] text-[#F8F9FA]">
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-3 lg:col-span-1 pt-2 sm:pt-0">
              <button
                type="submit"
                className="w-full h-[42px] inline-flex items-center justify-center gap-2 px-5 rounded-xl text-sm font-semibold text-white bg-[#315844] hover:bg-[#284837] active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A875]"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </form>

        {/* Minimal Scroll Indicator */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={scrollToPhilosophy}
            className="flex flex-col items-center gap-2 text-xs font-light tracking-widest uppercase text-[#B8BDB7] hover:text-[#F8F9FA] transition-colors focus:outline-none"
            aria-label="Scroll to discover philosophy"
          >
            <span>Scroll</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce opacity-70" />
          </button>
        </div>
      </div>
    </section>
  );
};
