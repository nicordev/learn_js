function playAudio() {
    const audioElement = document.querySelector("audio");

    audioElement.play();
}

function runTimer() {
    let i = 0;
    console.log('start!');

    const intervalKey = setInterval(function () {
        console.log(++i);
    }, 1000 * 60);

    setTimeout(function () {
        clearInterval(intervalKey);
        playAudio();
        console.log('Wake up!');
    }, 15 * 60 * 1000);
}

document.querySelector('.play-button').addEventListener('click', runTimer);