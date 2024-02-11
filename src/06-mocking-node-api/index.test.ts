// Uncomment the code below and write your tests
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const TIMEOUT = 100;
    const mockFn = jest.fn();

    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(mockFn, TIMEOUT);

    expect(setTimeout).toHaveBeenCalledWith(mockFn, TIMEOUT);
  });

  test('should call callback only after timeout', () => {
    const TIMEOUT = 100;
    const mockFn = jest.fn();

    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(mockFn, TIMEOUT);

    expect(mockFn).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(mockFn).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const INTERVAL = 100;
    const mockFn = jest.fn();

    jest.spyOn(global, 'setInterval');

    doStuffByInterval(mockFn, INTERVAL);

    expect(setInterval).toHaveBeenCalledWith(mockFn, INTERVAL);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const INTERVAL = 100;
    const COUNT = 5;
    const mockFn = jest.fn();

    jest.spyOn(global, 'setInterval');

    doStuffByInterval(mockFn, INTERVAL);

    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(INTERVAL * COUNT);

    expect(mockFn).toHaveBeenCalledTimes(COUNT);
  });
});

describe('readFileAsynchronously', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const PATH_TO_FILE = 'path to file';
    const spyPathJoin = jest.spyOn(path, 'join');

    await readFileAsynchronously(PATH_TO_FILE);

    expect(spyPathJoin).toHaveBeenCalledWith(__dirname, PATH_TO_FILE);
  });

  test('should return null if file does not exist', async () => {
    const PATH_TO_FILE = 'path to file';

    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const fileContent = await readFileAsynchronously(PATH_TO_FILE);

    expect(fileContent).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const PATH_TO_FILE = 'path to file';
    const FILE_CONTENT = 'file content';

    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest
      .spyOn(fsPromises, 'readFile')
      .mockResolvedValue(Buffer.from(FILE_CONTENT));
    const fileContent = await readFileAsynchronously(PATH_TO_FILE);

    expect(fileContent).toBe(FILE_CONTENT);
  });
});
