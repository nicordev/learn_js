// Console logging

// Regroup variables inside an object to see variable names

const bob = {name: 'bob'};
const sarah = {name: 'sarah'};
const jim = {name: 'jim'};
console.log({bob, sarah, jim});

// CSS style

console.log('%c Hello world!', 'color: red');

// Table

const fruits = ['apple', 'raspberry', 'strawberry'];
console.table(fruits);

const waypoints = [
    {x: 10, y: 20},
    {x: 11, y: 21},
    {x: 12, y: 22},
]
console.table(waypoints);


// Time

console.time('timerLabelHere');

for (let i = 0; i < 100000; i++) {}

console.timeEnd('timerLabelHere');

// Stack trace

const deleteMe = () => console.trace('database has been deleted.');

deleteMe();
deleteMe();