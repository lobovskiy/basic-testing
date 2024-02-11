// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const ELEMENTS = [1, 2, 3];
    const ELEMENTS_LINKED_LIST = {
      value: 1,
      next: { value: 2, next: { value: 3, next: { value: null, next: null } } },
    };

    expect(generateLinkedList(ELEMENTS)).toStrictEqual(ELEMENTS_LINKED_LIST);
  });

  test('should generate linked list from values 2', () => {
    const ELEMENTS = ['a', 'b', 'c'];

    expect(generateLinkedList(ELEMENTS)).toMatchSnapshot();
  });
});
