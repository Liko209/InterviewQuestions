import {
  uniqueArr_1,
  uniqueArr_2,
  uniqueArr_3,
  uniqueArr_4,
  uniqueArr_5,
  uniqueArr_6,
} from '../uniqueArr';

const numArr = [1, 2, 2, 3, 1, 2, 4, 2, 6, 1, 2];
const strArr = ['a', 'b', 'a', 'c', 'd', 'c', 'a'];

test(`unique number Array`, () => {
  expect(uniqueArr_1(numArr)).toEqual([1, 2, 3, 4, 6]);
  expect(uniqueArr_2(numArr)).toEqual([1, 2, 3, 4, 6]);
  expect(uniqueArr_3(numArr)).toEqual([1, 2, 3, 4, 6]);
  expect(uniqueArr_4(numArr)).toEqual([1, 2, 3, 4, 6]);
  expect(uniqueArr_5(numArr)).toEqual([1, 2, 3, 4, 6]);
  expect(uniqueArr_6(numArr)).toEqual([1, 2, 3, 4, 6]);
});

test(`unique string Array`, () => {
  expect(uniqueArr_1(strArr)).toEqual(['a', 'b', 'c', 'd']);
  expect(uniqueArr_2(strArr)).toEqual(['a', 'b', 'c', 'd']);
  expect(uniqueArr_3(strArr)).toEqual(['a', 'b', 'c', 'd']);
  expect(uniqueArr_4(strArr)).toEqual(['a', 'b', 'c', 'd']);
  expect(uniqueArr_5(strArr)).toEqual(['a', 'b', 'c', 'd']);
  expect(uniqueArr_6(strArr)).toEqual(['a', 'b', 'c', 'd']);
});
