// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals

function displayTime(customMessage = '') {
    let date = new Date();
    let time = date.toLocaleTimeString();
    console.log(`${customMessage}${time}`);
}

const myClock = setInterval(displayTime, 1000, '\033[1mIt is '); // If you execute this in the console using node, the output will be bold thanks to \033[1m

console.log('Try setInterval')

setTimeout(
    (intervalId) => {
        clearInterval(intervalId);
        console.log('Done.');
    },
    5000,
    myClock
);

console.log('tic tac...')