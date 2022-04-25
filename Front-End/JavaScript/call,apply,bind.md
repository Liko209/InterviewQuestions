## What is ``call()``, ``apply()`` and ``bind()``?
``call()``: The ``call()`` method calls a function with a given this value and **arguments provided individually**.[more detail about call()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

``apply()``: The ``apply()`` method calls a function with a given this value, and **arguments provided as an array** (or an array-like object).[more detail about apply()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

``bind()``: The ``bind()`` method **creates a new function** that, when called, has its ``this`` keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.[more detail about bind()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
## Syntax
```
call : function.call(thisArg, arg1, arg2, ...)
apply: function.apply(thisArg, [argsArray])
bind : function.bind(thisArg[, arg1[, arg2[, ...]]])
```


## Exercise:
```js
function add(c, d) {
  return this.a + this.b + c + d;
}

var o = {a: 1, b: 3};

// The first parameter is the object to use as
// 'this', subsequent parameters are passed as
// arguments in the function call
console.log(add.call(o, 5, 7)); 

// The first parameter is the object to use as
// 'this', the second is an array whose
// members are used as the arguments in the function call
console.log(add.apply(o, [10, 20])); 

// The first parameter is the object to use as
// 'this', subsequent parameters are passed as
// arguments in the function call
const fn = add.bind(o, 1, 2);
console.log(fn());
```


```
16
34
7
```
```js
var obj1 = {
    a: 'obj1: Li, Ke',
    b: 'obj1: Li, Ko'
};
let obj2 = {
    a: 'obj2: Li, Ke',
    b: 'obj2: Li, Ko'
};
var a = 'a: Xiang, Cai';
let b = 'b: Suan Cai';

function WhatsThis() {
    console.log(this.a);
    console.log(this.b);
}

// Note the difference between let and var here
WhatsThis();
WhatsThis.call(obj1);
WhatsThis.call(obj2);
WhatsThis.apply(obj1);
WhatsThis.apply(obj2);
```
```
a: Xiang, Cai // var
undefined     // let

obj1: Li, Ke
obj1: Li, Ko

obj2: Li, Ke
obj2: Li, Ko

obj1: Li, Ke
obj1: Li, Ko

obj2: Li, Ke
obj2: Li, Ko
```
[More details about let, var, const and scope](./Scope%26VariablesHoisting.md)