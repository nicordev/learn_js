function Countdown(durationInSeconds) {
    let duration = durationInSeconds;
    let counterId = undefined;
    let callbackOnSecond = console.info;
    let callBackOnEnd = () => console.info(`${durationInSeconds}s elapsed.`);

    const countdown = () => {
        --duration;
        callbackOnSecond(duration);

        if (duration <= 0) {
            this.stop();
            this.reset();
            callBackOnEnd();
        }
    };

    this.setDuration = function (durationInSeconds) {
        duration = durationInSeconds;
    };

    this.setCallbackOnSecond = function (callback) {
        callbackOnSecond = callback;
    };

    this.setCallbackOnEnd = function (callback) {
        callBackOnEnd = callback;
    };

    this.start = function () {
        // countdown
        counterId = setInterval(() => {
            countdown(duration);
        }, 1000);

        // first time
        countdown(duration);
    };

    this.stop = function () {
        clearInterval(counterId);
    };

    this.reset = function () {
        duration = durationInSeconds;
    };
}

const countdown = new Countdown(2);

countdown.start();
