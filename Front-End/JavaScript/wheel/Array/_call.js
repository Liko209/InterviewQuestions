Function.prototype._call = function (context, ...args) {
    context.fn = this;
    context.fn(...args);
    delete context.fn;
}


let obj = {
    name: 'Li, Ke'
}
function test(arg1, arg2, arg3) {
    console.log(this.name)   // Li, Ke
    console.log(arg1, arg2, arg3);  // 1 2 3
}
test._call(obj, 1, 2, 3);
test._call(obj);