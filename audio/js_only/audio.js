const audio = new Audio("https://www.freesoundslibrary.com/wp-content/uploads/2018/02/birds-chirping-sound-effect.mp3");

function playBirds() {
    audio.play();
}

function pauseBirds() {
    audio.pause();
}

document.querySelector('.play-button').addEventListener('click', function (event) {
    if (this.textContent === 'Pause') {
        pauseBirds();
        this.textContent = 'Play';

        return;
    }

    this.textContent = 'Pause';
    playBirds();
});