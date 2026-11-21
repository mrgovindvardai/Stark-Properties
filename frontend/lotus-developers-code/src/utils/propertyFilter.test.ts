import test from 'node:test';
import assert from 'node:assert/strict';
import { filterProperties, matchesBudget } from './propertyFilter';
import { PROPERTIES } from '../data/properties';

test('matchesBudget correctly evaluates numeric ranges', () => {
  assert.equal(matchesBudget(3000000, 'Under ₹50 Lakh'), true);
  assert.equal(matchesBudget(6000000, 'Under ₹50 Lakh'), false);
  assert.equal(matchesBudget(9500000, '₹50 Lakh–₹1 Crore'), true);
  assert.equal(matchesBudget(13500000, '₹1–2 Crore'), true);
  assert.equal(matchesBudget(24000000, '₹2 Crore+'), true);
  assert.equal(matchesBudget(null, '₹2 Crore+'), true); // bespoke/on request
  assert.equal(matchesBudget(null, 'Under ₹50 Lakh'), false);
  assert.equal(matchesBudget(1000000, 'Any Budget'), true);
});

test('filterProperties returns all properties when no criteria applied', () => {
  const result = filterProperties(PROPERTIES, {});
  assert.equal(result.length, PROPERTIES.length);
});

test('filterProperties filters by location correctly', () => {
  const result = filterProperties(PROPERTIES, { location: 'Bengaluru' });
  assert.equal(result.length, 2);
  assert.ok(result.every((p) => p.city === 'Bengaluru'));
});

test('filterProperties filters by category correctly', () => {
  const result = filterProperties(PROPERTIES, { category: 'Contemporary Villas' });
  assert.equal(result.length, 1);
  assert.equal(result[0].name, 'The Verdant House');
});

test('filterProperties handles empty match gracefully', () => {
  const result = filterProperties(PROPERTIES, { location: 'Hubballi' });
  assert.equal(result.length, 0);
});
