## What is ```this``` in JavaScript

A function's ```this``` keyword behaves a little differently in JavaScript compared to other languages. It also has some differences between strict mode and non-strict mode.

In most cases, the value of ```this``` is determined by how a function is called (**runtime binding**). It can't be set by assignment during execution, and it may be different each time the function is called. ES5 introduced the ```bind()``` method to **set the value of a function's this regardless of how it's called**, and ES2015 introduced ```arrow functions``` which don't provide their own this binding (it retains the this value of the enclosing lexical context).

```js
let obj = {
    name: 'Li, Ke',
    func: function() {
        return this.name;
    }
};

console.log(obj.func());
```
```
Li, Ke
```

In the most scenario, ```this``` is the object who call the method. It’s like that an object method needs to access the information stored in the object to do its job. Just as the ```obj``` call the ```func()``` as above, so the this in the ```func``` is ```obj```.

To access the object, a method can use the ```this``` keyword.

The value of ```this``` is the object “before dot”, the one used to call the method.

Here during the execution of ```obj.func()```, the value of this will be ```obj```.

Technically, it’s also possible to access the object without ```this```, by referencing it via the outer variable:

```js
let obj = {
    name: 'Li, Ke',
    func: function() {
        return obj.name;
    }
};

console.log(obj.func());
```
```
Li, Ke
```

But such code is unreliable. If we decide to copy user to another variable, e.g. ```obj1 = obj ```and overwrite ``obj`` with something else, then it will access the wrong object.

That’s demonstrated below:

```js
let obj = {
    name: 'Li, Ke',
    func: function() {
        return obj.name;
    }
};

let obj1 = obj;
obj = null;
console.log(obj1.func());
```
```
TypeError: Cannot read property 'name' of null
```
If we used ```this.name``` instead of ```obj.name``` inside the ```console.log()```, then the code would work.


Several different contexts for ```this``` pointing are described below:

#### **1. Global context**
In browsers, the window object is the global object.
```js
console.log(this); 
a = 37;
this.b = "MDN";
console.log(window.a);
console.log(window.b);
console.log(b)  
```
```
Object [Window]{}
37
MDN
MDN
```

There are some differents between **Node** and browsers.
```js
console.log(globalThis);
a = 37;
globalThis.b = "MDN";
console.log(globalThis.a);
console.log(globalThis.b);
console.log(b)  
```
```
Object [global]{}
37
MDN
MDN
```
Therefore, we know you can always easily get the global object using the global ```globalThis``` property, regardless of the current context in which your code is running. Although, ```this === Window``` in **browsers**, that is not true for **Node**.
```js
console.log(this); 
console.log(this === globalThis);
a = 37;
this.b = "MDN";
console.log(this.a);
console.log(this.b);
console.log(a);  
console.log(b);
```
```
{}
false
undefined
MDN
37
ReferenceError: b is not defined
```

As we can see, the ```this``` in Node is not the window, but rather an empty object ```{}```

#### **2. Function context**
Inside a function, the value of ```this``` depends on **how the function is called**.

Since the following code is not in strict mode, and because the value of this is not set by the call, ```this``` will default to the **global object**, which is window in a browser.

```js
function f1() {
  return this;
}

// In a browser:
// Just as Window.f1()
f1() === window; // true


// In Node:
// Just as globalThis.f1()
f1() === globalThis; // true
```

**Note** : In **Node** the ```globalThis``` is **NOT** the ```this``` in global.

```js
function f1() {
  return this;
}

console.log(this);
console.log(f1());
console.log(f1() == globalThis);
console.log(globalThis == this);
```
```
{}
Object [global]{}
true
false
```

In strict mode, however, if the value of ```this``` is not set when entering an execution context, it remains as undefined, as shown in the following example:
```js
function f2() {
  'use strict';
  return this;
}

console.log(f2()); 
// in a browser
console.log(this);

// in Node
console.log(this);
```
```
undefined
Object [Window] {} // for browser
{} // for Node
```

**Note**: the result is same with Node. So we know that in strict mode, the ```this``` of a function is definitely the object who called it, and if the function is called by the global, it will not point to ```globalThis``` but ```undefined```.

#### **3. Class context**

The behavior of ```this``` in classes and functions is similar, since classes are functions under the hood. But there are some differences and caveats.

Within a class constructor, ```this``` is a regular object. All **non-static methods** within the class are added to the prototype of ```this```:

```js
class Example {
  constructor() {
    // get the prototype object of this
    const proto = Object.getPrototypeOf(this);
    console.log(Object.getOwnPropertyNames(proto));
  }
  first(){}
  second(){}
  static third(){}
}

new Example();
```
```
['constructor', 'first', 'second']
```
**Note**: Note: Static methods are not properties of this. They are properties of the class itself. Another common interview question and a fundamental point of object-oriented knowledge is
[What happen when **new**?](./WhatHappenWhenNew.md)

In this case, when execute ```new Example()```, JavaScript will create a new object ```{}``` and bind the ```this``` of the ```class``` to the object ```{}``` and then call the ```constructor()```, thus the ```this``` within the ```constructor()``` is the ```object{}```, and the prototype object is ```Example.prototype```

#### **3.1. Derived Class**
Unlike base class constructors, derived constructors have no initial this binding. Calling super() creates a this binding within the constructor and essentially has the effect of evaluating the following line of code, where Base is the inherited class:

```js
this = new Base();
```
**Example:**
```js
class Animals {
    constructor() {}
    sayHi() { }
    sayBye() { }
}
class Cat extends Animals {
    constructor() {
        super();
    }
}

const fish = new Animals();
const xiangcai = new Cat();

console.log(xiangcai.__proto__.__proto__ == fish.__proto__)
console.log(fish.__proto__);
console.log(xiangcai.__proto__);

```
```
true
{constructor: f, sayHi: f, sayBye: f}
{constructor: f}
```
Derived classes must not return before calling super(), unless they return an Object or have no constructor at all.

```js
class Base {}
class Good extends Base {}
class AlsoGood extends Base {
  constructor() {
    return {a: 5};
  }
}
class Bad extends Base {
  constructor() {}
}

new Good();
new AlsoGood();
new Bad(); // ReferenceError
```
**Warning**: Referring to this before calling super() will throw an error.

[More details about call, apply and bind](./call%2Capply%2Cbind.md)

## Summary
1. Functions that are stored in object properties are called “methods”.
2. Methods allow objects to “act” like ```object.doSomething()```.
3. Methods can reference the object as ```this```.

The value of ```this``` is defined **at run-time**.

1. When a function is declared, it may use ```this```, but that ```this``` has no value **until the function is called**.
2. A function can be copied between objects.
3. When a function is called in the “method” syntax: ```object.method()```, the value of ```this``` during the call is ```object```.

Please note that ```arrow functions``` are special: they have **no** ```this```. When ```this``` is accessed inside an arrow function, it is taken from outside.

[More details about arrow functions](./arrowFunction.md)
