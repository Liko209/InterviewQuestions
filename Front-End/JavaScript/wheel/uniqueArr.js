const numArr = [1, 2, 2, 3, 1, 2, 4, 2, 6, 1, 2];
const strArr = ['a', 'b', 'a', 'c', 'd', 'c', 'a'];

// solution1 Set
// const uniqueArr = (arr) => {
//     return Array.from(new Set(arr));
// }

// solution2 Map
// const uniqueArr = (arr) => {
//     const map = new Map();
//     for (const num of arr) {
//         map.set(num, (map.get(num) || 0) + 1);
//     }
//     return Array.from(map.keys());
// }

// solution3 reduce + includes
// const uniqueArr = (arr) => {
//     return arr.reduce((oldArr, newItem) =>
//         oldArr.includes(newItem) ? oldArr : [...oldArr, newItem], []);
// }

// solution4 double for-loop + splice
// const uniqueArr = (arr) => {
//     for (let i = 0; i < arr.length; i++) {
//         for (let j = i + 1; j < arr.length; j++) {
//             if (arr[i] == arr[j]) arr.splice(j--, 1); // use == can deduplicate 1 & '1'
//         }
//     }
//     return arr;
// }

// solution5 includes / indexOf
// const uniqueArr = (arr) => {
//     const newArr = [];
//     for (const item of arr) {
//         if (!newArr.includes(item)) {
//             newArr.push(item);
//         }
//     }
//     return newArr;
// }

// solution6 sort + compare
const uniqueArr = (arr) => {
    const newArr = [];
    arr.sort();
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== arr[i + 1]) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

const newNumArr = uniqueArr(numArr);
const newStrArr = uniqueArr(strArr);
console.log(newNumArr, newStrArr);