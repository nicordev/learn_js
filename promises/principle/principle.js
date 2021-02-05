console.log('Promises principle:');

const myFirstPromise = new Promise((resolve, reject) => {
    console.log("I'm in the executor function executed at the Promise declaration.")
    console.log("Now I run the resolve function:");
    resolve();
})

console.log("Is something happened yet?");

myFirstPromise.then(() => {
    console.log("Hello World! Now I throw and error...")
    throw new Error('My custom error!')
}).catch((error) => {
    console.log('Now the Promise catch the error:');
    console.log(error)
})