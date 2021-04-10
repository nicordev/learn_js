function setDraggable(element) {
    let isDown = false;
    let offset = [0, 0];

    if (!['absolute', 'relative'].includes(element.style.position)) {
        element.style.position = 'absolute';
    }

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
