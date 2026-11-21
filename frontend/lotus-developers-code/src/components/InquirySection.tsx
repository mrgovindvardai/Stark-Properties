import React, { useState, useEffect } from 'react';
import { CheckCircle2, Phone, Mail, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';
import { validateInquiryForm, InquiryFormData } from '../utils/validation';
import { LOCATIONS, PROPERTY_TYPES, BUDGET_RANGES, Property } from '../data/properties';
import { sendInquiry } from '../api';
import { ContactMethod } from '../utils/validation';

interface InquirySectionProps {
  preSelectedProperty?: Property | null;
  requestedContactMethod?: ContactMethod;
  onOpenPrivacyNotice: () => void;
}

export const InquirySection: React.FC<InquirySectionProps> = ({ preSelectedProperty, requestedContactMethod, onOpenPrivacyNotice }) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    email: '',
    phone: '',
    preferredLocation: 'Bengaluru',
    propertyType: 'Villa',
    budget: '₹2 Crore+',
    contactMethod: 'whatsapp',
    message: '',
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [submitError, setSubmitError] = useState('');

  // When a property is selected externally (e.g. from modal), pre-fill fields
  useEffect(() => {
    if (preSelectedProperty) {
      const price = preSelectedProperty.priceNumeric;
      const budget = price === null || price > 20000000
        ? '₹2 Crore+'
        : price > 10000000
          ? '₹1–2 Crore'
          : price >= 5000000
            ? '₹50 Lakh–₹1 Crore'
            : 'Under ₹50 Lakh';
      setFormData((prev) => ({
        ...prev,
        preferredLocation: preSelectedProperty.city,
        propertyType: preSelectedProperty.propertyType,
        budget,
        message: `I would like to request a private viewing consultation for ${preSelectedProperty.name} in ${preSelectedProperty.location}.`,
      }));
    }
  }, [preSelectedProperty]);

  useEffect(() => {
    if (requestedContactMethod) {
      setFormData((prev) => ({ ...prev, contactMethod: requestedContactMethod }));
    }
  }, [requestedContactMethod]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear inline error on edit
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validation = validateInquiryForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSubmitError('');
    try {
      const result = await sendInquiry(formData, preSelectedProperty?.id);
      setReferenceId(result.referenceId);
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'We could not send your inquiry. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      preferredLocation: 'Bengaluru',
      propertyType: 'Villa',
      budget: '₹2 Crore+',
      contactMethod: 'whatsapp',
      message: '',
      consent: false,
    });
    setIsSubmitted(false);
    setReferenceId('');
    setErrors({});
    setSubmitError('');
  };

  return (
    <section id="inquiry" className="py-24 sm:py-32 bg-[#14251D] text-[#F8F9FA] relative overflow-hidden">
      {/* Subtle organic light backdrop */}
      <div className="absolute inset-0 bg-radial from-[#315844]/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-[#C6A875] block mb-3">
            PRIVATE CONSULTATION
          </span>
          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight leading-tight [text-wrap:balance]">
            Your next chapter starts with <span className="font-normal">a conversation.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#B8BDB7] leading-relaxed [text-wrap:balance]">
            Tell us what you are looking for. Our team will help you explore the right possibilities with clarity and architectural discretion.
          </p>
        </div>

        {/* Confirmation Screen */}
        {isSubmitted ? (
          <div className="max-w-xl mx-auto glass-obsidian rounded-2xl p-8 sm:p-10 border border-white/15 text-center shadow-2xl animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-[#315844]/30 border border-[#315844] flex items-center justify-center mx-auto mb-6 text-[#C6A875]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono font-medium text-[#C6A875] tracking-widest uppercase">
              Consultation Dossier Created
            </span>
            <h3 className="text-2xl font-light text-white mt-1 mb-3">
              Thank you, {formData.fullName}.
            </h3>

            <p className="text-sm text-[#B8BDB7] leading-relaxed mb-6">
              Your inquiry reference is <span className="font-mono text-white font-medium">{referenceId}</span>. We have recorded your preferences for a {formData.propertyType} in {formData.preferredLocation}.
            </p>

            <div className="p-4 rounded-xl bg-[#202522] border border-white/5 text-xs text-[#B8BDB7] text-left space-y-2 mb-6">
              <div className="flex justify-between">
                <span>Preferred Contact:</span>
                <span className="text-white capitalize">{formData.contactMethod}</span>
              </div>
              <div className="flex justify-between">
                <span>Contact Details:</span>
                <span className="text-white">{formData.email} · {formData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span>Budget Segment:</span>
                <span className="text-white">{formData.budget}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#202522]/60 border border-white/5 text-[11px] text-[#B8BDB7]/80 italic mb-6">
              Your request has been saved. Our team can follow up using your preferred contact method.
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold text-white border border-white/20 hover:border-white/50 hover:bg-white/5 transition-all cursor-pointer"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          /* Lead Capture Form */
          <div className="glass-obsidian rounded-3xl p-6 sm:p-10 lg:p-12 border border-white/12 shadow-2xl backdrop-blur-xl">
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label htmlFor="inquiry-fullName" className="block text-xs uppercase tracking-wider font-medium text-[#F8F9FA]">
                    Full Name <span className="text-[#A83D35]">*</span>
                  </label>
                  <input
                    id="inquiry-fullName"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Devika Menon"
                    aria-required="true"
                    aria-invalid={Boolean(errors.fullName)}
                    className={`w-full bg-[#202522] border rounded-xl px-4 py-3 text-sm text-[#F8F9FA] placeholder-[#626861] focus:outline-none transition-colors ${
                      errors.fullName ? 'border-[#A83D35] ring-1 ring-[#A83D35]' : 'border-white/15 focus:border-[#C6A875]'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-[#A83D35] mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label htmlFor="inquiry-email" className="block text-xs uppercase tracking-wider font-medium text-[#F8F9FA]">
                    Email Address <span className="text-[#A83D35]">*</span>
                  </label>
                  <input
                    id="inquiry-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="devika@example.com"
                    aria-required="true"
                    aria-invalid={Boolean(errors.email)}
                    className={`w-full bg-[#202522] border rounded-xl px-4 py-3 text-sm text-[#F8F9FA] placeholder-[#626861] focus:outline-none transition-colors ${
                      errors.email ? 'border-[#A83D35] ring-1 ring-[#A83D35]' : 'border-white/15 focus:border-[#C6A875]'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-[#A83D35] mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone Number with Country Code */}
                <div className="space-y-2">
                  <label htmlFor="inquiry-phone" className="block text-xs uppercase tracking-wider font-medium text-[#F8F9FA]">
                    Phone Number <span className="text-[#A83D35]">*</span>
                  </label>
                  <input
                    id="inquiry-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98450 12345"
                    aria-required="true"
                    aria-invalid={Boolean(errors.phone)}
                    className={`w-full bg-[#202522] border rounded-xl px-4 py-3 text-sm text-[#F8F9FA] placeholder-[#626861] focus:outline-none transition-colors ${
                      errors.phone ? 'border-[#A83D35] ring-1 ring-[#A83D35]' : 'border-white/15 focus:border-[#C6A875]'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-[#A83D35] mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Preferred Location */}
                <div className="space-y-2">
                  <label htmlFor="inquiry-location" className="block text-xs uppercase tracking-wider font-medium text-[#F8F9FA]">
                    Preferred Location <span className="text-[#A83D35]">*</span>
                  </label>
                  <select
                    id="inquiry-location"
                    name="preferredLocation"
                    value={formData.preferredLocation}
                    onChange={handleChange}
                    className="w-full bg-[#202522] border border-white/15 rounded-xl px-4 py-3 text-sm text-[#F8F9FA] focus:outline-none focus:border-[#C6A875] transition-colors cursor-pointer"
                  >
                    {LOCATIONS.filter((l) => l !== 'All Locations').map((loc) => (
                      <option key={loc} value={loc} className="bg-[#202522] text-[#F8F9FA]">
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Property Typology */}
                <div className="space-y-2">
                  <label htmlFor="inquiry-propertyType" className="block text-xs uppercase tracking-wider font-medium text-[#F8F9FA]">
                    Residence Typology <span className="text-[#A83D35]">*</span>
                  </label>
                  <select
                    id="inquiry-propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full bg-[#202522] border border-white/15 rounded-xl px-4 py-3 text-sm text-[#F8F9FA] focus:outline-none focus:border-[#C6A875] transition-colors cursor-pointer"
                  >
                    {PROPERTY_TYPES.filter((t) => t !== 'All Residences').map((type) => (
                      <option key={type} value={type} className="bg-[#202522] text-[#F8F9FA]">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Approximate Budget */}
                <div className="space-y-2">
                  <label htmlFor="inquiry-budget" className="block text-xs uppercase tracking-wider font-medium text-[#F8F9FA]">
                    Approximate Budget <span className="text-[#A83D35]">*</span>
                  </label>
                  <select
                    id="inquiry-budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full bg-[#202522] border border-white/15 rounded-xl px-4 py-3 text-sm text-[#F8F9FA] focus:outline-none focus:border-[#C6A875] transition-colors cursor-pointer"
                  >
                    {BUDGET_RANGES.filter((b) => b !== 'Any Budget').map((range) => (
                      <option key={range} value={range} className="bg-[#202522] text-[#F8F9FA]">
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Preferred Contact Method */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs uppercase tracking-wider font-medium text-[#F8F9FA]">
                  Preferred Method of Communication
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['whatsapp', 'email', 'phone'] as const).map((method) => {
                    const isSelected = formData.contactMethod === method;
                    return (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, contactMethod: method }))}
                        className={`py-2.5 px-4 rounded-xl border text-xs uppercase tracking-wider font-medium transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          isSelected
                            ? 'bg-[#315844] border-[#315844] text-white shadow-sm'
                            : 'bg-[#202522] border-white/10 text-[#B8BDB7] hover:border-white/20'
                        }`}
                      >
                        {method === 'whatsapp' && <MessageSquare className="w-3.5 h-3.5" />}
                        {method === 'email' && <Mail className="w-3.5 h-3.5" />}
                        {method === 'phone' && <Phone className="w-3.5 h-3.5" />}
                        <span className="capitalize">{method}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Message */}
              <div className="space-y-2">
                <label htmlFor="inquiry-message" className="block text-xs uppercase tracking-wider font-medium text-[#F8F9FA]">
                  Specific Architectural Requirements or Siting Requests (Optional)
                </label>
                <textarea
                  id="inquiry-message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share details such as preferred orientation, family space needs, or timelines..."
                  className="w-full bg-[#202522] border border-white/15 rounded-xl px-4 py-3 text-sm text-[#F8F9FA] placeholder-[#626861] focus:outline-none focus:border-[#C6A875] transition-colors"
                />
              </div>

              {/* Consent Checkbox */}
              <div className="space-y-1 pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 rounded border-white/20 bg-[#202522] text-[#A83D35] focus:ring-[#A83D35] cursor-pointer"
                  />
                  <span className="text-xs text-[#B8BDB7] leading-relaxed">
                    I agree to allow Stark Properties to contact me regarding this residential inquiry in accordance with our{' '}
                    <button type="button" onClick={onOpenPrivacyNotice} className="text-white underline hover:text-[#C6A875]">
                      Privacy Policy
                    </button>.
                  </span>
                </label>
                {errors.consent && (
                  <p className="text-xs text-[#A83D35] pl-7">{errors.consent}</p>
                )}
              </div>

              {/* Primary High-Intent Crimson Action Button */}
              <div className="pt-4">
                {submitError && <p className="mb-3 text-sm text-[#F2A39B]" role="alert">{submitError}</p>}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 rounded-full text-xs uppercase tracking-widest font-semibold text-white bg-[#A83D35] hover:bg-[#8f322b] active:scale-[0.99] disabled:opacity-60 transition-all duration-200 shadow-lg cursor-pointer flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {isSubmitting ? (
                    <span>Registering Consultation...</span>
                  ) : (
                    <>
                      <span>Request a Private Consultation</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Secondary Contact Bar */}
        <div className="mt-12 text-center text-sm text-[#B8BDB7]">
          <span>Choose phone, email, or WhatsApp above. Your request is saved for the Stark Properties team to follow up.</span>
        </div>
      </div>
    </section>
  );
};
