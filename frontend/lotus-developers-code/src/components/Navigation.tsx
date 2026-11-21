import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { BrandMark } from './BrandMark';

interface NavigationProps {
  onOpenInquiry: (propertyName?: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenInquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-obsidian shadow-lg shadow-black/20 py-3.5'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between gap-8">
          {/* Original Stark Properties architectural monogram */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('hero');
            }}
            className="flex items-center gap-3 text-white group cursor-pointer shrink-0"
            aria-label="Stark Properties Home"
          >
            <BrandMark />
          </a>

          {/* Zone 2: 4 nav links, single line */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#B8BDB7]" aria-label="Main Navigation">
            <button
              onClick={() => scrollTo('residences')}
              className="hover:text-white transition-colors cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A875]"
            >
              Residences
            </button>
            <button
              onClick={() => scrollTo('signature')}
              className="hover:text-white transition-colors cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A875]"
            >
              Developments
            </button>
            <button
              onClick={() => scrollTo('philosophy')}
              className="hover:text-white transition-colors cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A875]"
            >
              Our Philosophy
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="hover:text-white transition-colors cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A875]"
            >
              About Us
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => onOpenInquiry()}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2 text-xs uppercase tracking-wider font-semibold text-white bg-[#A83D35] hover:bg-[#8f322b] rounded-full transition-all duration-200 shadow-sm cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Enquire
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#F8F9FA] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile slide-down menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#202522]/98 backdrop-blur-2xl md:hidden pt-24 px-8 pb-10 flex flex-col justify-between animate-in fade-in duration-200">
          <div className="flex flex-col space-y-6 text-xl font-light">
            <button
              onClick={() => scrollTo('residences')}
              className="text-left text-[#F8F9FA] hover:text-[#C6A875] py-2 border-b border-white/10 transition-colors"
            >
              Residences
            </button>
            <button
              onClick={() => scrollTo('signature')}
              className="text-left text-[#F8F9FA] hover:text-[#C6A875] py-2 border-b border-white/10 transition-colors"
            >
              Developments
            </button>
            <button
              onClick={() => scrollTo('philosophy')}
              className="text-left text-[#F8F9FA] hover:text-[#C6A875] py-2 border-b border-white/10 transition-colors"
            >
              Our Philosophy
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="text-left text-[#F8F9FA] hover:text-[#C6A875] py-2 border-b border-white/10 transition-colors"
            >
              About Us
            </button>
          </div>

          <div className="pt-8">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="w-full py-3.5 px-6 rounded-full text-center text-sm uppercase tracking-wider font-medium text-white bg-[#A83D35] hover:bg-[#8f322b] transition-colors"
            >
              Request a Consultation
            </button>
            <p className="mt-4 text-xs text-center text-[#B8BDB7]">
              Designed with intention. Built around life.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
