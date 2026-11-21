import React, { useEffect, useState } from 'react';
import { X, ArrowRight, Bed, Bath, Square, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Property } from '../data/properties';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  onSelectForInquiry: (property: Property) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  onSelectForInquiry,
}) => {
  const [activeImage, setActiveImage] = useState(0);
  const images = property ? [...new Set([property.image, ...(property.images ?? [])])] : [];

  useEffect(() => {
    setActiveImage(0);
  }, [property?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (property) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [property, onClose]);

  if (!property) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-property-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-4xl bg-[#202522] text-[#F8F9FA] rounded-2xl overflow-hidden border border-white/10 shadow-2xl my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/90 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Close residence details modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content Scroll Area */}
        <div className="overflow-y-auto flex-1">
          {/* Hero Image Container */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-[#14251D] overflow-hidden">
            <img
              src={images[activeImage] || property.image}
              alt={`${property.name}${images.length > 1 ? ` — photo ${activeImage + 1}` : ''}`}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = '/static/images/architecture-placeholder.svg';
              }}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#202522] via-[#202522]/30 to-transparent" />
            <div className="absolute bottom-6 left-6 sm:left-8 right-6">
              <span className="text-xs font-mono font-medium tracking-widest uppercase text-[#C6A875]">
                {property.eyebrow}
              </span>
              <h2 id="modal-property-title" className="text-2xl sm:text-4xl font-light text-white mt-1">
                {property.name}
              </h2>
            </div>
          </div>

          {images.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto px-6 sm:px-8 py-3 bg-[#202522] border-b border-white/10" aria-label="Property photo gallery">
              <button type="button" onClick={() => setActiveImage((activeImage - 1 + images.length) % images.length)} className="shrink-0 p-2 rounded-full border border-white/15 hover:bg-white/10" aria-label="Previous photo">
                <ChevronLeft className="w-4 h-4" />
              </button>
              {images.map((image, index) => (
                <button key={image} type="button" onClick={() => setActiveImage(index)} className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 ${activeImage === index ? 'border-[#C6A875]' : 'border-transparent opacity-70 hover:opacity-100'}`} aria-label={`Show photo ${index + 1}`} aria-pressed={activeImage === index}>
                  <img src={image} alt="" className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
              <button type="button" onClick={() => setActiveImage((activeImage + 1) % images.length)} className="shrink-0 p-2 rounded-full border border-white/15 hover:bg-white/10" aria-label="Next photo">
                <ChevronRight className="w-4 h-4" />
              </button>
              <span className="ml-auto shrink-0 text-xs text-[#B8BDB7]">{activeImage + 1} / {images.length}</span>
            </div>
          )}

          <div className="p-6 sm:p-8 space-y-8">
            {/* Meta Row: Location, Category, Price */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div className="flex items-center gap-2 text-sm text-[#B8BDB7]">
                <MapPin className="w-4 h-4 text-[#C6A875] shrink-0" />
                <span>{property.address ? `${property.address}, ` : ''}{property.location}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#F8F9FA]">{property.category}</span>
              </div>
              <div className="text-xl sm:text-2xl font-light text-[#C6A875]">
                {property.priceLabel}
              </div>
            </div>

            {/* Specifications Bar */}
            <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-[#292E2A] border border-white/5 text-center">
              <div>
                <div className="flex items-center justify-center gap-1.5 text-xs text-[#B8BDB7] mb-1">
                  <Bed className="w-4 h-4 text-[#C6A875]" />
                  <span>Bedrooms</span>
                </div>
                <div className="text-base font-medium text-white">
                  {property.bedrooms ? `${property.bedrooms} Beds` : 'Custom layout'}
                </div>
              </div>
              <div className="border-x border-white/10">
                <div className="flex items-center justify-center gap-1.5 text-xs text-[#B8BDB7] mb-1">
                  <Bath className="w-4 h-4 text-[#C6A875]" />
                  <span>Bathrooms</span>
                </div>
                <div className="text-base font-medium text-white">
                  {property.bathrooms ? `${property.bathrooms} Baths` : 'En-suite'}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1.5 text-xs text-[#B8BDB7] mb-1">
                  <Square className="w-4 h-4 text-[#C6A875]" />
                  <span>Area</span>
                </div>
                <div className="text-base font-medium text-white">
                  {property.areaSqFt ? `~${property.areaSqFt.toLocaleString()} sq. ft.` : 'On request'}
                </div>
              </div>
            </div>

            {/* Description & Architectural Philosophy */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold tracking-wider uppercase text-[#B8BDB7]">
                Architectural Intent
              </h3>
              <p className="text-base sm:text-lg text-[#F8F9FA] leading-relaxed">
                {property.description}
              </p>
              <div className="p-4 rounded-xl bg-[#14251D]/60 border border-[#315844]/40 text-sm text-[#B8BDB7] italic">
                "{property.architecturalNote}"
              </div>
            </div>

            {/* Highlights List */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold tracking-wider uppercase text-[#B8BDB7]">
                Key Specifications & Craftsmanship
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {property.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-2.5 text-sm text-[#B8BDB7]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6A875] mt-2 shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Illustrative Notice */}
            <p className="text-xs text-[#B8BDB7]/70 italic pt-2">
              Note: Project concepts, dimensions, and visual renderings are architectural illustrations created for demonstration purposes.
            </p>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-6 bg-[#292E2A] border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium text-[#B8BDB7] hover:text-white transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onSelectForInquiry(property);
              onClose();
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold text-white bg-[#A83D35] hover:bg-[#8f322b] transition-all shadow-md cursor-pointer"
          >
            <span>Request Private Consultation for this Residence</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
