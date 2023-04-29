function MusicPlayer(delayBeforeNextLoop = 5) {
    const audio = new Audio("media/canon-pachelbel-432hz.wav");

    console.log(audio);

    audio.addEventListener('ended', function (event) {
        setTimeout(
            function () {
                audio.play();
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

const musicPlayer = new MusicPlayer();

document.querySelector('.play-button').addEventListener('click', function (event) {
    if (this.textContent === 'Pause') {
        musicPlayer.pause();
        this.textContent = 'Play';

        return;
    }

    this.textContent = 'Pause';
    musicPlayer.play();
});
