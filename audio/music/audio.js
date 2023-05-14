function Countdown(durationInSeconds) {
    let duration = durationInSeconds;
    let counterId = undefined;
    let callBackOnSecond = console.log;

    const countdown = () => {
        callBackOnSecond(duration);
        --duration;

        if (duration <= 0) {
            duration = 0;
        }
    };

    this.setDuration = function (durationInSeconds) {
        duration = durationInSeconds;
    };

    this.setCallbackOnSecond = function (callback) {
        callBackOnSecond = callback;
    };

    this.start = function (durationInSeconds) {
        duration = durationInSeconds;
        // countdown
        counterId = setInterval(() => {
            countdown(duration);
        }, 1000);

        // stop counting
        setTimeout(() => {
            this.stop();
        }, duration * 1000 + 900);

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

function MusicPlayer(delaysBetweenLoops) {
    console.log(delaysBetweenLoops);

    const audio = new Audio("media/canon-pachelbel-432hz.wav");
    let loopId = 0;
    const incrementLoopId = () => {
        ++loopId;

        if (loopId >= delaysBetweenLoops.length) {
            loopId = 0;
        }
    };
    const countdown = new Countdown(delaysBetweenLoops[loopId]);

    const showRemainingTimeBeforeNextLoop = function (
        remainingTimeBeforeNextLoop
    ) {
        console.log(`next loop in: ${remainingTimeBeforeNextLoop} s`);
        document.querySelector(
            ".next-loop"
        ).textContent = `next loop in: ${remainingTimeBeforeNextLoop} s`;
    };

    audio.addEventListener("ended", function (event) {
        endedAt = Date.now();

        // select next delay
        incrementLoopId();
        console.log({ loopId, nextDelay: delaysBetweenLoops[loopId] });

        // countdown
        countdown.start(
            delaysBetweenLoops[loopId],
            showRemainingTimeBeforeNextLoop
        );

        // set next loop
        setTimeout(function () {
            audio.play();
        }, delaysBetweenLoops[loopId] * 1000 + 900);
    });

    this.play = function () {
        audio.play();
    };

    this.pause = function () {
        audio.pause();
    };

    return this;
}

const musicPlayer = new MusicPlayer([60 * 5, 60 * 2, 60 * 8]);

document
    .querySelector(".play-button")
    .addEventListener("click", function (event) {
        if (this.textContent === "Pause") {
            musicPlayer.pause();
            this.textContent = "Play";

            return;
        }

        this.textContent = "Pause";
        musicPlayer.play();
    });
