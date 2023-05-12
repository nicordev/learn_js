function playAudio() {
    const audioElement = document.querySelector("audio");

    audioElement.play();
}

function runTimer(duration) {
    let i = 0;
    console.log('start!');

    const intervalKey = setInterval(function () {
        console.log(++i);
    }, 1000 * 60);

    setTimeout(function () {
        clearInterval(intervalKey);
        playAudio();
        console.log('Wake up!');
    }, duration * 60 * 1000);
}

document.querySelector('#timer-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const duration = document.body.querySelector('#duration').value;

    runTimer(duration);
});