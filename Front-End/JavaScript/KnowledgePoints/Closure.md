 ## What is **closure**
 A closure is the combination of a function and the lexical environment within which that function was declared. This environment consists of any local variables that were in-scope at the time the closure was created.

 There is a general programming term “closure”, that developers generally should know.

A closure is a function that remembers its outer variables and can access them. In some languages, that’s not possible, or a function should be written in a special way to make it happen. But as explained above, in JavaScript, all functions are naturally closures (there is only one exception, to be covered in [The "new Function" syntax](https://javascript.info/new-function)).

That is: they automatically remember where they were created using a hidden [[Environment]] property, and then their code can access outer variables.

When on an interview, a frontend developer gets a question about “what’s a closure?”, a valid answer would be a definition of the closure and an explanation that all functions in JavaScript are closures, and maybe a few more words about technical details: the [[Environment]] property and how Lexical Environments work.
```js
function makeFunc() {
    let name = 'Mozilla';
    function displayName() {
        console.log(name);
    }
    return displayName;
}

let myFunc = makeFunc();
myFunc(); 
```
```
Mozilla
```

In this case, myFunc is a reference to the instance of the function displayName that is created when makeFunc is run.The instance of displayName maintains a reference to its lexical environment, within which the variable name exists.For this reason, when myFunc is invoked, the variable name remains available for use, and "Mozilla" is passed to alert.

#### Q: How does a function create a closure?
#### A: It returns a reference to a variable in its parent scope.

## Exercise
This example involves closure [scope and variables hoisting](./Scope%26VariablesHoisting.md).
```js
var v = 1;
var f1 = function() {
    console.log(v);
}

var f2 = function() {
    var v = 2;
    f1();
}
f2();
```
```
1
```
The defination of **v** inner the **f2** cannot affect outside, so when executing log within f1, **v** will be referred to the **v** defined in the outside of it, that is the **v** equal to 1.

We could compare this scenario with the next.
```js
var v = 1;
var f2 = function () {
    var v = 2;
    return f1 = function () {
        console.log(v);
    }
}
var f3 = f2();
f3();
```
```
2
```

```js
var v = 1;
var f2 = function () {
    var v = 2;
    var f1 = function () {
        console.log(v);
    }
    f1();
}
f2();
```
```
2
```