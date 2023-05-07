'use strict';

import applyCustomReduce from '../_reduce';

const sourceNumbers = [0, 10, 20, 30];
const sourceStr = ['a', 'b', 'c', 'd'];

applyCustomReduce();

test('_reduce is added to [].__proto__', () => {
  expect([]._reduce).toBeInstanceOf(Function);
});

test(`_reduce doesn't call default reduce`, () => {
  expect([]._reduce.toString().includes('.reduce(')).toBe(false);
});

test('for ._reduce((sum, x) => sum + x, 0), numbers', () => {
  expect(sourceNumbers._reduce((sum, x) => sum + x, 0)).toBe(60);
});

test('for ._reduce((sum, x) => sum + x, ""), strings', () => {
  expect(sourceStr._reduce((sum, x) => sum + x, '')).toBe('abcd');
});

test('takes first item as a `startValue` if not given, numbers', () => {
  expect(sourceNumbers._reduce((sum, x) => sum + x)).toBe(60);
});

test('takes first item as a `startValue` if not given, strings', () => {
  expect(sourceStr._reduce((sum, x) => sum + x)).toBe('abcd');
});

test('returns `startValue` for []', () => {
  expect([]._reduce((x) => x, 999)).toBe(999);
});

test('for (sum, item, index) => sum + index', () => {
  expect(sourceNumbers._reduce((sum, x, i) => sum + i)).toBe(6);
});

test('should handle undefined if it was passed as initialValue', () => {
  expect(sourceStr._reduce((acc, current) => acc + current, undefined)).toBe(
    'undefinedabcd'
  );
});

test('for ._reduce((sum, x, i, arr) => sum + (arr === sourceStr ? 1 : 0), 0)', () => {
  expect(
    sourceStr._reduce((sum, x, i, arr) => sum + (arr === sourceStr ? 1 : 0), 0)
  ).toBe(4);
});

test('Source array is not changed', () => {
  expect(sourceNumbers).toEqual([0, 10, 20, 30]);

  expect(sourceStr).toEqual(['a', 'b', 'c', 'd']);
});
