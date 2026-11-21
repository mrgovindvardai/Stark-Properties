import { Property } from '../data/properties';

export interface FilterCriteria {
  location?: string;
  category?: string;
  propertyType?: string;
  budgetRange?: string;
  searchQuery?: string;
}

export function matchesBudget(numericPrice: number | null, budgetRange: string): boolean {
  if (!budgetRange || budgetRange === 'Any Budget') {
    return true;
  }

  // Price on request is treated as bespoke luxury (matching 2 Crore+ or Any)
  if (numericPrice === null) {
    return budgetRange === '₹2 Crore+';
  }

  const fiftyLakh = 5000000;
  const oneCrore = 10000000;
  const twoCrore = 20000000;

  switch (budgetRange) {
    case 'Under ₹50 Lakh':
      return numericPrice < fiftyLakh;
    case '₹50 Lakh–₹1 Crore':
      return numericPrice >= fiftyLakh && numericPrice <= oneCrore;
    case '₹1–2 Crore':
      return numericPrice > oneCrore && numericPrice <= twoCrore;
    case '₹2 Crore+':
      return numericPrice > twoCrore;
    default:
      return true;
  }
}

export function filterProperties(properties: Property[], criteria: FilterCriteria): Property[] {
  return properties.filter((property) => {
    // 1. Location filter
    if (criteria.location && criteria.location !== 'All Locations') {
      if (property.city !== criteria.location) {
        return false;
      }
    }

    // 2. Category filter
    if (criteria.category && criteria.category !== 'All Residences') {
      if (property.category !== criteria.category) {
        return false;
      }
    }

    // 3. Property Type filter
    if (criteria.propertyType && criteria.propertyType !== 'All Residences') {
      if (property.propertyType !== criteria.propertyType) {
        return false;
      }
    }

    // 4. Budget filter
    if (criteria.budgetRange && criteria.budgetRange !== 'Any Budget') {
      if (!matchesBudget(property.priceNumeric, criteria.budgetRange)) {
        return false;
      }
    }

    // 5. Search Query (free text in name, description, location)
    if (criteria.searchQuery && criteria.searchQuery.trim() !== '') {
      const q = criteria.searchQuery.toLowerCase().trim();
      const matchName = property.name.toLowerCase().includes(q);
      const matchDesc = property.description.toLowerCase().includes(q);
      const matchLoc = property.location.toLowerCase().includes(q);
      const matchCat = property.category.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchLoc && !matchCat) {
        return false;
      }
    }

    return true;
  });
}
