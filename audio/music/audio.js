function MusicPlayer(delayBeforeNextLoop) {
    const audio = new Audio("media/canon-pachelbel-432hz.wav");

    console.log({delayBeforeNextLoop});

    audio.addEventListener('ended', function (event) {
        setTimeout(
            function () {
                audio.play();
                // delayBeforeNextLoop = Math.round(5 * 60 * Math.random())
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
