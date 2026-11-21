import React, { useEffect, useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Philosophy } from './components/Philosophy';
import { PropertyGallery } from './components/PropertyGallery';
import { SignatureDevelopment } from './components/SignatureDevelopment';
import { CustomerJourney } from './components/CustomerJourney';
import { ArchitecturalDetails } from './components/ArchitecturalDetails';
import { InquirySection } from './components/InquirySection';
import { TrustSection } from './components/TrustSection';
import { Footer } from './components/Footer';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { FloatingAssistant } from './components/FloatingAssistant';
import { MobileActionBar } from './components/MobileActionBar';

import { Property } from './data/properties';
import { FilterCriteria } from './utils/propertyFilter';
import { loadProperties, prepareCsrf } from './api';
import { ContactMethod } from './utils/validation';

export function App() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const [propertiesError, setPropertiesError] = useState('');
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({
    category: 'All Residences',
    location: 'All Locations',
    propertyType: 'All Residences',
    budgetRange: 'Any Budget',
    searchQuery: '',
  });

  const [activeModalProperty, setActiveModalProperty] = useState<Property | null>(null);
  const [preSelectedPropertyForInquiry, setPreSelectedPropertyForInquiry] = useState<Property | null>(null);
  const [requestedContactMethod, setRequestedContactMethod] = useState<ContactMethod | undefined>();
  const featuredProperty = properties.find((property) => property.featured) || properties[0];
  const galleryImages = properties.map((property) => property.image);
  const heroImage = featuredProperty?.image || '/static/images/architecture-placeholder.svg';
  const philosophyImage = featuredProperty?.images?.[0] || heroImage;
  const signatureImage = featuredProperty?.images?.[1] || featuredProperty?.image || heroImage;

  useEffect(() => {
    prepareCsrf().catch(() => undefined);
    loadProperties()
      .then(setProperties)
      .catch((error: Error) => setPropertiesError(error.message))
      .finally(() => setPropertiesLoading(false));
  }, []);

  const scrollToResidences = () => {
    const el = document.getElementById('residences');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToInquiry = (property?: Property, contactMethod?: ContactMethod) => {
    if (property) {
      setPreSelectedPropertyForInquiry(property);
    }
    if (contactMethod) setRequestedContactMethod(contactMethod);
    const el = document.getElementById('inquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHeroSearch = (criteria: FilterCriteria) => {
    setFilterCriteria((prev) => ({
      ...prev,
      ...criteria,
    }));
    scrollToResidences();
  };

  return (
    <div className="min-h-screen bg-[#202522] text-[#F8F9FA] flex flex-col font-sans selection:bg-[#315844] selection:text-white">
      {/* 1. Global Navigation */}
      <Navigation onOpenInquiry={() => scrollToInquiry()} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Hero Section with Balanced Scrim and Search Bar */}
        <Hero
          onSearch={handleHeroSearch}
          onExploreClick={scrollToResidences}
          backgroundImage={heroImage}
        />

        {/* 3. Brand Story & Editorial Philosophy */}
        <Philosophy image={philosophyImage} />

        {/* 4. Curated Property Discovery Gallery */}
        <PropertyGallery
          properties={properties}
          activeCriteria={filterCriteria}
          onFilterChange={setFilterCriteria}
          onSelectProperty={(prop) => setActiveModalProperty(prop)}
          loading={propertiesLoading}
          loadError={propertiesError}
        />

        {/* 5. Signature Development — The Obsidian Residence */}
        <SignatureDevelopment
          image={signatureImage}
          onExploreClick={() => {
            const featured = properties.find((p) => p.featured) || properties[0];
            scrollToInquiry(featured);
          }}
        />

        {/* 6. Customer Journey Visual Timeline */}
        <CustomerJourney />

        {/* 7. Architectural Details & Craftsmanship Stories */}
        <ArchitecturalDetails images={galleryImages} />

        {/* 8. Trust and Brand Credibility */}
        <TrustSection />

        {/* 9. Inquiry and Private Consultation Form */}
        <InquirySection preSelectedProperty={preSelectedPropertyForInquiry} requestedContactMethod={requestedContactMethod} />
      </main>

      {/* 10. Footer & Newsletter */}
      <Footer onSelectContactMethod={(method) => scrollToInquiry(undefined, method)} />

      {/* 11. Property Detail Modal */}
      <PropertyDetailModal
        property={activeModalProperty}
        onClose={() => setActiveModalProperty(null)}
        onSelectForInquiry={(property) => {
          scrollToInquiry(property);
        }}
      />

      {/* 12. Floating Advisory Assistant */}
      <FloatingAssistant onOpenConsultation={(method) => scrollToInquiry(undefined, method)} />

      {/* 13. Mobile Bottom Action Bar */}
      <MobileActionBar
        onExplore={scrollToResidences}
        onEnquire={() => scrollToInquiry()}
      />
    </div>
  );
}

export default App;
