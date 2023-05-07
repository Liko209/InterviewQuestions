Array.prototype._forEach = function (func) {
	for (let i = 0; i < this.length; i++) {
		func(this[i], i, this);
	}
};

let a = [1, 2, 3];

a._forEach((value, index, arr) => {
	console.log(value, index, arr);
});
