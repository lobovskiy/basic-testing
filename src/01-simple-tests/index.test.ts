// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  const NUMBERS = { a: 12, b: 2 };

  test('should add two numbers', () => {
    const rawCalculatorInput = {
      ...NUMBERS,
      action: Action.Add,
    };

    expect(simpleCalculator(rawCalculatorInput)).toBe(NUMBERS.a + NUMBERS.b);
  });

  test('should subtract two numbers', () => {
    const rawCalculatorInput = {
      ...NUMBERS,
      action: Action.Subtract,
    };

    expect(simpleCalculator(rawCalculatorInput)).toBe(NUMBERS.a - NUMBERS.b);
  });

  test('should multiply two numbers', () => {
    const rawCalculatorInput = {
      ...NUMBERS,
      action: Action.Multiply,
    };

    expect(simpleCalculator(rawCalculatorInput)).toBe(NUMBERS.a * NUMBERS.b);
  });

  test('should divide two numbers', () => {
    const rawCalculatorInput = {
      ...NUMBERS,
      action: Action.Divide,
    };

    expect(simpleCalculator(rawCalculatorInput)).toBe(NUMBERS.a / NUMBERS.b);
  });

  test('should exponentiate two numbers', () => {
    const rawCalculatorInput = {
      ...NUMBERS,
      action: Action.Exponentiate,
    };

    expect(simpleCalculator(rawCalculatorInput)).toBe(NUMBERS.a ** NUMBERS.b);
  });

  test('should return null for invalid action', () => {
    const rawCalculatorInput = {
      ...NUMBERS,
      action: undefined,
    };

    expect(simpleCalculator(rawCalculatorInput)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const rawCalculatorInput = {
      a: undefined,
      b: false,
      action: Action.Add,
    };

    expect(simpleCalculator(rawCalculatorInput)).toBeNull();
  });
});
