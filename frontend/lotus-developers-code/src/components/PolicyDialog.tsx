import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export type PolicyDocument = 'privacy' | 'terms';

interface PolicyDialogProps {
  document: PolicyDocument | null;
  onClose: () => void;
}

export const PolicyDialog: React.FC<PolicyDialogProps> = ({ document, onClose }) => {
  useEffect(() => {
    if (!document) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [document, onClose]);

  if (!document) return null;

  const isPrivacy = document === 'privacy';

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="policy-dialog-title"
        className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#202522] p-6 text-[#F8F9FA] shadow-2xl sm:p-9"
      >
        <button type="button" onClick={onClose} aria-label="Close notice" className="absolute right-4 top-4 rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white">
          <X className="h-5 w-5" />
        </button>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#C6A875]">Stark Properties · Demo</p>
        <h2 id="policy-dialog-title" className="mb-5 pr-10 text-2xl font-light sm:text-3xl">
          {isPrivacy ? 'Privacy notice' : 'Terms of use'}
        </h2>
        {isPrivacy ? (
          <div className="space-y-4 text-sm leading-relaxed text-[#B8BDB7]">
            <p>When you send an enquiry, this demonstration app saves your name, email, phone number, property preferences, contact method, message, and any selected property in its Django database. Newsletter signup saves your email address separately.</p>
            <p>These records are visible to authorized site administrators in Django Admin so they can review submissions. The app does not automatically send email, phone, or WhatsApp messages.</p>
            <p>Only submit contact information you are comfortable storing in this demonstration project. Replace this notice with your organization’s approved privacy policy before using the site with real visitors.</p>
          </div>
        ) : (
          <div className="space-y-4 text-sm leading-relaxed text-[#B8BDB7]">
            <p>This website is a demonstration. The sample residences, availability, prices, dimensions, photos, and architectural descriptions are illustrative and are not verified property offers.</p>
            <p>Submitting an enquiry records a request for follow-up. It does not reserve a property, create a purchase agreement, or guarantee availability or pricing.</p>
            <p>Replace this demo notice and all sample listing information with approved business details and terms before public launch.</p>
          </div>
        )}
        <button type="button" onClick={onClose} className="mt-8 rounded-full border border-white/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:border-white/40 hover:bg-white/5">Close</button>
      </section>
    </div>
  );
};
