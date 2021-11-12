#!/usr/bin/env node

function sayHi(name) {
    log(`Hello ${name}!`);
}

const listFunctions = () => {
    console.log(
`sayHi`
    );
};

const path = require('path');

const scriptName = path.basename(__filename);
const functionName = process.argv[ 2 ];

const getArguments = () => {
    const arguments = process.argv;
    arguments.shift();
    arguments.shift();

    return arguments;
};

if (process.argv.length <= 2) {
    listFunctions();
    return;
}

console.log({ functionName });
console.log(global);
global[ functionName ](getArguments());