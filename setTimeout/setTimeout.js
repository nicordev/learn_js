// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals

function sayHi(name) {
    console.log(`Hello ${name}!`);
}

// Greet the whole World 1 second after calling this line:
let myGreetingTimeout = setTimeout(sayHi, 1000, 'World'); // The sayHi function argument is passed after the timeout delay

console.log('Try setTimeout');

// Uncomment this line to remove the timeout before it could be run:
// clearTimeout(myGreetingTimeout);

// Setting a timeout delay at 0 will execute the function at the end of the script, here after: console.log('Who is here?');
setTimeout(function (name) {
     console.log(`${name} is here.`)
}, 0, 'Sarah');

console.log('Who is here?');