// solution1 Set
const uniqueArr_1 = (arr) => {
  return Array.from(new Set(arr));
};

// solution2 Map
const uniqueArr_2 = (arr) => {
  const map = new Map();
  for (const num of arr) {
    map.set(num, (map.get(num) || 0) + 1);
  }
  return Array.from(map.keys());
};

// solution3 reduce + includes
const uniqueArr_3 = (arr) => {
  return arr.reduce(
    (oldArr, newItem) =>
      oldArr.includes(newItem) ? oldArr : [...oldArr, newItem],
    []
  );
};

// solution4 double for-loop + splice
const uniqueArr_4 = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] == arr[j]) arr.splice(j--, 1); // use == can deduplicate 1 & '1'
    }
  }
  return arr;
};

// solution5 includes / indexOf
const uniqueArr_5 = (arr) => {
  const newArr = [];
  for (const item of arr) {
    if (!newArr.includes(item)) {
      newArr.push(item);
    }
  }
  return newArr;
};

// solution6 sort + compare
const uniqueArr_6 = (arr) => {
  const newArr = [];
  arr.sort();
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== arr[i + 1]) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
};

export {
  uniqueArr_1,
  uniqueArr_2,
  uniqueArr_3,
  uniqueArr_4,
  uniqueArr_5,
  uniqueArr_6,
};
