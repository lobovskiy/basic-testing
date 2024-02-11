// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 12, b: 2, action: Action.Multiply, expected: 24 },
  { a: 2, b: 10, action: Action.Exponentiate, expected: 1024 },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    '$a $action $b should be $expected',
    ({ a, b, action, expected }) => {
      const rawCalculatorInput = { a, b, action };

      expect(simpleCalculator(rawCalculatorInput)).toBe(expected);
    },
  );
});
