export interface Property {
  id: string;
  name: string;
  eyebrow: string;
  location: string;
  city: 'Bengaluru' | 'Mysuru' | 'Hubballi' | 'Other';
  address?: string;
  category: string;
  propertyType: string;
  priceLabel: string;
  priceNumeric: number | null; // In INR, for filtering
  bedrooms: number | null;
  bathrooms: number | null;
  areaSqFt: number | null;
  description: string;
  image: string;
  images?: string[];
  highlights: string[];
  architecturalNote: string;
  featured?: boolean;
}

export const PROPERTIES: Property[] = [
  {
    id: 'verdant-house',
    name: 'The Verdant House',
    eyebrow: 'CONTEMPORARY RESIDENCE CONCEPT',
    location: 'Bengaluru, Karnataka',
    city: 'Bengaluru',
    category: 'Contemporary Villas',
    propertyType: 'Villa',
    priceLabel: '₹2.4 Crore onwards',
    priceNumeric: 24000000,
    bedrooms: 4,
    bathrooms: 4,
    areaSqFt: 3200,
    description: 'A contemporary residence concept shaped around natural light, generous living spaces, and landscaped surroundings.',
    image: '/static/images/architecture-placeholder.svg',
    highlights: [
      'Slatted teak screens for thermal ventilation',
      'Floor-to-ceiling glass pavilions overlooking reflection pool',
      'Indigenous tropical flora buffer and private courtyard',
      'Double-height living volume with natural cross-breeze'
    ],
    architecturalNote: 'Designed to blur the threshold between inner sanctuary and tropical garden, capturing morning sun through limestone apertures.',
    featured: true
  },
  {
    id: 'courtyard-residence',
    name: 'The Courtyard Residence',
    eyebrow: 'SIGNATURE RESIDENCE CONCEPT',
    location: 'Mysuru, Karnataka',
    city: 'Mysuru',
    category: 'Signature Developments',
    propertyType: 'Villa',
    priceLabel: '₹1.35 Crore onwards',
    priceNumeric: 13500000,
    bedrooms: 3,
    bathrooms: 3,
    areaSqFt: 2100,
    description: 'An elegant residential concept that balances privacy, outdoor connections, and considered material choices.',
    image: '/static/images/architecture-placeholder.svg',
    highlights: [
      'Central open-to-sky atrium with frangipani centerpiece',
      'Warm ivory lime-wash plaster surfaces',
      'Dark bronze window mullions and artisanal joinery',
      'Rainwater harvesting channel with stone acoustic basin'
    ],
    architecturalNote: 'Rooted in traditional regional courtyard typologies reimagined with rigorous minimalist discipline and tactile natural finishes.'
  },
  {
    id: 'skyline-collection',
    name: 'The Skyline Collection',
    eyebrow: 'URBAN RESIDENCE CONCEPT',
    location: 'Bengaluru, Karnataka',
    city: 'Bengaluru',
    category: 'Urban Residences',
    propertyType: 'Penthouse',
    priceLabel: '₹95 Lakh onwards',
    priceNumeric: 9500000,
    bedrooms: 3,
    bathrooms: 2,
    areaSqFt: 1650,
    description: 'A contemporary urban living concept with a focus on clean lines, functional layouts, and everyday convenience.',
    image: '/static/images/architecture-placeholder.svg',
    highlights: [
      'Panoramic 270-degree sunset skyline vista',
      'Seamless microcement floor transition to outdoor terrace',
      'Acoustically isolated private master suite',
      'Integrated architectural linear lighting'
    ],
    architecturalNote: 'Elevated urban living that prioritizes daylight orientation, acoustic tranquility, and seamless flow into expansive sky decks.'
  },
  {
    id: 'quiet-grove',
    name: 'The Quiet Grove',
    eyebrow: 'NATURE-INSPIRED RESIDENCE CONCEPT',
    location: 'To be confirmed',
    city: 'Other',
    category: 'Nature Retreats',
    propertyType: 'Villa',
    priceLabel: 'Price on request',
    priceNumeric: null,
    bedrooms: 3,
    bathrooms: 3,
    areaSqFt: 2800,
    description: 'A nature-led residential concept inspired by greenery, calm spaces, and a closer connection with the outdoors.',
    image: '/static/images/architecture-placeholder.svg',
    highlights: [
      'Cantilevered cedar roof structure over stone foundation',
      'Double-height glass framing ancient forest canopy',
      'Non-invasive landscape footprint with zero grade disturbance',
      'Thermal mass stone hearth and natural cross-ventilation'
    ],
    architecturalNote: 'A sanctuary designed to dissolve into its topography, letting the woodland canopy filter shifting patterns of golden light throughout the day.'
  }
];

export const CATEGORY_TABS = [
  'All Residences',
  'Contemporary Villas',
  'Nature Retreats',
  'Urban Residences',
  'Signature Developments'
] as const;

export type CategoryTab = typeof CATEGORY_TABS[number];

export const LOCATIONS = [
  'All Locations',
  'Bengaluru',
  'Hubballi',
  'Mysuru',
  'Other'
] as const;

export const PROPERTY_TYPES = [
  'All Residences',
  'Apartment',
  'Villa',
  'Penthouse',
  'Plot'
] as const;

export const BUDGET_RANGES = [
  'Any Budget',
  'Under ₹50 Lakh',
  '₹50 Lakh–₹1 Crore',
  '₹1–2 Crore',
  '₹2 Crore+'
] as const;
