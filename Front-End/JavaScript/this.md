## What is ```this``` in JavaScript

#### **This summary is mainly for my own learning, with many knowledge points and examples from [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) and [JavaScript.info](https://javascript.info/object-methods)**


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

#### **4 Arrow function** 
In **arrow functions**, this retains the value of the enclosing lexical context's ```this```. In global code, it will be set to the global object:

```js
var globalObject = this;
var foo = (() => this);
console.log(foo() === globalObject);

// Call as a method of an object
var obj = {func: foo};
console.log(obj.func() === globalObject); 

// Attempt to set this using call
console.log(foo.call(obj) === globalObject); 

// Attempt to set this using bind
foo = foo.bind(obj);
console.log(foo() === globalObject); 
```
```
true
true
true
true
```
No matter what, foo's ```this``` is set to what it was **when it was created (in the example above, the global object)**. The same applies to arrow functions created inside other functions: their this remains that of the enclosing lexical context.

**Note**: If ```this``` arg is passed to ```call, bind, or apply``` on invocation of an ```arrow function``` it will be **ignored**. You can still prepend arguments to the call, but the first argument ```(thisArg)``` should be set to ```null```.
```js
// Create obj with a method bar that returns a function that returns its this. The returned function is created as an arrow function, so its this is permanently bound to the this of its enclosing function. The value of bar can be set in the call, which in turn sets the value of the returned function.
var obj = {
  bar: function() {
    var x = (() => this);
    return x;
  }
};

// Call bar as a method of obj, setting its this to obj
// Assign a reference to the returned function to fn
var fn = obj.bar();

// Call fn without setting this, would normally default
// to the global object or undefined in strict mode
console.log(fn() === obj); // true

// But caution if you reference the method of obj without calling it
var fn2 = obj.bar;
// Calling the arrow function's this from inside the bar method()
// will now return window, because it follows the this from fn2.
console.log(fn2()() == window);
```
```
true
true
```
In the above, the function (call it anonymous function A) assigned to obj.bar returns another function (call it anonymous function B) that is created as an arrow function. As a result, function B's ```this``` is permanently set to the ```this``` of ```obj.bar``` (function A) when called. When the returned function (function B) is called, its ```this``` will always be what it was set to initially. In the above code example, function B's ```this``` is set to function A's ```this``` which is ```obj```, so it remains set to ```obj``` even when called in a manner that would normally set its ```this``` to ```undefined``` or the ```global object``` (or any other method as in the previous example in the global execution context).
## Exercise
```js
var o = {
  prop: 37,
  f: function() {
    return this.prop;
  }
};

console.log(o.f());
```
```
37
```

```js
var o = {prop: 37};

function independent() {
  return this.prop;
}

o.f = independent;
o.b = {g: independent, prop: 42};


console.log(o.f());
console.log(o.b.g());
```
```
37
42
```

```js
var o = {f: function() { return this.a + this.b; }};
var p = Object.create(o);
p.a = 1;
p.b = 4;

console.log(p.f());
```

```
5
```
```js
function sum() {
  return this.a + this.b + this.c;
}

var o = {
  a: 1,
  b: 2,
  c: 3,
  get average() {
    return (this.a + this.b + this.c) / 3;
  }
};

Object.defineProperty(o, 'sum', {
    get: sum, enumerable: true, configurable: true});

console.log(o.average, o.sum);
```
```
2, 6
```
```js
function C() {
  this.a = 37;
}

var o = new C();
console.log(o.a); 

function C2() {
  this.a = 37;
  return {a: 38};
}

o = new C2();
console.log(o.a);
```
```
37
38
```
```js
class Car {
  constructor() {
    // Bind sayBye but not sayHi to show the difference
    this.sayBye = this.sayBye.bind(this);
  }
  sayHi() {
    console.log(`Hello from ${this.name}`);
  }
  sayBye() {
    console.log(`Bye from ${this.name}`);
  }
  get name() {
    return 'Ferrari';
  }
}

class Bird {
  get name() {
    return 'Tweety';
  }
}

const car = new Car();
const bird = new Bird();

// The value of 'this' in methods depends on their caller
car.sayHi(); // Hello from Ferrari
bird.sayHi = car.sayHi;
bird.sayHi(); // Hello from Tweety

// For bound methods, 'this' doesn't depend on the caller
bird.sayBye = car.sayBye;
bird.sayBye();
```
```
Hello from Ferrari
Hello from Tweety
Bye from Ferrari
```

```js
let bear = {
  sound: 'roar',
  roar() {
    console.log(this.sound);
  },
};

bear.sound = 'grunt';
let bearSound = bear.roar;
bearSound();
```
```
undefined
```
```js
'use strict';
function logThis() {
  this.desc = 'logger';
  console.log(this);
}
new logThis();
```
```
{desc: "logger"}
```
```js
function logThis() {
  console.log(this);
}
logThis();
```
```
Object [Window] {} // for browsers
Object [global] {} // for Node
```
## Summary
The value of ```this``` is defined **at run-time**.

1. When a function is declared, it may use ```this```, but that ```this``` has no value **until the function is called**.
2. When a function is called in the “method” syntax: ```object.method()```, the value of ```this``` during the call is ```object```, that is what we said ```this``` is always points to the ```object``` before the "dot".
3. When a function is called in the "global", the value of ```this``` during the call is ```globalThis```, which is ```Window``` for browsers / ```global``` for Node. However, there are some subtle differences in strict mode.
4. You also can use call, apply and bind to change ```this``` for the function. [More details about call, apply and bind](./call%2Capply%2Cbind.md)
5.  ```arrow functions``` are special: they have **no** ```this```. When ```this``` is accessed inside an arrow function, it is taken from outside. Moreover, different from the ```this``` of a normal function, the ```this``` of an ```arrow function``` is **NOT** determined at runtime, but by the lexical context in which it was created. [More details about arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
