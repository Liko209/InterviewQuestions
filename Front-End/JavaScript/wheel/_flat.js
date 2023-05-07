const arr = [1, [1, 2, [2, 4]], 3, 5];

const _flat = (arr) => {
    let res = [];
    for (const item of arr) {
        if (Array.isArray(item)) {
            res = res.concat(_flat(item));
        } else {
            res.push(item);
        }
    }
    return res;
}

console.log(_flat(arr));