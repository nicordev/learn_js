function MusicPlayer() {
    const audio = new Audio("../music/media/canon-pachelbel-432hz.wav");

    let delay = 15 * 60 * 1000;

    this.play = function () {
        setInterval(() => audio.play(), delay);
    };

    return this;
}

const musicPlayer = new MusicPlayer();

document
    .querySelector(".play-button")
    .addEventListener("click", function (event) {
        musicPlayer.play();
    });
