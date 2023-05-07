import compareTwoArrays from '../compareElementsInTwoArrays';

test(`compare two empty arrays`, () => {
  const arr1 = [];
  const arr2 = [];
  expect(compareTwoArrays(arr1, arr2)).toBe(true);
});

test(`compare two arrays with same elements`, () => {
  const arr1 = [1, 2, 3];
  const arr2 = [1, 2, 3];
  expect(compareTwoArrays(arr1, arr2)).toBe(true);
});

test(`compare two arrays with same elements but different order`, () => {
  const arr1 = [1, 2, 3];
  const arr2 = [2, 3, 1];
  expect(compareTwoArrays(arr1, arr2)).toBe(true);
});
