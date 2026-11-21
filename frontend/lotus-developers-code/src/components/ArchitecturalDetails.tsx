import React from 'react';

const STORIES = [
  {
    title: 'Light, thoughtfully placed.',
    subtitle: 'Light and Shadow',
    description: 'Daylight becomes part of the architecture, shaping the atmosphere of each space as shadows move across honest materials throughout the day.',
    aspect: 'aspect-[4/3]',
  },
  {
    title: 'Materials with character.',
    subtitle: 'Natural Materials',
    description: 'Natural textures of rough-hewn basalt, hand-finished lime plaster, and warm teak create a visual language that feels calm, enduring, and tactile.',
    aspect: 'aspect-[3/4]',
  },
  {
    title: 'A closer connection to nature.',
    subtitle: 'Indoor–Outdoor Living',
    description: 'Landscaped spaces and outdoor connections soften the boundary between home and nature, bringing greenery directly into your daily routine.',
    aspect: 'aspect-[4/3]',
  },
  {
    title: 'Spaces for quiet moments.',
    subtitle: 'Sanctuary & Stillness',
    description: 'Generous private alcoves, recessed reading libraries, and reflection courtyards designed intentionally for personal reflection and stillness.',
    aspect: 'aspect-[3/4]',
  },
];

interface ArchitecturalDetailsProps {
  images: string[];
}

export const ArchitecturalDetails: React.FC<ArchitecturalDetailsProps> = ({ images }) => {
  return (
    <section className="py-24 sm:py-32 bg-[#F3EFE5] text-[#202522]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-[#315844] block mb-3">
            ARCHITECTURAL CRAFTSMANSHIP
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#202522] leading-tight [text-wrap:balance]">
            Considered down to <span className="font-editorial italic font-normal">the details.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#626861] leading-relaxed">
            Every material, aperture, and corner is designed with proportion, acoustic comfort, and tactile elegance in mind.
          </p>
        </div>

        {/* Stories Grid: Varied aspect ratios and editorial alignment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {STORIES.map((story, idx) => (
            <div
              key={story.title}
              className={`space-y-6 ${idx % 2 === 1 ? 'md:mt-16' : ''}`}
            >
              <div className={`relative rounded-2xl overflow-hidden shadow-xl bg-[#202522]/10 ${story.aspect}`}>
                <img
                  src={images[idx] || '/static/images/architecture-placeholder.svg'}
                  alt={story.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = '/static/images/architecture-placeholder.svg';
                  }}
                />
                <div className="absolute top-4 left-4">
                  <span className="text-[11px] font-mono tracking-wider uppercase text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full">
                    {story.subtitle}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-light text-[#202522]">
                  {story.title}
                </h3>
                <p className="text-base text-[#626861] leading-relaxed">
                  {story.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
