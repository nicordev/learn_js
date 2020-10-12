run();

function run() {
    const boxElements = [...document.getElementsByClassName('box')];
    const movableElements = [...document.getElementsByClassName('movable')];

    for (let element of boxElements) {
        beautifyElement(element);
    }

    for (let element of movableElements) {
        initMovableElement(element);
    }
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function beautifyElement(element) {
    let red = randomInteger(0, 255);
    let green = randomInteger(0, 255);
    let blue = randomInteger(0, 255);

    element.style.backgroundColor = `rgba(${red}, ${green}, ${blue})`;
    element.style.borderRadius = '25%';
}

/**
 * Allow to move a DOM element by clicking on it.
 * 
 * @param {DOMElement} element 
 */
function initMovableElement(element) {
    let isDown = false;
    let offset = [0, 0];

    element.style.position = 'absolute';

    element.addEventListener('mousedown', function (event) {
        if (event.button === 0) {
            isDown = true;
            offset = [
                element.offsetLeft - event.clientX,
                element.offsetTop - event.clientY,
            ];
        }
    });
    document.addEventListener('mouseup', function (event) {
        isDown = false;
    });
    document.addEventListener('mousemove', function (event) {
        event.preventDefault();
        if (isDown) {
            element.style.left = event.clientX + offset[0] + 'px';
            element.style.top = event.clientY + offset[1] + 'px';
        }
    });
}
