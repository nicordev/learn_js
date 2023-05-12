function Countdown(durationInSeconds) {
    let duration = durationInSeconds;
    let counterId = undefined;
    let callBackOnSecond = console.log;

    const countdown = () => {
        callBackOnSecond(duration);
        --duration;
    };

    this.setDuration = function (durationInSeconds) {
        duration = durationInSeconds;
    };

    this.setCallbackOnSecond = function (callback) {
        callBackOnSecond = callback;
    }

    this.start = function () {
        // countdown
        counterId = setInterval(() => {
            countdown(duration);
        }, 1000);

        // stop counting
        setTimeout(() => {
            this.stop();
        }, durationInSeconds * 1000 + 900);

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

const countdown = new Countdown(5);
countdown.start();
