function playAudio() {
    const audioElement = document.querySelector("audio");

    audioElement.play();
}

function pauseAudio() {
    const audioElement = document.querySelector("audio");

    audioElement.pause();
}

document.querySelector('.play-button').addEventListener('click', playAudio);
document.querySelector('.pause-button').addEventListener('click', pauseAudio);