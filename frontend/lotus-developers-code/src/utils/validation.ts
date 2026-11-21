export type ContactMethod = 'email' | 'phone' | 'whatsapp';

export interface InquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  preferredLocation: string;
  propertyType: string;
  budget: string;
  contactMethod: ContactMethod;
  message?: string;
  consent: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  // RFC 5322 compatible regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim());
}

export function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;
  // Must have at least 7 digits, allowing +, spaces, hyphens, parentheses
  const cleaned = phone.replace(/[^0-9]/g, '');
  return cleaned.length >= 7 && cleaned.length <= 15;
}

export function validateInquiryForm(data: Partial<InquiryFormData>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!data.phone || !isValidPhone(data.phone)) {
    errors.phone = 'Please provide a valid phone number (minimum 7 digits).';
  }

  if (!data.preferredLocation || data.preferredLocation.trim() === '') {
    errors.preferredLocation = 'Please select your preferred location.';
  }

  if (!data.propertyType || data.propertyType.trim() === '') {
    errors.propertyType = 'Please select a residence typology.';
  }

  if (!data.budget || data.budget.trim() === '') {
    errors.budget = 'Please select an approximate budget range.';
  }

  if (!data.consent) {
    errors.consent = 'You must agree to be contacted regarding this inquiry.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateNewsletterEmail(email: string): { isValid: boolean; error?: string } {
  if (!email || email.trim() === '') {
    return { isValid: false, error: 'Email address is required.' };
  }
  if (!isValidEmail(email)) {
    return { isValid: false, error: 'Please enter a valid email address.' };
  }
  return { isValid: true };
}
