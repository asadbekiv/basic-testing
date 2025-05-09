// Uncomment the code below and write your tests

import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async (): Promise<void> => {
    const result = 'Node.js';
    await expect(resolveValue(result)).resolves.toBe(result);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const output = 'SyntaxError: illegal character';
    expect(() => throwError(output)).toThrowError(new Error(output));
  });

  test('should throw error with default message if message is not provided', () => {
    const output = 'Oops!';
    expect(() => throwError()).toThrowError(new Error(output));
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async (): Promise<void> => {
    await expect(rejectCustomError()).rejects.toThrowError(MyAwesomeError);
  });
});
