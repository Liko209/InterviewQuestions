##// A closure is the combination of a function and the lexical environment within which that function was declared.
##// This environment consists of any local variables that were in-scope at the time the closure was created.
<pre>
```js
function makeFunc() {
    let name = 'Mozilla';
    function displayName() {
        console.log(name);
    }
    return displayName;
}

let myFunc = makeFunc();
myFunc(); // log: Mozilla
```
</pre>

// In this case, myFunc is a reference to the instance of the function displayName that is created when 
// makeFunc is run.The instance of displayName maintains a reference to its lexical environment, within 
// which the variable name exists.For this reason, when myFunc is invoked, the variable name remains available 
// for use, and "Mozilla" is passed to alert.

//Q: How does a function create a closure?
//A: It returns a reference to a variable in its parent scope.