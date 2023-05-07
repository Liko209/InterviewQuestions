const deepClone = (src) => {
	// 先判断是对象还是数组
	let copy = src instanceof Array ? [] : {};
	// let copy = Object.prototype.toString.call(src) === '[object Array]' ? [] : {};
	for (const key in src) {
		// 判断是对象上的属性还是原型上的属性
		if (src.hasOwnProperty(key)) {
			// 如果obj[key] 是对象需要递归遍历
			copy[key] = typeof src[key] === "object" ? deepClone(src[key]) : src[key];
		}
	}
	return copy;
};
