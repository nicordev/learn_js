#! /bin/node

const fruits = [
    'apple',
    'orange',
    'peach',
    'pear',
    'banana',
];

const [ , orange, , pear, ] = fruits;

console.log({ orange, pear });