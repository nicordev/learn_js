function log(content) {
    document.querySelector('.log').innerHTML += content + "\n";
}

function whatTimeIsIt() {
    const date = new Date();

    return date.toLocaleString('fr-fr').split(' ')[ 1 ];
}

function playAudio() {
    const audioElement = document.querySelector("audio");

    log(`${whatTimeIsIt()} audio played`);

    audioElement.play();
}

function remind() {
    log(`${whatTimeIsIt()} reminder started`);
    intervalKey = setInterval(playAudio, 60 * 60 * 1000);
}

function deactivate() {
    log(`${(new Date()).toISOString()} reminder deactivated`);
    clearInterval(intervalKey);
}

let intervalKey = undefined;

document.querySelector('.start-button').addEventListener('click', remind);
document.querySelector('.stop-button').addEventListener('click', deactivate);
