import React from 'react';

const STEPS = [
  {
    step: '01',
    title: 'Discover',
    description: 'Explore a curated collection and find the residences that fit your aspirations.',
    detail: 'Browse through our bespoke portfolio of villas, urban penthouses, and nature retreats, curated with architectural fidelity.',
  },
  {
    step: '02',
    title: 'Connect',
    description: 'Speak with our team to understand the property, specifications, and available options.',
    detail: 'Schedule a tailored conversation with our architectural consultants to examine drawings, siting, and material selections.',
  },
  {
    step: '03',
    title: 'Experience',
    description: 'Arrange a private visit and experience the space, materials, and surroundings in person.',
    detail: 'Walk through private pavilions, touch authentic stone and timber textures, and observe light across different times of day.',
  },
  {
    step: '04',
    title: 'Move Forward',
    description: 'Receive clear guidance through the next steps, documentation, and ownership process.',
    detail: 'Experience transparent, unhurried guidance through every milestone, deed documentation, and bespoke handover.',
  },
];

export const CustomerJourney: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#202522] text-[#F8F9FA] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-[#C6A875] block mb-3">
            A MORE CONSIDERED WAY HOME
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-tight [text-wrap:balance]">
            From first discovery to <span className="font-normal">feeling at home.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#B8BDB7] leading-relaxed">
            Our private consultation process is designed to be calm, transparent, and focused around your lifestyle needs.
          </p>
        </div>

        {/* Timeline: Desktop horizontal staggered, mobile vertical */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
          {STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="relative flex flex-col justify-between p-6 rounded-2xl bg-[#292E2A]/40 border border-white/8 hover:border-[#C6A875]/40 transition-all duration-300 group"
            >
              {/* Step Number with Fine Line */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl sm:text-4xl font-light font-mono text-[#C6A875] group-hover:text-white transition-colors">
                    {step.step}
                  </span>
                  <span className="text-[10px] tracking-widest uppercase text-[#B8BDB7]/60 font-mono">
                    Phase {idx + 1}
                  </span>
                </div>

                <h3 className="text-xl font-medium text-white mb-2 group-hover:text-[#C6A875] transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm font-normal text-[#F8F9FA] leading-relaxed mb-4">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 text-xs text-[#B8BDB7] leading-relaxed">
                {step.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
