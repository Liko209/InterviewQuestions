## What happen at the time of ```New```

1. create a new object ```{}```
2. Bind the constructor's ```this``` to the newly created object ```{}```
3. execute constructor (constructor for class, function itself for function)
4. return the new object ```{}``` that is ```this``` at that time.

Therefore, we cannot use arrow function as a constructor, because arrow function don't have ```this```, in addition, we can't bind ```this``` for arrow function.
```js
// class
class Person {
    constructor(name, gender, age) {
        console.log('constructor', this);
        this.name = name;
        this.gender = gender;
        this.age = age;
        console.log('constructor', this);
    }
    whatsThis = () => {
        console.log('whatsThis', this);
    }
    sayBye() {
        console.log('sayBye', this);
    }
    sayHi() {
        console.log(`Hi, my name is ${this.name}`);
    }
}

console.log(p1.name);
console.log(p1.gender);
console.log(p1.age);
p1.sayHi();
p1.sayBye();
p1.whatsThis();
```
```
// first log in constructor
constructor Person { whatsThis: [Function: whatsThis] }

// last log in constructor
constructor Person {
  whatsThis: [Function: whatsThis],
  name: 'Li, Ke',
  gender: 'male',
  age: 25
}

// log infos
Li, Ke
male
25

// sayHi
Hi, my name is Li, Ke

// sayBye
sayBye Person {
  whatsThis: [Function: whatsThis],
  name: 'Li, Ke',
  gender: 'male',
  age: 25
}

// whatsThis
whatsThis Person {
  whatsThis: [Function: whatsThis],
  name: 'Li, Ke',
  gender: 'male',
  age: 25
}

```
```js
// function
function Person(name, gender, age) {
    console.log('Person', this);
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.whatsThis = () => {
        console.log('whatsThis', this);
    };
    console.log('Person', this);

}
Person.prototype.sayBye = function () {
    console.log('sayBye', this);
}
Person.prototype.sayHi = function () {
    console.log(`Hi, my name is ${this.name}`);
}
const p1 = new Person('Li, Ke', 'male', 25);

console.log(p1.name);
console.log(p1.gender);
console.log(p1.age);
p1.sayHi();
p1.sayBye();
p1.whatsThis();
```
```
// first log in function
Person Person {}

// last log in function
Person Person {
  name: 'Li, Ke',
  gender: 'male',
  age: 25,
  whatsThis: [Function (anonymous)]
}

// infos
Li, Ke
male
25

// sayHi
Hi, my name is Li, Ke

// sayBye
sayBye Person {
  name: 'Li, Ke',
  gender: 'male',
  age: 25,
  whatsThis: [Function (anonymous)]
}

// whatsThis
whatsThis Person {
  name: 'Li, Ke',
  gender: 'male',
  age: 25,
  whatsThis: [Function (anonymous)]
}
```