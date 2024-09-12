import { render, screen } from '@testing-library/react';
import { formatStringToInt } from './utils';
import App from './App';

// FAIL
test('formatStringToInt: string representation of a number', () => {
  expect(formatStringToInt('23')).toBe(23);
});

test('formatStringToInt: number', () => {
  expect(formatStringToInt(23)).toBe(23);
});

test('formatStringToInt: string of alpha characters', () => {
  expect(formatStringToInt('abc')).toBe(0);
});

// FAIL
test('formatStringToInt: null', () => {
  expect(formatStringToInt(null)).toBe(0);
});

test('formatStringToInt: undefined', () => {
  expect(formatStringToInt(undefined)).toBe(0);
});

test('formatStringToInt: negative number', () => {
  expect(formatStringToInt(-34)).toBe(-34);
});

test('formatStringToInt: decimal', () => {
  expect(formatStringToInt(12.2)).toBe(12);
});

