// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 100, b: 10, action: Action.Subtract, expected: 90 },
  { a: 1, b: 1, action: Action.Multiply, expected: 1 },
  { a: 15, b: 3, action: Action.Divide, expected: 5 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 3, b: 2, action: 'unknown', expected: null },
  { a: '', b: '', action: Action.Divide, expected: null },
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  test.each(testCases)(
    'should perform action with a, b',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
  // Consider to use Jest table tests API to test all cases above
});
