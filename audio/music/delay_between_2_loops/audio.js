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

function MusicPlayer(delaysBetweenLoops) {
    console.log(delaysBetweenLoops);

    const audio = new Audio("../media/canon-pachelbel-432hz.wav");

    let loopId = 0;
    const incrementLoopId = () => {
        ++loopId;

        if (loopId >= delaysBetweenLoops.length) {
            loopId = 0;
        }
    };
    const countdown = new Countdown(delaysBetweenLoops[loopId]);

    const formatSeconds = (secondsCount) => {
        const seconds = secondsCount % 60;
        const minutes = Math.floor(secondsCount / 60);

        return `${minutes}:${seconds}`;
    };

    const showRemainingTimeBeforeNextLoop = function (
        remainingTimeBeforeNextLoop
    ) {
        const formattedTime = formatSeconds(remainingTimeBeforeNextLoop);
        console.log(`next loop in: ${formattedTime} s`);
        document.querySelector(
            ".next-loop"
        ).textContent = `next loop in: ${formattedTime} s`;
    };

    countdown.setCallbackOnSecond(showRemainingTimeBeforeNextLoop);
    countdown.setCallbackOnEnd(() => {
        this.play();
    })

    audio.addEventListener("ended", function (event) {
        isPlaying = false;

        // select next delay
        incrementLoopId();
        console.log({ loopId, nextDelay: delaysBetweenLoops[loopId] });
        countdown.setDuration(delaysBetweenLoops[loopId])

        // countdown
        countdown.start(delaysBetweenLoops[loopId]);
    });

    this.play = function () {
        audio.play();
    };

    this.pause = function () {
        audio.pause();
        countdown.stop();
    };

    return this;
}

const musicPlayer = new MusicPlayer([60 * 8]);

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

// todo: mode to start playing music every 15 minutes for instance
// todo: read url query string for delays