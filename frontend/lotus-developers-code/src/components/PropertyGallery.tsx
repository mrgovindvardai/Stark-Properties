import React, { useState } from 'react';
import { ArrowUpRight, Bed, Bath, Square, MapPin, RotateCcw } from 'lucide-react';
import { Property, CATEGORY_TABS, CategoryTab } from '../data/properties';
import { FilterCriteria, filterProperties } from '../utils/propertyFilter';

interface PropertyGalleryProps {
  properties: Property[];
  activeCriteria: FilterCriteria;
  onFilterChange: (newCriteria: FilterCriteria) => void;
  onSelectProperty: (property: Property) => void;
  loading?: boolean;
  loadError?: string;
}

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({
  properties,
  activeCriteria,
  onFilterChange,
  onSelectProperty,
  loading = false,
  loadError = '',
}) => {
  const currentCategory = (activeCriteria.category as CategoryTab) || 'All Residences';
  const filtered = filterProperties(properties, activeCriteria);

  const handleTabClick = (tab: CategoryTab) => {
    onFilterChange({
      ...activeCriteria,
      category: tab,
    });
  };

  const handleResetFilters = () => {
    onFilterChange({
      category: 'All Residences',
      location: 'All Locations',
      propertyType: 'All Residences',
      budgetRange: 'Any Budget',
      searchQuery: '',
    });
  };

  const hasActiveFilters = Boolean(
    (activeCriteria.location && activeCriteria.location !== 'All Locations') ||
    (activeCriteria.propertyType && activeCriteria.propertyType !== 'All Residences') ||
    (activeCriteria.budgetRange && activeCriteria.budgetRange !== 'Any Budget') ||
    (activeCriteria.category && activeCriteria.category !== 'All Residences') ||
    (activeCriteria.searchQuery && activeCriteria.searchQuery.trim() !== '')
  );

  return (
    <section id="residences" className="py-24 sm:py-32 bg-[#202522] text-[#F8F9FA] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-[#C6A875] mb-4">
            THE STARK COLLECTION
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#F8F9FA] leading-tight mb-4 [text-wrap:balance]">
            Find the place that <span className="font-normal text-white">feels like you.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#B8BDB7] leading-relaxed">
            A considered collection of residences, each with its own character, setting, and story.
          </p>
        </div>

        {/* Working Category Filter Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-4 pb-6 mb-10 border-b border-white/10">
          <div className="flex items-center gap-2 overflow-x-auto py-2 no-scrollbar" role="tablist" aria-label="Residences categories">
            {CATEGORY_TABS.map((tab) => {
              const isActive = currentCategory === tab;
              return (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleTabClick(tab)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A875] ${
                    isActive
                      ? 'bg-[#315844] text-white shadow-sm'
                      : 'text-[#B8BDB7] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Active Filter Indicators & Reset button */}
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 text-xs text-[#C6A875] hover:text-white transition-colors cursor-pointer py-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Empty State */}
        {loading ? (
          <div className="py-20 text-center rounded-2xl border border-white/10 bg-[#292E2A]/50 p-8 max-w-xl mx-auto">
            <p className="text-sm text-[#B8BDB7]">Loading residences from Stark Properties…</p>
          </div>
        ) : loadError ? (
          <div className="py-20 text-center rounded-2xl border border-white/10 bg-[#292E2A]/50 p-8 max-w-xl mx-auto" role="alert">
            <h3 className="text-xl font-light text-white mb-2">We could not load the residences</h3>
            <p className="text-sm text-[#B8BDB7]">{loadError}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center rounded-2xl border border-white/10 bg-[#292E2A]/50 p-8 max-w-xl mx-auto">
            <h3 className="text-xl font-light text-white mb-2">No residences match your current criteria</h3>
            <p className="text-sm text-[#B8BDB7] mb-6">
              Try adjusting your location, typology, or budget filters to explore other architectural developments.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold text-white bg-[#315844] hover:bg-[#284837] transition-all"
            >
              View All Residences
            </button>
          </div>
        ) : (
          /* Asymmetrical Grid Layout */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
            {filtered.map((property, idx) => {
              // Asymmetric composition: First item takes col-span-12 or col-span-7 depending on count
              const isLarge = idx === 0 && filtered.length > 1;
              const colSpan = isLarge
                ? 'md:col-span-12 lg:col-span-7'
                : filtered.length === 1
                ? 'md:col-span-12'
                : idx === 1
                ? 'md:col-span-12 lg:col-span-5'
                : 'md:col-span-6 lg:col-span-6';

              return (
                <div
                  key={property.id}
                  className={`${colSpan} group flex flex-col rounded-2xl overflow-hidden bg-[#292E2A]/60 border border-white/8 hover:border-white/20 transition-all duration-300 shadow-xl`}
                >
                  {/* Card Image Container */}
                  <div className={`relative overflow-hidden ${isLarge ? 'aspect-[16/10]' : 'aspect-[16/10] sm:aspect-[4/3]'} bg-[#14251D]`}>
                    <img
                      src={property.image}
                      alt={property.name}
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = '/static/images/architecture-placeholder.svg';
                      }}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#202522] via-[#202522]/20 to-transparent" />

                    {/* Subtle status badge */}
                    <div className="absolute top-4 left-4">
                      <span className="text-[11px] font-mono tracking-wider uppercase text-white/90 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                        {property.category}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      <div className="text-sm font-light text-[#C6A875]">
                        {property.priceLabel}
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-[#B8BDB7] mb-2">
                        <MapPin className="w-3.5 h-3.5 text-[#C6A875]" />
                        <span>{property.location}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-light text-white group-hover:text-[#C6A875] transition-colors">
                        {property.name}
                      </h3>
                      <p className="mt-2 text-sm text-[#B8BDB7] line-clamp-2 leading-relaxed">
                        {property.description}
                      </p>
                    </div>

                    {/* Specifications strip */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#B8BDB7]">
                      <div className="flex items-center gap-4">
                        {property.bedrooms && (
                          <span className="flex items-center gap-1">
                            <Bed className="w-3.5 h-3.5 text-[#C6A875]" />
                            <span>{property.bedrooms} Beds</span>
                          </span>
                        )}
                        {property.bathrooms && (
                          <span className="flex items-center gap-1">
                            <Bath className="w-3.5 h-3.5 text-[#C6A875]" />
                            <span>{property.bathrooms} Baths</span>
                          </span>
                        )}
                        {property.areaSqFt && (
                          <span className="flex items-center gap-1">
                            <Square className="w-3.5 h-3.5 text-[#C6A875]" />
                            <span>{property.areaSqFt} sq. ft.</span>
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => onSelectProperty(property)}
                        className="inline-flex items-center gap-1 text-xs uppercase tracking-wider font-semibold text-white hover:text-[#C6A875] transition-colors cursor-pointer py-1"
                        aria-label={`Discover ${property.name}`}
                      >
                        <span>Discover</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Final CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold text-white border border-white/20 hover:border-white/50 hover:bg-white/5 transition-all cursor-pointer"
          >
            <span>View All Residences</span>
          </button>
        </div>
      </div>
    </section>
  );
};
