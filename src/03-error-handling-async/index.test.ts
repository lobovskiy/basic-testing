// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const RESOLVED_DATA = 'resolved data';

    await expect(resolveValue(RESOLVED_DATA)).resolves.toBe(RESOLVED_DATA);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const ERROR_MESSAGE = 'error message';

    expect(() => throwError(ERROR_MESSAGE)).toThrow(ERROR_MESSAGE);
  });

  test('should throw error with default message if message is not provided', () => {
    const ERROR_MESSAGE_DEFAULT = 'Oops!';

    expect(throwError).toThrow(ERROR_MESSAGE_DEFAULT);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(throwCustomError).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toBeInstanceOf(MyAwesomeError);
  });
});
