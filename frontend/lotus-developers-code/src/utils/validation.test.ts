import test from 'node:test';
import assert from 'node:assert/strict';
import { validateInquiryForm, validateNewsletterEmail, isValidEmail, isValidPhone } from './validation';

test('isValidEmail handles valid and invalid email addresses', () => {
  assert.equal(isValidEmail('govind@example.com'), true);
  assert.equal(isValidEmail('test.name+tag@domain.co.in'), true);
  assert.equal(isValidEmail('invalid-email'), false);
  assert.equal(isValidEmail('@nodomain.com'), false);
  assert.equal(isValidEmail(''), false);
});

test('isValidPhone handles international and domestic formats', () => {
  assert.equal(isValidPhone('+91 98765 43210'), true);
  assert.equal(isValidPhone('+1 (555) 019-2834'), true);
  assert.equal(isValidPhone('9876543210'), true);
  assert.equal(isValidPhone('123'), false); // Too short
  assert.equal(isValidPhone(''), false);
});

test('validateInquiryForm detects missing or invalid fields', () => {
  const result = validateInquiryForm({
    fullName: '',
    email: 'bad',
    phone: '',
    preferredLocation: '',
    propertyType: '',
    budget: '',
    consent: false
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.email);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.consent);
});

test('validateInquiryForm passes for valid data', () => {
  const result = validateInquiryForm({
    fullName: 'Arjun Vardhan',
    email: 'arjun@example.com',
    phone: '+91 98450 12345',
    preferredLocation: 'Bengaluru',
    propertyType: 'Villa',
    budget: '₹2 Crore+',
    contactMethod: 'whatsapp',
    consent: true
  });

  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});

test('validateNewsletterEmail validates correctly', () => {
  assert.equal(validateNewsletterEmail('').isValid, false);
  assert.equal(validateNewsletterEmail('invalid').isValid, false);
  assert.equal(validateNewsletterEmail('contact@starkproperties.example').isValid, true);
});
