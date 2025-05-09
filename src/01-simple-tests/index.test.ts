// Uncomment the code below and write your tests

import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = { a: 1, b: 2, action: Action.Add };
    const result = 3;
    expect(simpleCalculator(input)).toBe(result);
  });

  test('should subtract two numbers', () => {
    const input = { a: 100, b: 10, action: Action.Subtract };
    const result = 90;
    expect(simpleCalculator(input)).toBe(result);
  });

  test('should multiply two numbers', () => {
    const input = { a: 10, b: 10, action: Action.Multiply };
    const result = 100;
    expect(simpleCalculator(input)).toBe(result);
  });

  test('should divide two numbers', () => {
    const input = { a: 50, b: 5, action: Action.Divide };
    const result = 10;
    expect(simpleCalculator(input)).toBe(result);
  });

  test('should exponentiate two numbers', () => {
    const input = { a: 2, b: 2, action: Action.Exponentiate };
    const result = 4;
    expect(simpleCalculator(input)).toBe(result);
  });

  test('should return null for invalid action', () => {
    const input = { a: 1, b: 2, action: 'good' };
    expect(simpleCalculator(input)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const input = { a: '', b: '', action: Action.Divide };
    expect(simpleCalculator(input)).toBeNull();
  });
});
