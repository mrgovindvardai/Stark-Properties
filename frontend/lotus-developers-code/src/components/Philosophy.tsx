import React from 'react';

interface PhilosophyProps {
  image: string;
}

export const Philosophy: React.FC<PhilosophyProps> = ({ image }) => {
  return (
    <section id="philosophy" className="py-24 sm:py-32 bg-[#F3EFE5] text-[#202522] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Philosophy & 3 Principles */}
          <div className="lg:col-span-7 space-y-8">
            <div className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-[#315844]">
              OUR PHILOSOPHY
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#202522] leading-[1.15] [text-wrap:balance]">
              A home should do more than look beautiful. <span className="font-normal font-editorial italic">It should make life feel better.</span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#626861] leading-relaxed max-w-2xl">
              <p>
                We believe the best homes are shaped around the way people live. The morning light, the quiet corners, the materials you touch, and the connection between indoor and outdoor spaces all influence how a place feels.
              </p>
              <p>
                At Stark Properties, thoughtful planning, architectural clarity, and a connection to nature guide the experience we aspire to create.
              </p>
            </div>

            {/* Three Principles */}
            <div className="pt-6 border-t border-[#202522]/10 space-y-6">
              <div className="group">
                <div className="flex items-baseline gap-4">
                  <span className="text-xs font-mono font-medium text-[#C6A875]">01</span>
                  <h3 className="text-lg font-medium text-[#202522]">Considered Architecture</h3>
                </div>
                <p className="mt-1 text-sm text-[#626861] pl-8">
                  Every detail begins with a clear purpose.
                </p>
              </div>

              <div className="group">
                <div className="flex items-baseline gap-4">
                  <span className="text-xs font-mono font-medium text-[#C6A875]">02</span>
                  <h3 className="text-lg font-medium text-[#202522]">Nature in Balance</h3>
                </div>
                <p className="mt-1 text-sm text-[#626861] pl-8">
                  Light, greenery, and natural materials shape the experience.
                </p>
              </div>

              <div className="group">
                <div className="flex items-baseline gap-4">
                  <span className="text-xs font-mono font-medium text-[#C6A875]">03</span>
                  <h3 className="text-lg font-medium text-[#202522]">Designed for Living</h3>
                </div>
                <p className="mt-1 text-sm text-[#626861] pl-8">
                  Spaces planned around comfort, privacy, and everyday rituals.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] bg-[#202522]/5">
              <img
                src={image}
                alt="Open-air courtyard architecture balancing natural light and indigenous greenery"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-xs tracking-wide">
                <span className="text-[#C6A875] font-mono">CONCEPT RESIDENCE</span>
                <p className="text-sm font-medium mt-1">Light, courtyards, and organic materials in dialogue.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
