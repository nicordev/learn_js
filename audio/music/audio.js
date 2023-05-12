function MusicPlayer(delayBeforeNextLoop) {
    const audio = new Audio("media/canon-pachelbel-432hz.wav");
    let endedAt = undefined;
    let intervalId = undefined;

    const showRemainingTimeBeforeNextLoop = function () {
        if (typeof endedAt === 'undefined') {
            return;
        }

        const elapsedTime = Date.now() - endedAt;
        const remainingTimeBeforeNextLoop = delayBeforeNextLoop - elapsedTime;

        console.log(`next loop in: ${remainingTimeBeforeNextLoop} s`);
        document.querySelector('.next-loop').textContent = `next loop in: ${remainingTimeBeforeNextLoop} s`
    }

    audio.addEventListener('ended', function (event) {
        endedAt = Date.now();
        showRemainingTimeBeforeNextLoop();

        // count remaining time before next loop
        intervalId = setInterval(
            function () {
                showRemainingTimeBeforeNextLoop()
            },
            1000,
        );

        // set next loop
        setTimeout(
            function () {
                audio.play();
                delayBeforeNextLoop = Math.round(5 * 60 * Math.random());
                clearInterval(intervalId);
            },
            delayBeforeNextLoop * 1000,
        );
    });

    this.play = function () {
        audio.play();
    };

    this.pause = function () {
        audio.pause();
    };

    return this;
}

const musicPlayer = new MusicPlayer(60 * 5 + 38);

document.querySelector('.play-button').addEventListener('click', function (event) {
    if (this.textContent === 'Pause') {
        musicPlayer.pause();
        this.textContent = 'Play';

        return;
    }

    this.textContent = 'Pause';
    musicPlayer.play();
});
