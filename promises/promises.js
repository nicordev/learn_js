const myExecutor = function (resolve, reject) {
    console.log('Initialisation...');
    setTimeout(resolve, 2000);
    setTimeout(reject, 3000);
}

const myPromise = new Promise(myExecutor);
myPromise.then(() => console.log('Success!'));
myPromise.catch(() => console.log('Rejected...'));