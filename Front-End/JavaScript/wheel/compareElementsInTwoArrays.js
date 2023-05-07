const compareTwoArrays = (arr1, arr2) => {
  const copyOfSortedArr2 = arr2.slice().sort();
  return (
    arr1.length == arr2.length &&
    arr1
      .slice()
      .sort()
      .every((value, index) => value === copyOfSortedArr2[index])
  );
};

export default compareTwoArrays;

let arr1 = [1, 2, 3];
let arr2 = [2, 3, 1];
let arr3 = [1, 2, 3];

// because each [] is an independent object
// console.log([] == []); // false

// console.log(arr1 == arr2); // false
// console.log(arr1 == arr3); // false

// console.log('If the two arrays equal?', compareTwoArrays(arr1, arr2)); // true
// console.log('If the two arrays equal?', compareTwoArrays(arr1, arr3)); // true

// // This solution cannnot deal with the scenario that the order of the array is different
// console.log(JSON.stringify(arr1) == JSON.stringify(arr2)); // false
// console.log(JSON.stringify(arr1) == JSON.stringify(arr3)); // true
