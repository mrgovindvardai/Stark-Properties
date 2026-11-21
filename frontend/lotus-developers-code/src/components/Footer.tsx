import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { validateNewsletterEmail } from '../utils/validation';
import { subscribe } from '../api';
import { ContactMethod } from '../utils/validation';
import { BrandMark } from './BrandMark';
import { PolicyDocument } from './PolicyDialog';

interface FooterProps {
  onSelectContactMethod: (method: ContactMethod) => void;
  onOpenPolicy: (document: PolicyDocument) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectContactMethod, onOpenPolicy }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateNewsletterEmail(email);
    if (!result.isValid) {
      setError(result.error || 'Please enter a valid email.');
      return;
    }

    setError('');
    setIsSubmitting(true);
    try {
      await subscribe(email.trim());
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'We could not save your subscription. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#202522] text-[#F8F9FA] border-t border-white/10 pt-20 pb-24 md:pb-16 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Section: Newsletter & Brand Message */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-6 space-y-4">
            {/* Wordmark and Tagline */}
            <div className="group inline-flex"><BrandMark size="footer" /></div>

            <p className="text-sm text-[#B8BDB7] max-w-md leading-relaxed">
              Thoughtfully designed residences for people who value architecture, comfort, nature, and contemporary living.
            </p>
            <p className="text-xs font-mono text-[#C6A875] tracking-widest uppercase">
              Spaces That Move You.
            </p>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-lg font-light text-white">
              Thoughtful spaces. Occasional updates.
            </h3>
            <p className="text-xs text-[#B8BDB7] leading-relaxed max-w-md">
              Receive updates about our developments, architectural essays, and newly commissioned residences.
            </p>

            {success ? (
              <div className="flex items-center gap-2 p-3.5 rounded-xl bg-[#14251D] border border-[#315844] text-xs text-[#F8F9FA]">
                <Check className="w-4 h-4 text-[#C6A875]" />
                <span>Thank you. You are now subscribed to Stark Properties updates (demonstration confirmation).</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2 max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Your email address"
                    aria-label="Newsletter email address"
                    className="flex-1 bg-[#14251D] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#626861] focus:outline-none focus:border-[#C6A875] transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold text-white bg-[#315844] hover:bg-[#284837] transition-all cursor-pointer whitespace-nowrap"
                  >
                    {isSubmitting ? 'Subscribing…' : 'Subscribe'}
                  </button>
                </div>
                {error && <p className="text-xs text-[#A83D35]">{error}</p>}
              </form>
            )}
          </div>
        </div>

        {/* Links Navigation Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-xs text-[#B8BDB7]">
          <div className="space-y-3">
            <span className="font-semibold uppercase tracking-wider text-white">Residences</span>
            <ul className="space-y-2">
              <li><a href="#residences" className="hover:text-white transition-colors">Contemporary Villas</a></li>
              <li><a href="#residences" className="hover:text-white transition-colors">Nature Retreats</a></li>
              <li><a href="#residences" className="hover:text-white transition-colors">Urban Residences</a></li>
              <li><a href="#signature" className="hover:text-white transition-colors">The Obsidian Residence</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="font-semibold uppercase tracking-wider text-white">Locations</span>
            <ul className="space-y-2">
              <li><span className="text-[#F8F9FA]">Bengaluru, Karnataka</span></li>
              <li><span className="text-[#F8F9FA]">Mysuru, Karnataka</span></li>
              <li><span className="text-[#F8F9FA]">Hubballi, Karnataka</span></li>
              <li><span className="text-[#B8BDB7]/70">Upcoming Siting</span></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="font-semibold uppercase tracking-wider text-white">Philosophy</span>
            <ul className="space-y-2">
              <li><a href="#philosophy" className="hover:text-white transition-colors">Considered Architecture</a></li>
              <li><a href="#philosophy" className="hover:text-white transition-colors">Nature in Balance</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Material Authenticity</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Private Advisory</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="font-semibold uppercase tracking-wider text-white">Connect</span>
            <ul className="space-y-2">
              <li><button type="button" onClick={() => onSelectContactMethod('phone')} className="hover:text-white transition-colors text-left">Request a phone call</button></li>
              <li><button type="button" onClick={() => onSelectContactMethod('email')} className="hover:text-white transition-colors text-left">Request an email response</button></li>
              <li><button type="button" onClick={() => onSelectContactMethod('whatsapp')} className="hover:text-white transition-colors text-left">Request WhatsApp follow-up</button></li>
              <li><a href="#inquiry" className="hover:text-white transition-colors">Schedule Consultation</a></li>
            </ul>
          </div>
        </div>

        {/* Legal Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#B8BDB7]/70 gap-4">
          <p>© {currentYear} STARK PROPERTIES. All rights reserved. Designed with intention. Built around life.</p>
          <div className="flex items-center gap-6">
            <button type="button" onClick={() => onOpenPolicy('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
            <span aria-hidden="true">·</span>
            <button type="button" onClick={() => onOpenPolicy('terms')} className="hover:text-white transition-colors">Terms of Use</button>
            <span aria-hidden="true">·</span>
            <span className="text-[#C6A875]">Demonstration Showcase</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
