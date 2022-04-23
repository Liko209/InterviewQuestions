## Event Loop
```js
for (var i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(i);∏
}
// for (let i = 0; i < 10000; i++) {
//     console.log(" ");
// }
console.log("Hello World!");
```
```
Hello World!
5
5
5
5
5
```

## Explanation 
First, line 1-4 will start 5 timers for 5 callback functions of setTimerout(). Then the main thread will execute line 8 after that, main thread will be empty. Thus, main thread will fetch the task from task queue. If the callback function have been already add to the task queue after 1s, they will be fetched and executed. We can know the timer be trigger  synchronously by add code in line 5-7 if that is true, the number shoule be log immediately after log "Hello World!", otherwise, it should wait 1s.


## Key Points
1. JavaScript is single-threaded
2. Task Queue:
   JavaScript has two types of taks, synchronous and asynchronous. Synchronous tasks refer to tasks that
   are executed on the main thread, and only after the previous task is executed can the latter task be executed.
   Asynchronous task is a task that does not enter the main thread but enters the task queue, and will only enter 
   the main thread if the task queue notifies the main thread that an asynchronous task is ready for execution.
3. Timer: The timer for asynchronous tasks will be started synchronously, and the asynchronous tasks(the callback function) 
   will be put into the corresponding task queue after the timer ends.(promise for microtask, setTimeout for macrotask).
4. Event Loop:
   JavaScript will recursively fetch the task from the main thread first, and then go back to the task queue 
   if the main thread is empty.

Main Thread (running time stack) : []
Task Queue  : [[MicroTasks], [MacroTasks]]
Timer       : timer;

## Exercise
#### **How to output 0 1 2 3**
```js
for (var i = 0; i < 4; i++) {
    setTimeout(() => {
        console.log(i); // log: 4 4 4 4
    }, 1000);
}

for (var i = 0; i < 4; i++) {
    (function () {
        setTimeout(() => {
            console.log(i); // log: 4 4 4 4
        }, 1000);
    })();
}
```
#### **The key of this problem is scope and event loop.**
#### **Solution1 closure**
```js
for (var i = 0; i < 4; i++) {
    (function (j) {
        setTimeout(() => {
            console.log(j); // log: 0 1 2 3 
        }, 1000);
    })(i);
}
```

#### **Solution2 disassembly**
```js
function timer(i) {
    setTimeout(() => {
        console.log(i); // log: 0 1 2 3
    }, 1000);
}
for (var i = 0; i < 4; i++) {
    timer(i);
}
```

#### **Solution3 let**
```js
for (let i = 0; i < 4; i++) {
    setTimeout(() => {
        console.log(i); // log: 0 1 2 3
    }, 1000)
}
```