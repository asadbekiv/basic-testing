// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { existsSync } from 'fs';
import { join } from 'path';
import { readFile } from 'fs/promises';

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

describe('doStuffByTimeout', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(setTimeout).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setInterval');
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('should set interval with provided callback and timeout', () => {
    const mockCallback = jest.fn();
    const interval = 1000;

    doStuffByInterval(mockCallback, interval);

    expect(setInterval).toHaveBeenCalledWith(mockCallback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockCallback = jest.fn();
    const interval = 1000;

    doStuffByInterval(mockCallback, interval);
    jest.advanceTimersByTime(interval * 4);
    expect(mockCallback).toHaveBeenCalledTimes(4);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathTofile = 'fresh.txt';
    (join as jest.Mock).mockReturnValue(`path/${pathTofile}`);

    await readFileAsynchronously(pathTofile);

    expect(join).toHaveBeenCalledWith(__dirname, pathTofile);
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);
    const result = await readFileAsynchronously('smth.txt');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const mockContent = 'I am fresh and young !';
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(Buffer.from(mockContent));

    const result = await readFileAsynchronously('fresh.txt');
    expect(result).toBe(mockContent);
  });
});
