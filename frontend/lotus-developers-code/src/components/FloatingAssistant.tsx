import React, { useState, useEffect } from 'react';
import { HelpCircle, X, Phone, Mail, MessageSquare, ArrowRight } from 'lucide-react';
import { ContactMethod } from '../utils/validation';

interface FloatingAssistantProps {
  onOpenConsultation: (method: ContactMethod) => void;
}

export const FloatingAssistant: React.FC<FloatingAssistantProps> = ({ onOpenConsultation }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <aside aria-label="Stark Advisory Assistant" className="fixed bottom-6 right-6 z-40 hidden md:block">
      {/* Floating Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-labelledby="assistant-title"
          className="absolute bottom-14 right-0 w-[320px] sm:w-[360px] glass-obsidian rounded-2xl p-6 border border-white/15 shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#C6A875]">
                STARK ADVISORY
              </span>
              <h4 id="assistant-title" className="text-base font-medium text-white">
                How may we assist?
              </h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-[#B8BDB7] hover:text-white transition-colors cursor-pointer"
              aria-label="Close Advisory Panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#B8BDB7] leading-relaxed mb-5">
            Connect directly with an architectural specialist for private inquiries, floor plan briefings, or bespoke viewing appointments.
          </p>

          {/* Quick Actions */}
          <div className="space-y-2 mb-5">
            <button
              type="button"
              onClick={() => { setIsOpen(false); onOpenConsultation('phone'); }}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-[#202522] border border-white/5 hover:border-white/20 text-xs text-[#F8F9FA] transition-all"
            >
              <Phone className="w-4 h-4 text-[#C6A875] shrink-0" />
              <span>Request a phone call</span>
            </button>
            <button
              type="button"
              onClick={() => { setIsOpen(false); onOpenConsultation('email'); }}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-[#202522] border border-white/5 hover:border-white/20 text-xs text-[#F8F9FA] transition-all"
            >
              <Mail className="w-4 h-4 text-[#C6A875] shrink-0" />
              <span className="truncate">Request an email response</span>
            </button>
            <button
              type="button"
              onClick={() => { setIsOpen(false); onOpenConsultation('whatsapp'); }}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-[#202522] border border-white/5 hover:border-white/20 text-xs text-[#F8F9FA] transition-all text-left"
            >
              <MessageSquare className="w-4 h-4 text-[#C6A875] shrink-0" />
              <span>Request WhatsApp follow-up</span>
            </button>
          </div>

          {/* Consultation Shortcut */}
          <button
            onClick={() => {
              setIsOpen(false);
              onOpenConsultation('whatsapp');
            }}
            className="w-full py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider font-semibold text-white bg-[#A83D35] hover:bg-[#8f322b] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <span>Schedule Private Consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium text-white glass-obsidian hover:bg-[#202522] border border-white/15 shadow-xl transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A875]"
        aria-expanded={isOpen}
        aria-label="Toggle Stark Advisory guidance panel"
      >
        <HelpCircle className="w-4 h-4 text-[#C6A875]" />
        <span>Need guidance?</span>
      </button>
    </aside>
  );
};
