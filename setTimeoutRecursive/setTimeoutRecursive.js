let i = 0;
let max = 34;

setTimeout(function run(limit) {
    if (i >= limit) {
        console.log('Done. Have a nice day!');
        return;
    }
    console.clear();
    console.log(i++);
    setTimeout(run, 100 + i * 10, max);
}, 100);
