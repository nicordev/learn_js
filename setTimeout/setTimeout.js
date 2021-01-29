function sayHi(name) {
    console.log(`Hello ${name}!`);
}

// Greet the whole World 1 second after calling this line:
let myGreetingTimeout = setTimeout(sayHi, 1000, 'World'); // The sayHi function argument is passed after the timeout delay

console.log('Try setTimeout');

// Uncomment this line to remove the timeout before it could be run:
// clearTimeout(myGreetingTimeout);

console.log('Who is here?');