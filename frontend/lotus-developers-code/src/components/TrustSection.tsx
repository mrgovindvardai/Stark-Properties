import React from 'react';
import { Compass, Eye, Shield, Feather } from 'lucide-react';

const PILLARS = [
  {
    icon: Compass,
    title: 'Architectural Integrity',
    description: 'We do not build generic boxes. Each residence is proportioned around climate, natural cross-ventilation, and how sunlight travels through the rooms.',
  },
  {
    icon: Eye,
    title: 'Transparent Discovery',
    description: 'Accurate floor areas, clear material provenance, and unvarnished structural information. We provide genuine clarity without speculative claims.',
  },
  {
    icon: Feather,
    title: 'Tactile, Enduring Materials',
    description: 'Natural stone, sustainably harvested timber, honest concrete, and glass that develop character with age, resisting superficial trends.',
  },
  {
    icon: Shield,
    title: 'Considered Relationships',
    description: 'A private viewing and consultation experience guided by design specialists, never aggressive sales funnels or manufactured urgency.',
  },
];

export const TrustSection: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-[#202522] text-[#F8F9FA] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-[#C6A875] block mb-3">
            OUR COMMITMENT
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight [text-wrap:balance]">
            Built around <span className="font-normal">what matters.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#B8BDB7] leading-relaxed">
            We measure value by how well a space supports life—its quietness, proportion, connection to nature, and enduring craftsmanship.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-8 rounded-2xl bg-[#292E2A]/50 border border-white/8 flex flex-col justify-between space-y-6"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#315844]/30 border border-[#315844]/60 flex items-center justify-center text-[#C6A875] mb-6">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#B8BDB7] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 text-[11px] font-mono tracking-wider uppercase text-[#C6A875]/80">
                  Stark Standard
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
